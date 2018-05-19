/* global requestAnimationFrame */
import React, { Component } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import {
  OrthographicCamera,
  Scene,
  WebGLRenderer,
  Texture,
  ShaderMaterial,
  Mesh,
  PlaneBufferGeometry,
  RepeatWrapping,
  Clock,
} from 'three';

import SVGWrapper from '../SVGWrapper/SVGWrapper';
import { isIE, isFirefox, createProgram, createShader } from '../../utils/helpers';
import PostsContext from '../../contexts/PostsContext';

import { Wrapper, CanvasWrapper } from './CanvasLoader.style';
import vertexShaderSource from '../../shaders/main/vertexShader';
import fragmentShaderSource from '../../shaders/main/fragmentShader';

const getPowerOf2 = size => {
  let biggerSize = 1;
  while (size > biggerSize) {
    biggerSize *= 2;
  }
  return biggerSize;
};

const testVertexShaderSource = `
attribute vec2 a_position;
attribute vec2 a_texCoord;

uniform vec2 u_resolution;

varying vec2 vUv;

void main() {
   // convert the rectangle from pixels to 0.0 to 1.0
   vec2 zeroToOne = a_position / u_resolution;

   // convert from 0->1 to 0->2
   vec2 zeroToTwo = zeroToOne * 2.0;

   // convert from 0->2 to -1->+1 (clipspace)
   vec2 clipSpace = zeroToTwo - 1.0;

   gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);

   // pass the texCoord to the fragment shader
   // The GPU will interpolate this value between points.
   vUv = a_texCoord;
}
`;

const testFragmentShaderSource = `
precision mediump float;

uniform float u_pixelSize;
uniform sampler2D texture;
varying vec2 vUv;
vec4 myTexture;

void main() {
   if (u_pixelSize != 0.0) {
    float pixels = 512.0;
    float dx = u_pixelSize * (1.0 / pixels);
    float dy = u_pixelSize * (1.0 / pixels);
    // center it by adding half of displacement
    vec2 coord = vec2((dx * floor(vUv.x / dx)) + (dx / 2.0), (dy * floor(vUv.y / dy)) + (dy / 2.0));
    myTexture = texture2D(texture, coord);
  } else {
    myTexture = texture2D(texture, vUv);
  }

  gl_FragColor = vec4(myTexture.rgb, myTexture.a);
}
`;

class CanvasLoader extends Component {
  state = { hideCanvas: false };

  componentWillReceiveProps(nextProps) {
    const { width, height, children, shouldRestart } = nextProps;

    // this is triggered by the rerender from componentDidMount from App
    if (!isIE() && (this.props.width === null && this.props.height === null) && typeof document !== 'undefined') {
      // wait for window load to get scrollY correctly
      window.addEventListener(
        'load',
        function handleLoad() {
          window.removeEventListener('load', handleLoad);
          this.init(width, height, children);
        }.bind(this)
      );
    }

    /**
     * if the button was clicked and state update triggered in parent
     * if we have width and height from the parent
     * if the animation is not already playing (canvas is not hidden)
     */
    if (shouldRestart && (width !== null && height !== null) && this.state.hideCanvas) {
      this.handleRestartAnimation(width, height, children, shouldRestart);
    }
  }

  canvas = React.createRef();

  testLoadTexture = (width, height, children, postData) => {
    /* Create Image Texture from Screen */
    const slug = window.location.pathname;

    let svgString = renderToStaticMarkup(
      <StaticRouter location={slug} context={{}}>
        <SVGWrapper height={height} width={width} scrollTop={window.pageYOffset}>
          {postData ? <PostsContext.Provider value={postData}>{children}</PostsContext.Provider> : children}
        </SVGWrapper>
      </StaticRouter>
    ).replace(/\s.inCanvas/gi, '');

    if (isFirefox()) svgString = svgString.replace(/.isFirefox/gi, '');

    const image = document.createElement('img');
    image.addEventListener(
      'load',
      e => {
        /* Build Canvas Renderer */
        const canvas = this.canvas.current;
        this.gl = canvas.getContext('webgl');
        if (!this.gl) {
          console.log('No GL');
          return;
        }

        const vertexShader = createShader(this.gl, this.gl.VERTEX_SHADER, testVertexShaderSource);
        const fragmentShader = createShader(this.gl, this.gl.FRAGMENT_SHADER, testFragmentShaderSource);

        const program = createProgram(this.gl, vertexShader, fragmentShader);

        const positionLocation = this.gl.getAttribLocation(program, 'a_position');
        const texCoordLocation = this.gl.getAttribLocation(program, 'a_texCoord');

        const positionBuffer = this.gl.createBuffer();

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);

        const x1 = 0;
        const x2 = getPowerOf2(width);
        const y1 = 0;
        const y2 = getPowerOf2(height);
        this.gl.bufferData(
          this.gl.ARRAY_BUFFER,
          new Float32Array([x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2]),
          this.gl.STATIC_DRAW
        );

        const texcoordBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, texcoordBuffer);
        this.gl.bufferData(
          this.gl.ARRAY_BUFFER,
          new Float32Array([0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0]),
          this.gl.STATIC_DRAW
        );

        const texture = this.gl.createTexture();
        this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
        // this.gl.texImage2D(
        //   this.gl.TEXTURE_2D,
        //   0,
        //   this.gl.RGBA,
        //   1,
        //   1,
        //   0,
        //   this.gl.RGBA,
        //   this.gl.UNSIGNED_BYTE,
        //   new Uint8Array([255, 0, 0, 255, 255, 0, 0, 255, 255, 0, 0, 255, 255, 0, 0, 255])
        // );
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, e.target);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);

        this.gl.enableVertexAttribArray(texCoordLocation);
        this.gl.vertexAttribPointer(texCoordLocation, 2, this.gl.FLOAT, false, 0, 0);

        const resolutionLocation = this.gl.getUniformLocation(program, 'u_resolution');
        this.pixelSizeLocation = this.gl.getUniformLocation(program, 'u_pixelSize');

        this.gl.canvas.width = getPowerOf2(width);
        this.gl.canvas.height = getPowerOf2(height);

        this.gl.viewport(0, 0, getPowerOf2(this.gl.canvas.width), getPowerOf2(this.gl.canvas.height));

        this.gl.clearColor(0, 0, 0, 0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

        this.gl.useProgram(program);

        this.gl.enableVertexAttribArray(positionLocation);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);

        const size = 2;
        const type = this.gl.FLOAT;
        const normalize = false;
        const stride = 0;
        const offset = 0;
        this.gl.vertexAttribPointer(positionLocation, size, type, normalize, stride, offset);

        this.gl.enableVertexAttribArray(texCoordLocation);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, texcoordBuffer);

        this.gl.vertexAttribPointer(texCoordLocation, size, type, normalize, stride, offset);

        this.timeValue = 1.0;
        this.pixelSizeValue = 100.0;

        this.gl.uniform2f(resolutionLocation, getPowerOf2(this.gl.canvas.width), getPowerOf2(this.gl.canvas.height));
        this.gl.uniform1f(this.pixelSizeLocation, this.pixelSizeValue);

        const primitiveType = this.gl.TRIANGLES;
        const count = 6;

        this.gl.drawArrays(primitiveType, offset, count);
        // this.settings.uniforms.texture = {
        //   value: texture,
        // };
        // this.settings.uniforms.texture.value.wrapS = RepeatWrapping;
        // this.settings.uniforms.texture.value.wrapT = RepeatWrapping;

        this.animating = true;
        this.clock = new Clock();
        this.testAnimate();

        // TESTING PURPOSES
        // console.log(this)
        // this.renderCanvas()
      },
      false
    );

    image.crossOrigin = 'anonymous';
    image.src = `data:image/svg+xml;base64,${window.btoa(unescape(encodeURIComponent(svgString)))}`;
    image.width = getPowerOf2(width);
    image.height = getPowerOf2(height);
  };

  loadTexture = (width, height, children, postData) => {
    const slug = window.location.pathname;

    let svgString = renderToStaticMarkup(
      <StaticRouter location={slug} context={{}}>
        <SVGWrapper height={height} width={width} scrollTop={window.pageYOffset}>
          {postData ? <PostsContext.Provider value={postData}>{children}</PostsContext.Provider> : children}
        </SVGWrapper>
      </StaticRouter>
    ).replace(/\s.inCanvas/gi, '');

    if (isFirefox()) svgString = svgString.replace(/.isFirefox/gi, '');

    this.settings = {
      camera: new OrthographicCamera(-width / 2, width / 2, height / 2, -height / 2, 0.1, 10000),
      scene: new Scene(),
      clock: new Clock(),
      geometry: new PlaneBufferGeometry(width, height, 1, 1),
      planeMat: null,
      renderer: null,
      canvas: null,
      uniforms: {
        time: { value: 1.0 },
        u_pixelSize: { value: 100.0 },
      },
      svgString,
      animating: false,
    };

    // this.settings.camera.position.z = 4

    this.settings.renderer = new WebGLRenderer({
      canvas: this.canvas.current,
      alpha: true,
    });
    // sets canvas background color
    // this.settings.renderer.setClearColor(0xffffff, 1)

    this.settings.renderer.setPixelRatio(window.devicePixelRatio);
    this.settings.renderer.setSize(
      getPowerOf2(width) / window.devicePixelRatio,
      getPowerOf2(height) / window.devicePixelRatio,
      false
    );

    const image = document.createElement('img');
    image.addEventListener(
      'load',
      e => {
        const texture = new Texture(e.target);
        texture.needsUpdate = true;

        // send the texture to the shader
        this.settings.uniforms.texture = {
          value: texture,
        };
        this.settings.uniforms.texture.value.wrapS = RepeatWrapping;
        this.settings.uniforms.texture.value.wrapT = RepeatWrapping;

        this.settings.shaderMat = new ShaderMaterial({
          uniforms: this.settings.uniforms,
          vertexShader: vertexShaderSource,
          fragmentShader: fragmentShaderSource,
          transparent: true,
          depthTest: true,
          depthWrite: false,
        });

        // this removes the image size power of 2 warning
        this.settings.plane = new Mesh(this.settings.geometry, this.settings.shaderMat);
        this.settings.plane.position.z = -1;

        this.settings.scene.add(this.settings.plane);

        // start animation once the image has loaded
        this.settings.animating = true;
        this.animate();

        // TESTING PURPOSES
        // console.log(this)
        // this.renderCanvas()
      },
      false
    );

    image.crossOrigin = 'anonymous';
    image.src = `data:image/svg+xml;base64,${window.btoa(unescape(encodeURIComponent(svgString)))}`;
    image.width = getPowerOf2(width);
    image.height = getPowerOf2(height);

    // this.settings.renderer.render(this.settings.scene, this.settings.camera)
  };

  init = (width, height, children) => {
    // const slug = window.location.pathname;
    // if (slug.indexOf('post') >= 0) {
    //   const postSlug = slug.split('/').slice(-1);
    //   // const postFileName = posts[postSlug].component;
    //   import(`../../posts/WhatsThis`).then(module =>
    //     this.loadTexture(width, height, children, { ...posts[postSlug], content: module.default })
    //   );
    // } else {
    // this.loadTexture(width, height, children);
    this.testLoadTexture(width, height, children);
    // }
  };

  animate = () => {
    if (this.settings.animating) {
      requestAnimationFrame(this.animate.bind(this));
      this.renderCanvas();
    }
  };

  testAnimate = () => {
    if (this.animating) {
      requestAnimationFrame(this.testAnimate.bind(this));
      this.testRenderCanvas();
    }
  };

  handleRestartAnimation = (width, height, children, shouldRestart) => {
    this.props.onToggleOverlay();

    // TODO: init different animation based on type
    if (shouldRestart.type === 'pixelate') {
      this.setState({ hideCanvas: false }, () => {
        this.init(width, height, children);
      });
    }
  };

  testRenderCanvas = () => {
    const duration = 10;
    this.clock.getDelta();
    this.timeValue = this.clock.elapsedTime + duration;

    const pixelSize = parseFloat(this.pixelSizeValue / (this.timeValue / duration));
    this.pixelSizeValue = pixelSize > 0.1 ? Math.floor(pixelSize) : 0.0;
    this.gl.uniform1f(this.pixelSizeLocation, this.pixelSizeValue);

    if (this.pixelSizeValue === 0.0) {
      this.animating = false;
      this.props.onToggleOverlay();
      this.setState({ hideCanvas: true });
      if (this.props.shouldRestart) {
        // if restarted from button, reset state in layout
        this.props.onStopAnimation();
      }
    }

    // redraw scene
    this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
  };

  renderCanvas = () => {
    const duration = 10;
    if (this.settings.scene.children.length > 0) {
      // this is needed to store elapsedTime
      this.settings.clock.getDelta();
      this.settings.uniforms.time.value = this.settings.clock.elapsedTime + duration;

      const pixelSize = parseFloat(
        this.settings.uniforms.u_pixelSize.value / (this.settings.uniforms.time.value / duration)
      );

      this.settings.uniforms.u_pixelSize.value = pixelSize > 0.1 ? Math.floor(pixelSize) : 0.0;
      if (this.settings.uniforms.u_pixelSize.value === 0.0) {
        this.settings.animating = false;
        this.props.onToggleOverlay();
        this.setState({ hideCanvas: true });
        if (this.props.shouldRestart) {
          // if restarted from button, reset state in layout
          this.props.onStopAnimation();
        }
      }
      this.settings.renderer.render(this.settings.scene, this.settings.camera);
    }
  };

  render() {
    const { width, height, children } = this.props;
    const { hideCanvas } = this.state;
    return (
      <Wrapper>
        {/* {!hideCanvas && ( */}
        <CanvasWrapper width={width} height={height}>
          <canvas ref={this.canvas} width={getPowerOf2(width)} height={getPowerOf2(height)} />
        </CanvasWrapper>
        {/* )} */}
        {children}
      </Wrapper>
    );
  }
}

export default CanvasLoader;
