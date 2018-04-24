import React, { Component } from 'react';
import Helmet from 'react-helmet';

import Index from './pages/Index/Index';

import './styles/global';
import { Overlay, MobileLandscapeOverlay } from './App.style';

import CanvasLoader from './components/CanvasLoader/CanvasLoader';
import { isIE } from './utils/helpers';

class App extends Component {
  state = {
    maxHeight: null,
    maxWidth: null,
    showOverlay: true,
    restartCanvas: null,
    withPostOverlay: '',
  };

  componentDidMount() {
    if (typeof document !== 'undefined') {
      const { body, documentElement } = document;
      const maxHeight = Math.max(body.offsetHeight, documentElement.clientHeight, documentElement.offsetHeight);
      const maxWidth = Math.max(body.offsetWidth, documentElement.clientWidth, documentElement.offsetWidth);
      this.setState({ maxHeight, maxWidth }) // eslint-disable-line
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname === '/') {
      this.setState({ withPostOverlay: this.props.location.pathname });
    }
  }

  handleToggleOverlay = () => {
    this.setState({ showOverlay: !this.state.showOverlay });
  };

  handleRestartAnimation = e => {
    e.preventDefault();

    this.setState({
      restartCanvas: { type: e.target.name },
    });
  };

  handleStopAnimation = () => this.setState({ restartCanvas: null });

  render() {
    const { maxHeight, maxWidth, showOverlay, restartCanvas, withPostOverlay } = this.state;

    return (
      <div>
        <Helmet>
          <title>bogdanpetru.com</title>
          <meta
            description="bogdanpetru.com - personal web development website - Bogdan Pestritu"
            keywords="personal blog, web development"
          />
          <noscript innerHTML="<style>.no-js-overlay{display: none;}</style>" />
          <body className={showOverlay && 'no-overflow'} />
        </Helmet>
        {!isIE() && <Overlay showOverlay={showOverlay} class="no-js-overlay" />}
        <MobileLandscapeOverlay>
          <p>Congratulations, you have broken the Internet!</p>
        </MobileLandscapeOverlay>
        <CanvasLoader
          height={maxHeight}
          width={maxWidth}
          onToggleOverlay={this.handleToggleOverlay}
          shouldRestart={restartCanvas}
          onStopAnimation={this.handleStopAnimation}
        >
          <div style={{ height: '100%' }}>
            <main style={{ height: '100%' }}>
              <Index
                {...this.props}
                handleRestartAnimation={this.handleRestartAnimation}
                withPostOverlay={withPostOverlay}
              />
            </main>
          </div>
        </CanvasLoader>
      </div>
    );
  }
}

export default App;
