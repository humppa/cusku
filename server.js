/* #cusku */

/** TODO
 * morgan node-syslog https://github.com/expressjs/morgan/issues/52
 * session store: something more permanent
 */

var path       = require('path');
var express    = require('express');
var bodyparser = require('body-parser');
var session    = require('express-session');
var passport   = require('passport');
var FBStrategy = require('passport-facebook').Strategy;
var GStrategy  = require('passport-google-oauth').OAuth2Strategy;
var app        = express();
var server     = require('http').Server(app);
var io         = require('socket.io')(server);
var sqlite     = require('./lib/sqlite');
var util       = require('./lib/util');

var DB = {};
var Conf = util.readConfig();

var Session = session({
  resave: false,
  saveUninitialized: true,
  secret: Conf.session.secret
});

var User = {
  validate: function(profile, callback) {
    console.log("validate()")
    util.D(profile);
    var key = profile.id || false;

    if (!key) {
      console.log("validate(): key not available")
      return;
    }

    if (this.hasOwnProperty(key)) {
      console.log("validate(): user known")
    }
    else {
      console.log("validate(): user not found")
      this[key] = profile;
    }

    callback(null, { id: key, user: profile });
  }
};

passport.serializeUser(function(user, done) {
  console.log('serializeUser()');
  DB.storeUser(user, done);
});

passport.deserializeUser(function(user, done) {
  console.log('deserializeUser()');
  DB.fetchUser(user, done);
});

passport.use(new FBStrategy(
  {
    clientID: Conf.facebook_oauth.id,
    clientSecret: Conf.facebook_oauth.secret,
    callbackURL: Conf.facebook_oauth.callback
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
      return done(null, profile);
    });
  }
));

passport.use(new GStrategy(
  {
    clientID: Conf.google_oauth.id,
    clientSecret: Conf.google_oauth.secret,
    callbackURL: Conf.google_oauth.callback
  },
  function(accessToken, refreshToken, profile, done) {
    User.validate(profile, function(err, user) {
      return done(err, user);
    })
  }
));

io.use(function(socket, next) {
  Session(socket.request, socket.request.res, next);
});

app.use(express.static(path.resolve(__dirname, 'static')));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(Session);
app.use(passport.initialize());
app.use(passport.session());

app.get('/', function(req, res) {
  console.log('path: /');

  if (!req.user) {
    console.log('/ unauthorized');
    res.redirect(303, '/login');
    return;
  }

  console.log('/ req.user');
  util.D(req.user);
  /*
  if (req.session) {
    console.log('/ session');
    util.D(req.session);
  }
  */

  res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.get('/login', function(req, res) {
  console.log('path: /login');
  res.sendFile(path.resolve(__dirname, 'static', 'login.html'));
});

app.get('/login/facebook', passport.authenticate('facebook'));

app.get('/login/google', passport.authenticate('google',
  { scope: 'openid email profile' }
));

app.get('/auth/facebook', passport.authenticate('facebook',
  { successRedirect: '/', failureRedirect: '/login' }
));

app.get('/auth/google',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    console.log('/auth/google');
    if (req.user) {
      console.log('/auth/google: we have user');
      util.D(req.user);
    }
    res.redirect(303, '/');
  }
);

io.on('connection', function(socket) {
  console.log('io: connection event');
  if (socket) {
    console.log(socket.id);
  }
  else {
    console.log('io: no socket');
  }

  socket.on('message', function(msg) {
    console.log('msg:');
    util.D(msg);
    io.emit('message', msg);
  });
});

sqlite(Conf.database, function(err, dbo) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  DB = dbo;

  server.listen(Conf.server.port, function() {
    console.log('Cusku service started on port', Conf.server.port);
  });
});
