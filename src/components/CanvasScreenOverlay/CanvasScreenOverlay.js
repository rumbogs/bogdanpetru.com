import React, { Component } from 'react';

import { Wrapper, ClosedOverlay } from './CanvasScreenOverlay.style';

class CanvasScreenOverlay extends Component {
  state = {
    off: this.props.animating,
  };

  render() {
    const { children, style } = this.props;
    const { off } = this.state;
    return (
      <Wrapper style={style}>
        {/* {off && <ClosedOverlay />} */}
        <ClosedOverlay>
          <p>WIP</p>
        </ClosedOverlay>
        {children}
      </Wrapper>
    );
  }
}

export default CanvasScreenOverlay;
