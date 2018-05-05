import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import latestPost from '../../posts/2017-10-29---whats-this';

import { sizes } from '../../styles/variables';

import { LatestPostWrapper, Content } from './LatestPost.style';

class LatestPost extends Component { // eslint-disable-line
  handleClick = () => {
    this.props.onShowOverlayPost('latestPostRef', `/post/${latestPost.slug}`);
  };

  render() {
    const isDesktop = window.innerWidth > sizes.s;
    return (
      <LatestPostWrapper innerRef={this.props.bindLatestPostRef}>
        <Content>
          <h1>{latestPost.title}</h1>
          <p>{latestPost.date}</p>
          <p>
            {latestPost.excerpt}
            {isDesktop ? (
              <button onClick={this.handleClick}>&#8608;</button>
            ) : (
              <Link to={`/post/${latestPost.slug}`}>&#8608;</Link>
            )}
          </p>
        </Content>
        {/* <RollingText>
          <StartPar>
            <a href="https://github.com/pbogdan03">github.com/pbogdan03</a>
            <a href="https://www.linkedin.com/in/pbogdan03/">linkedin.com/in/pbogdan03/</a>
            <a href="https://github.com/pbogdan03">github.com/pbogdan03</a>
            <a href="https://www.linkedin.com/in/pbogdan03/">linkedin.com/in/pbogdan03/</a>
            <a href="https://github.com/pbogdan03">github.com/pbogdan03</a>
            <a href="https://www.linkedin.com/in/pbogdan03/">linkedin.com/in/pbogdan03/</a>
          </StartPar>
        </RollingText> */}
      </LatestPostWrapper>
    );
  }
}

export default LatestPost;
