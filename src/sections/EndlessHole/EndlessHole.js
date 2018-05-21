import React, { Component } from 'react';

class EndlessHole extends Component {
  componentDidMount() {
    // console.log(this.canvas);
  }

  canvas = React.createRef();

  render() {
    return <canvas ref={this.canvas} style={{ width: '100%', height: '100%', minHeight: '150px' }} />;
  }
}

export default EndlessHole;
