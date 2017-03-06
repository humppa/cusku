/** @jsx h */

import { h, render, Component } from 'preact';

require('preact/devtools');

var socket = io();

const Nav = () => <nav></nav>;

const Backlog = ({messages}) => (
  <ul>
    {messages.map(msg => (
      <li>{ msg }</li>
    ))}
  </ul>
);

const Form = (props) => (
  <form { ...props }>
    <input id="msg" type="text" />
  </form>
);

const Main = ({ children, ...props }) => (
  <main { ...props }>{ children }</main>
);

export class Chat extends Component {
  constructor() {
    super();
    this.setState({ backlog: [] });
    socket.on('message', this.messageReceived);
  }

  componentDidMount() {
    /// setTimeout(() => { socket.emit('message', 'one message'); }, 1111);
  }

  messageReceived = msg => {
    console.log("received:", msg);
    var prev = this.state.backlog.slice();
    this.setState({ backlog: prev.concat(msg) });
  };

  submitHandler = e => {
    e.preventDefault();
    var bar = document.getElementById('msg');
    socket.emit('message', bar.value);
    bar.value = '';
  }

  render() {
    return (
      <div>
        <Nav />
        <Main id="main" role="main">
          <Backlog messages={ this.state.backlog } />
          <Form onSubmit={ this.submitHandler } />
        </Main>
      </div>
    );
  }
}

render(<Chat />, document.body);
