import React, { Component } from 'react';

import { sizes } from '../../styles/variables';

import { LatestPostWrapper, Content } from './LatestPost.style';

class LatestPost extends Component { // eslint-disable-line
  handleClick = slug => ev => {
    ev.preventDefault();
    const windowWidth = typeof window !== 'undefined' && window.innerWidth;
    const isDesktop = windowWidth > sizes.s;
    if (isDesktop) {
      this.props.onShowOverlayPost('latestPostRef', slug);
    } else {
      // navigate away in case of router
    }
  };

  render() {
    const { post } = this.props;
    return (
      <LatestPostWrapper innerRef={this.props.bindLatestPostRef}>
        <Content>
          <h1>{post.frontmatter.title}</h1>
          <p>{post.frontmatter.date}</p>
          <p>
            {post.excerpt}
            {/* <span><GLink to={post.fields.slug}>&#8608;</GLink></span> */}
            <button onClick={this.handleClick(post.fields.slug)}>&#8608;</button>
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
