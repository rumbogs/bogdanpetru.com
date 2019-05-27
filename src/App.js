import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import Home from './pages/Home/Home';
import BlogPost from './pages/BlogPost/BlogPost';

// import PostsContext from './contexts/PostsContext';

import globalStyles from './styles/global';
import MobileLandscapeOverlay from './App.style';

import CanvasLoader from './components/CanvasLoader/CanvasLoader';
import ColorOverlay from './components/ColorOverlay/ColorOverlay';
import { isIE, getScrollbarWidth } from './utils/helpers';

// add global styles here to get them in the production server side rendering
const GlobalStyle = createGlobalStyle`${globalStyles}`;

class App extends Component {
  state = {
    height: null,
    width: null,
    withCanvasAnimation: 'pixelate',
    withPostOverlay: '',
  };

  componentDidMount() {
    const { body, documentElement } = document;
    const height = Math.max(body.offsetHeight, documentElement.clientHeight, documentElement.offsetHeight);
    const width = Math.max(body.offsetWidth, documentElement.clientWidth, documentElement.offsetWidth);
    this.setState({ height, width }) // eslint-disable-line

    this.scrollbarWidth = getScrollbarWidth();    
  }

  componentWillReceiveProps(nextProps) {
    const currentPath = this.props.location.pathname;
    if (currentPath.indexOf('post') >= 0 && nextProps.location.pathname === '/') {
      this.setState({ withPostOverlay: currentPath.split('/').slice(-1) });
    }
  }

  handleAnimationEnd = () => {
    this.setState({ withCanvasAnimation: '' });
  };

  handleRestartAnimation = e =>
    this.setState({
      withPostOverlay: '', // hide post overlay when restarting animation
      withCanvasAnimation: e.target.name,
    });

  render() {
    const { height, width, withPostOverlay, withCanvasAnimation } = this.state;

    return (
      <div>
        <Helmet>
          <title>bogdanpetru.com</title>
          <meta
            description="bogdanpetru.com - personal web development website - Bogdan Pestritu"
            keywords="personal blog, web development"
          />
          <noscript innerHTML="<style>.no-js-overlay{display: none;}</style>" />
        </Helmet>
        <GlobalStyle />
        <MobileLandscapeOverlay>
          <p>Congratulations, you have broken the Internet!</p>
        </MobileLandscapeOverlay>
        <div style={{ height: '100%' }}>
          {!isIE() && withCanvasAnimation && <ColorOverlay />}
          {height && width ? (
            <main style={{ height: '100%' }}>
              <Route
                exact
                path="/"
                component={routerProps => (
                  <Home
                    // {...this.props}
                    onRestartAnimation={this.handleRestartAnimation}
                    withPostOverlay={withPostOverlay}
                    scrollbarWidth={this.scrollbarWidth}
                    animating={withCanvasAnimation}
                    {...routerProps}
                  />
                )}
              />
              <Route
                path="/post/:slug"
                component={routerProps => <BlogPost scrollbarWidth={this.scrollbarWidth} {...routerProps} />}
              />
              {/* <Route
                path="/post/:slug"
                component={routerProps => (
                  <PostsContext.Consumer>
                    {staticData => <WhatsThis staticData={staticData} {...routerProps} />}
                  </PostsContext.Consumer>
                )}
              /> */}
              {!isIE() &&
                withCanvasAnimation && (
                  <CanvasLoader
                    height={height}
                    width={width}
                    type={withCanvasAnimation}
                    onAnimationEnd={this.handleAnimationEnd}
                  >
                    <Route
                      exact
                      path="/"
                      component={routerProps => (
                        <Home
                          {...this.props}
                          onRestartAnimation={this.handleRestartAnimation}
                          withPostOverlay={withPostOverlay}
                          scrollbarWidth={this.scrollbarWidth}
                          animating={withCanvasAnimation}
                          {...routerProps}
                        />
                      )}
                    />
                    <Route
                      path="/post/:slug"
                      component={routerProps => <BlogPost scrollbarWidth={this.scrollbarWidth} {...routerProps} />}
                    />
                  </CanvasLoader>
                )}
            </main>
          ) : (
            ''
          )}
        </div>
      </div>
    );
  }
}

export default App;
