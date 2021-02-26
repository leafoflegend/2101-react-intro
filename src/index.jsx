import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Home extends Component {
  state = {
    count: 0,
  };

  increment = () => {
    const { count } = this.state;

    this.setState({
      count: count + 1,
    });
  }

  render() {
    const { count } = this.state;

    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h1>{count}</h1>
        <button onClick={this.increment}>Increment Me</button>
      </div>
    )
  }
}

const rootNode = document.querySelector('#app');

ReactDOM.render(
  <Home />,
  rootNode,
  () => {
    console.log('Application rendered.');
  },
);
