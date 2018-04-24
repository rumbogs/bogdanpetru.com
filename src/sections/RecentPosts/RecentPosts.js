import React, { Component } from 'react';

import { RecentPostsWrapper, RecentPostsList } from './RecentPosts.style';

// needs to be a class to attach ref
class RecentPosts extends Component { // eslint-disable-line
  handleClick = slug => ev => {
    ev.preventDefault();
    this.props.onShowOverlayPost('recentPostsRef', slug);
  };

  render() {
    const { posts } = this.props;
    return (
      <RecentPostsWrapper innerRef={this.props.bindRecentPostsRef}>
        <h3>Recent Posts</h3>
        <RecentPostsList>
          {posts &&
            posts.map(post => (
              <li key={post.node.fields.slug}>
                <span>
                  <em>{post.node.frontmatter.date}</em> -{' '}
                </span>
                <button onClick={this.handleClick(post.node.fields.slug)}>{post.node.frontmatter.title}</button>
              </li>
            ))}
        </RecentPostsList>
      </RecentPostsWrapper>
    );
  }
}

export default RecentPosts;
