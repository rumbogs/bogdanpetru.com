import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import { sizes } from '../../styles/variables';

import { RecentPostsWrapper, RecentPostsList } from './RecentPosts.style';

// needs to be a class to attach ref
class RecentPosts extends Component { // eslint-disable-line
  handleClick = slug => ev => {
    ev.preventDefault();
    this.props.onShowOverlayPost('recentPostsRef', `/post/${slug}`);
  };

  renderPostLink = post => (
    <Fragment>
      <span>
        <em>
          {new Date(post.date).toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </em>{' '}
        -{' '}
      </span>
      {post.title}
    </Fragment>
  );

  render() {
    const { posts } = this.props;
    const isDesktop = window.innerWidth > sizes.s;

    return (
      <RecentPostsWrapper ref={this.props.recentPostsRef}>
        <h3>Recent Posts</h3>
        <RecentPostsList>
          {posts && posts.length > 0 ? (
            posts.map(post => (
              <li key={post.slug}>
                {isDesktop ? (
                  <button type="button" onClick={this.handleClick(post.slug)}>
                    {this.renderPostLink(post)}
                  </button>
                ) : (
                  <Link to={`/post/${post.slug}`}>{this.renderPostLink(post)}</Link>
                )}
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
