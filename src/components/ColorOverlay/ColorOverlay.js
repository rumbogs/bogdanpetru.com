import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Overlay from './ColorOverlay.style';

class ColorOverlay extends Component {
  constructor(props) {
    super(props);

    this.overlay = document.createElement('div');
    this.overlay.classList.add('no-js-overlay');
    document.body.appendChild(this.overlay);
  }

  componentWillUnmount() {
    document.body.removeChild(this.overlay);
  }

  render() {
    return ReactDOM.createPortal(<Overlay />, this.overlay);
  }
}

export default ColorOverlay;
