import React, { Component } from 'react';

import vertexShaderSource from '../../shaders/endlessHole/vertexShader.glsl';
import fragmentShaderSource from '../../shaders/endlessHole/fragmentShader.glsl';

import { createShader, createProgram } from '../../utils/helpers';

class EndlessHole extends Component {
  canvas = React.createRef();

  componentDidMount() {
    this.windowWidth = document.documentElement.clientWidth;
    this.windowHeight = document.documentElement.clientHeight;
    const canvasPos = this.canvas.current.getBoundingClientRect();
    this.canvasCenterY = canvasPos.top + Math.floor(canvasPos.height / 2);
    this.canvasCenterX = canvasPos.left + Math.floor(canvasPos.width / 2);
    this.largestWidth = Math.max(this.windowWidth - this.canvasCenterX, this.canvasCenterX);
    this.largestHeight = Math.max(this.windowHeight - this.canvasCenterY, this.canvasCenterY);
    this.minMouseX = (1 / this.largestWidth) * this.canvasCenterX;
    this.minMouseY = (1 / this.largestHeight) * this.canvasCenterY;

    this.init();
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.mouseMoveHandler);
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

    window.addEventListener('mousemove', this.mouseMoveHandler);
  };

  mouseMoveHandler = e => {
    const { pageX, pageY } = e;
    const mouseX = (1 / this.largestWidth) * (pageX - this.canvasCenterX);
    const mouseY = (1 / this.largestHeight) * (pageY - this.canvasCenterY);

    this.drawScene(mouseX, Math.min(mouseY, 1.0));

    // TODO: correct this thing
    // setTimeout(() => {
    //   window.removeEventListener('mousemove', handleMouseMove);
    // }, 5000);
  };

  render() {
    return <canvas ref={this.canvas} style={{ width: '100%', height: '100%', minHeight: '150px' }} />;
  }
}

export default EndlessHole;
