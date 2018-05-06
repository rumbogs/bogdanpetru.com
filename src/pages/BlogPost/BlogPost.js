import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

import posts from '../../posts';

import { BlackBackground, BlogPostWrapper, CloseBtn, ContentWrapper } from './BlogPost.style';

class BlogPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...props.staticData,
    };
  }

  componentDidMount() {
    const { match, staticData } = this.props;
    const { slug } = match.params;
    // const postFileName = posts[slug].component;

    if (!staticData) {
      import(`../../posts/WhatsThis`).then(module => {
        this.setState({
          ...posts[slug],
          content: module.default,
        });
      });
      // import(`../../posts/2017-10-29---${slug}.json`).then(module => {
      //   console.log(module);
      //   this.setState({ post: module.default });
      // });
    }
  }

  render() {
    const { title, content: Post } = this.state;
    return Post ? (
      <div>
        <Helmet title={title} />
        <BlackBackground>
          <BlogPostWrapper>
            <CloseBtn>
              <Link to="/">home</Link>
            </CloseBtn>
            <ContentWrapper>
              <h1>{title}</h1>
              <Post />
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
