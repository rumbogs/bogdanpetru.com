import React, { Component } from 'react';

import { createShader, createProgram } from '../../utils/helpers';
import { CanvasWrapper } from './GLRaytracer.style';
import { main } from '../../styles/variables';

class GLRaytracer extends Component {
  canvas = React.createRef();

  componentDidMount() {
    this.init();
  }

  drawScene = (x, y) => {
    if (this.canvas.current) {
      const width = this.canvas.current.clientWidth;
      const height = this.canvas.current.clientHeight;
      this.gl.canvas.width = width;
      this.gl.canvas.height = height;

      this.gl.viewport(0, 0, width, height);

      this.gl.clear(this.gl.COLOR_BUFFER_BIT);

      this.gl.useProgram(this.program);

      this.gl.enableVertexAttribArray(this.positionLocation);

      this.gl.bufferData(
        this.gl.ARRAY_BUFFER,
        new Float32Array([0, 0, width, 0, 0, height, 0, height, width, 0, width, height]),
        this.gl.STATIC_DRAW
      );

      const size = 2;
      const type = this.gl.FLOAT;
      const normalize = false;
      const stride = 0;
      const offset = 0;
      this.gl.vertexAttribPointer(this.positionLocation, size, type, normalize, stride, offset);

      this.gl.uniform2f(this.resolutionLocation, width, height);
      this.gl.uniform2f(this.mousePosLocation, x, y);

      const primitiveType = this.gl.TRIANGLES;
      const count = 6;
      this.gl.drawArrays(primitiveType, offset, count);
    }
  };

  init = () => {
    const canvas = this.canvas.current;
    const vertexShaderSource = require('../../shaders/glRaytracer/vertexShader.glsl');
    const fragmentShaderSource = require('../../shaders/glRaytracer/fragmentShader.glsl');
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
    this.mousePosLocation = this.gl.getUniformLocation(this.program, 'u_mousePos');

    const positionBuffer = this.gl.createBuffer();

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);

    this.drawScene(0, 0);
  };

  render() {
    this.windowWidth = window.innerWidth - main.postPadding * 2;

    return (
      <CanvasWrapper>
        <canvas ref={this.canvas} width={this.windowWidth} height={this.windowWidth * 0.5} style={{ width: '100%' }} />
      </CanvasWrapper>
    );
  }
}

export default GLRaytracer;
