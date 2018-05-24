import React, { Component } from 'react';

import { createShader, createProgram } from '../../utils/helpers';
import vertexShaderSource from '../../shaders/emptySection/noiseVertexShader';
import fragmentShaderSource from '../../shaders/emptySection/noiseFragmentShader';

import { Wrapper, ClosedOverlay } from './CanvasScreenOverlay.style';

class CanvasScreenOverlay extends Component {
  state = {
    off: this.props.animating,
  };

  componentDidMount() {
    this.width = this.canvas.current.clientWidth;
    this.height = this.canvas.current.clientHeight;
    this.init();
  }

  timer = 0;

  drawScene = () => {
    this.gl.canvas.width = this.width;
    this.gl.canvas.height = this.height;

    this.gl.viewport(0, 0, this.width, this.height);

    this.gl.clear(this.gl.COLOR_BUFFER_BIT);

    this.gl.useProgram(this.program);

    this.gl.enableVertexAttribArray(this.positionLocation);

    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array([0, 0, this.width, 0, 0, this.height, 0, this.height, this.width, 0, this.width, this.height]),
      this.gl.STATIC_DRAW
    );

    const size = 2;
    const type = this.gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    this.gl.vertexAttribPointer(this.positionLocation, size, type, normalize, stride, offset);

    this.gl.uniform1f(this.timeLocation, this.timer);
    this.gl.uniform2f(this.resolutionLocation, this.width, this.height);
    this.gl.uniform2f(this.fragResolutionLocation, this.width, this.height);

    const primitiveType = this.gl.TRIANGLES;
    const count = 6;
    this.gl.drawArrays(primitiveType, offset, count);

    this.timer += 0.05;
    requestAnimationFrame(this.drawScene.bind(this));
  };

  init = () => {
    const canvas = this.canvas.current;
    this.gl = canvas.getContext('webgl');
    if (!this.gl) {
      console.log('No GL');
      return;
    }

    const vertexShader = createShader(this.gl, this.gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(this.gl, this.gl.FRAGMENT_SHADER, fragmentShaderSource);

    this.program = createProgram(this.gl, vertexShader, fragmentShader);

    // get Attributes
    this.positionLocation = this.gl.getAttribLocation(this.program, 'a_position');

    // get Uniforms
    this.resolutionLocation = this.gl.getUniformLocation(this.program, 'u_resolution');
    this.fragResolutionLocation = this.gl.getUniformLocation(this.program, 'u_fragResolution');
    this.timeLocation = this.gl.getUniformLocation(this.program, 'u_time');

    const positionBuffer = this.gl.createBuffer();

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);

    this.drawScene();
  };

  canvas = React.createRef();

  render() {
    const { children, style } = this.props;
    const { off } = this.state;
    return (
      <Wrapper style={style}>
        {/* {off && <ClosedOverlay />} */}
        <ClosedOverlay>
          {/* <p>WIP</p> */}
          <canvas ref={this.canvas} style={{ width: '100%', height: '100%', minHeight: '150px' }} />
        </ClosedOverlay>
        {children}
      </Wrapper>
    );
  }
}

export default CanvasScreenOverlay;
