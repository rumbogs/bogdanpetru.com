import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

import posts from '../../posts';

import { BlackBackground, BlogPostWrapper, CloseBtn, ContentWrapper } from './BlogPost.style';

class BlogPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      post: posts[this.props.match.params.slug],
    };
  }

  // componentDidMount() {
  //   const { match } = this.props;
  //   const { slug } = match.params;
  //   const postFileName = posts[slug].component;

  //   if (!staticData) {
  //     import(`../../posts/WhatsThis`).then(module => {
  //       this.setState({
  //         ...posts[slug],
  //         content: module.default,
  //       });
  //     });
  //   }
  // }

  render() {
    const { post } = this.state;
    const { title, content } = post;
    return title.length > 0 ? (
      <div>
        <Helmet title={title} />
        <BlackBackground>
          <BlogPostWrapper>
            <CloseBtn>
              <Link to="/">home</Link>
            </CloseBtn>
            <ContentWrapper>
              <h1>{title}</h1>
              {content}
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
