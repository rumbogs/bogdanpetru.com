import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { sizes } from '../../styles/variables';

import { LatestPostWrapper, Content } from './LatestPost.style';

class LatestPost extends Component { // eslint-disable-line
  handleClick = () => {
    const { onShowOverlayPost, post } = this.props;
    onShowOverlayPost('latestPostRef', `/post/${post.slug}`);
  };

  render() {
    const { post } = this.props;
    const isDesktop = window.innerWidth > sizes.s;

    return (
      <LatestPostWrapper innerRef={this.props.bindLatestPostRef}>
        <Content>
          <h1>{post.title}</h1>
          <p>{post.date}</p>
          <p>
            {post.excerpt}
            {isDesktop ? (
              <button onClick={this.handleClick}>&#8608;</button>
            ) : (
              <Link to={`/post/${post.slug}`}>&#8608;</Link>
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
