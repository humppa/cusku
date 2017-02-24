/** @jsx h */

import Router from 'preact-router';
import { h, render } from 'preact';

import Chat from './Chat';
import Login from './Login';

require('preact/devtools');

const Main = () => (
  <Router>
    <Chat  path="/" />
    <Login path="/login" />
  </Router>
);

render(<Main />, document.getElementById('main'));
