/** @jsx h */

import { h, render, Component } from 'preact';

export default class Login extends Component {
  constructor() {
    super();
  }

  render({}, {}) {
    return (
      <form id="login" method="post" action="/login">

        <div class="row">

          <div class="three columns">
            <input type="text" name="nick" id="nick" class="u-full-width" placeholder="Your nick, please" />
          </div>

          <div class="three columns">
            <button class="button-primary u-full-width">Start chatting</button>
          </div>

          <div class="three columns">
            <a class="button u-full-width" href="/login/google">Login with Google</a>
          </div>

          <div class="three columns">
            <a class="button u-full-width" href="/login/facebook">Login with Facebook</a>
          </div>

        </div>

      </form>
      );
  }
}
