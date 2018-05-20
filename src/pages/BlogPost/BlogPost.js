import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

import posts from '../../posts';

import { BlackBackground, BlogPostWrapper, CloseBtn, ContentWrapper, Wrapper } from './BlogPost.style';

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
    const { scrollbarWidth } = this.props;
    const { title, content } = post;
    return title.length > 0 ? (
      <Wrapper scrollbarWidth={scrollbarWidth}>
        <Helmet title={title} />
        <BlackBackground>
          <BlogPostWrapper>
            <CloseBtn>
              <Link to="/">&lt;&lt;&lt; home</Link>
            </CloseBtn>
            <ContentWrapper>
              <h1>{title}</h1>
              {content}
            </ContentWrapper>
          </BlogPostWrapper>
        </BlackBackground>
      </Wrapper>
    ) : (
      ''
    );
  }
}

export default BlogPost;
