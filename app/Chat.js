/** @jsx h */

import { h, render, Component } from 'preact';

export default class Chat extends Component {
  constructor() {
    super();
    this.state.time = Date.now();
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({ time: Date.now() });
    }, 2000);
  }

  render({}, { time }) {
    return (<p> { time } </p>);
  }
}
