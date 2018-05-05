import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

import { BlackBackground, BlogPostWrapper, CloseBtn, ContentWrapper } from './BlogPost.style';

class BlogPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      post: props.staticData,
    };
  }

  componentDidMount() {
    const { match, staticData } = this.props;
    const { slug } = match.params;

    if (!staticData) {
      import(`../../posts/2017-10-29---${slug}`).then(module => this.setState({ post: module.default }));
    }
  }

  render() {
    const { post } = this.state;
    console.log('post: ', post);
    return post ? (
      <div>
        <Helmet title={post.title} />
        <BlackBackground>
          <BlogPostWrapper>
            <CloseBtn>
              <Link to="/">home</Link>
            </CloseBtn>
            <ContentWrapper>
              <h1>{post.title}</h1>
              {post.content}
            </ContentWrapper>
          </BlogPostWrapper>
        </BlackBackground>
      </div>
    ) : (
      ''
    );
  }
}

export default BlogPost;
