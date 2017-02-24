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

      <div class="eight columns">
        <input type="text" name="nick" id="nick" class="u-full-width" placeholder="Your nick, please" />
      </div>

      <div class="four columns">
        <input class="u-full-width button-primary" type="submit" value="Start chatting" />
      </div>

      </div>

      </form>
      );
  }
}
