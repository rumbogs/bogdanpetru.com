import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { sizes } from '../../styles/variables';

import { LatestPostWrapper, Content, RollingText, StartPar, SeeMoreBtn } from './LatestPost.style';

class LatestPost extends Component { // eslint-disable-line
  handleClick = () => {
    const { onShowOverlayPost, post } = this.props;
    onShowOverlayPost('latestPostRef', `/post/${post.slug}`);
  };

  render() {
    const { post } = this.props;
    const isDesktop = window.innerWidth > sizes.s;

    return (
      <LatestPostWrapper innerRef={this.props.latestPostRef}>
        <Content>
          <h4>Latest post</h4>
          <h1>{post.title}</h1>
          <p>{new Date(post.date).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          {isDesktop ? (
            <SeeMoreBtn onClick={this.handleClick}>
              <p>{post.excerpt} &gt;&gt;&gt;</p>
            </SeeMoreBtn>
          ) : (
            <Link to={`/post/${post.slug}`}>
              <p>{post.excerpt}</p>
            </Link>
          )}
        </Content>
        <RollingText>
          <StartPar>
            <a href="https://github.com/rumbogs">github.com/rumbogs</a>
            <a href="https://www.linkedin.com/in/bogdan-petru/">linkedin.com/in/bogdan-petru/</a>
            <a href="https://github.com/rumbogs">github.com/rumbogs</a>
            <a href="https://www.linkedin.com/in/bogdan-petru/">linkedin.com/in/bogdan-petru/</a>
            <a href="https://github.com/rumbogs">github.com/rumbogs</a>
            <a href="https://www.linkedin.com/in/bogdan-petru/">linkedin.com/in/bogdan-petru/</a>
          </StartPar>
        </RollingText>
      </LatestPostWrapper>
    );
  }
}

export default LatestPost;
