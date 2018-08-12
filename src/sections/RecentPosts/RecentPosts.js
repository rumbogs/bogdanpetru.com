import React, { Component } from 'react';

import { RecentPostsWrapper, RecentPostsList } from './RecentPosts.style';

// needs to be a class to attach ref
class RecentPosts extends Component { // eslint-disable-line
  handleClick = slug => ev => {
    ev.preventDefault();
    this.props.onShowOverlayPost('recentPostsRef', `/post/${slug}`);
  };

  render() {
    const { posts } = this.props;
    return (
      <RecentPostsWrapper innerRef={this.props.bindRecentPostsRef}>
        <h3>Recent Posts</h3>
        <RecentPostsList>
          {posts && posts.length > 0 ? (
            posts.map(post => (
              <li key={post.slug}>
                <button onClick={this.handleClick(post.slug)}>
                  <span>
                    <em>
                      {new Date(post.date).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </em>{' '}
                    -{' '}
                  </span>
                  {post.title}
                </button>
              </li>
            ))
          ) : (
            <p>Coming soon...</p>
          )}
        </RecentPostsList>
      </RecentPostsWrapper>
    );
  }
}

export default RecentPosts;
