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
import { isIE, isFirefox } from '../../utils/helpers';
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

  loadTexture = (width, height, children, postData) => {
    const slug = window.location.pathname;

    console.log('before static rendering');
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
      canvas: this.canvas,
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
    const slug = window.location.pathname;
    if (slug.indexOf('post') >= 0) {
      console.log('needs to import');
      import(`../../posts/2017-10-29---${slug.split('/').slice(-1)}`).then(module =>
        this.loadTexture(width, height, children, module.default)
      );
    } else {
      console.log('not importing, no slug');
      this.loadTexture(width, height, children);
    }
  };

  animate = () => {
    if (this.settings.animating) {
      requestAnimationFrame(this.animate.bind(this));
      this.renderCanvas();
    }
  };

  canvasRef = node => {
    this.canvas = node;
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
        {!hideCanvas && (
          <CanvasWrapper width={width} height={height}>
            <canvas ref={this.canvasRef} width={getPowerOf2(width)} height={getPowerOf2(height)} />
          </CanvasWrapper>
        )}
        {children}
      </Wrapper>
    );
  }
}

export default CanvasLoader;
