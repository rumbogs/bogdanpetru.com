import React, { Component } from 'react';

import CanvasScreenOverlay from '../../components/CanvasScreenOverlay/CanvasScreenOverlay';

import LatestPost from '../../sections/LatestPost/LatestPost';
import RecentPosts from '../../sections/RecentPosts/RecentPosts';
import FollowingPhotoWithCanvasEffects from '../../sections/FollowingPhotoWithCanvasEffects/FollowingPhotoWithCanvasEffects';
import About from '../../sections/About/About';
import EndlessHole from '../../sections/EndlessHole/EndlessHole';

import posts from '../../posts/';

import { sizes } from '../../styles/variables';
import {
  Wrapper,
  GridWrapper,
  BorderWrapper,
  PostOverlay,
  fadeInExpand,
  shrinkFadeOut,
  fadeIn,
  fadeOut,
  PostOverlayContentWrapper,
  CloseBtn,
} from './Home.style';

const latestPost = Object.keys(posts).reduce(
  (post, slug) => (new Date(posts[slug].date).getTime() > new Date(post.date).getTime() ? posts[slug] : post),
  { date: 0 }
);

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      overlayPost: {
        isHidden: false,
        animating: '',
        width: 0,
        height: 0,
        animation: null,
        x: 0,
        y: 0,
        startWidth: 0,
        startHeight: 0,
        finishWidth: 0,
        finishHeight: 0,
        startX: 0,
        startY: 0,
        finishX: 0,
        finishY: 0,
      },
    };

    const windowWidth = typeof window !== 'undefined' && window.innerWidth;
    const isDesktop = windowWidth > sizes.s;

    if (props.withPostOverlay.length > 0 && isDesktop) {
      this.state = {
        overlayPost: {
          ...this.state.overlayPost,
          isHidden: false,
          width: `calc(100% - 100px)`,
          height: `calc(100% - 100px)`,
          x: `50px`,
          y: `50px`,
        },
      };
    }
  }

  componentDidMount() {
    const isDesktop = window.innerWidth > sizes.s;

    if (this.props.withPostOverlay.length > 0 && isDesktop) {
      const { latestPostRef, recentPostsRef } = this;
      const isLastPost = true; // TODO: change to correct check
      let width = 0;
      let height = 0;
      let x = 0;
      let y = 0;

      if (isLastPost) {
        width = latestPostRef.clientWidth + 4;
        height = latestPostRef.clientHeight + 4;
        x = latestPostRef.offsetLeft;
        y = latestPostRef.offsetTop;
      } else {
        width = recentPostsRef.clientWidth + 4;
        height = recentPostsRef.clientHeight + 4;
        x = recentPostsRef.offsetLeft;
        y = recentPostsRef.offsetTop;
      }

      /* eslint-disable */
      this.setState(({ overlayPost }) => ({
        overlayPost: {
          ...overlayPost,
          animation: shrinkFadeOut,
          animating: 'out',
          startWidth: `calc(100% - 100px)`,
          startHeight: `calc(100vh - 100px)`,
          finishWidth: `${width}px`,
          finishHeight: `${height}px`,
          startX: `50px`,
          startY: `50px`,
          finishX: `${x}px`,
          finishY: `${y}px`,
        },
      }))
      /* eslint-enable */

      const handler = () => {
        this.postOverlayRef.removeEventListener('animationend', handler);
        this.setState({
          overlayPost: {
            isHidden: false,
          },
        });
      };

      this.postOverlayRef.addEventListener('animationend', handler);
    }
  }

  handleShowOverlayPost = (type, slug) => {
    const { history, scrollbarWidth } = this.props;
    const width = this[type].clientWidth + 4;
    const height = this[type].clientHeight + 4;
    const x = this[type].offsetLeft;
    const y = this[type].offsetTop;

    window.scrollTo(0, 0);

    this.setState(
      {
        overlayPost: {
          ...this.state.overlayPost,
          width: `${width}px`,
          height: `${height}px`,
          x: `${x}px`,
          y: `${y}px`,
        },
      },
      () => {
        const handler = () => {
          this.postOverlayRef.removeEventListener('animationend', handler);
          // in case of router navigate here
          history.push(slug);
        };

        this.postOverlayRef.addEventListener('animationend', handler);

        this.setState(({ overlayPost }) => ({ // eslint-disable-line
          overlayPost: {
            ...overlayPost,
            animation: fadeInExpand,
            animating: 'in',
            startWidth: `${width}px`,
            startHeight: `${height}px`,
            finishWidth: `calc(100% - ${100 - scrollbarWidth}px)`,
            finishHeight: `calc(100vh - 100px)`,
            startX: `${x}px`,
            startY: `${y}px`,
            finishX: `50px`,
            finishY: `50px`,
          },
        }));
      }
    );
  };

  bindPostOverlayRef = node => this.postOverlayRef = node // eslint-disable-line
  bindRecentPostsRef = node => this.recentPostsRef = node // eslint-disable-line
  bindLatestPostRef = node => this.latestPostRef = node // eslint-disable-line

  render() {
    const { handleRestartAnimation, scrollbarWidth, animating } = this.props;
    const { overlayPost } = this.state;
    const { animation, isHidden } = overlayPost;
    const overlayPostDimensions = {
      ...overlayPost,
      isHidden,
    };

    return (
      <Wrapper scrollbarWidth={scrollbarWidth}>
        <BorderWrapper animating={overlayPost.animating}>
          <GridWrapper>
            <LatestPost
              onShowOverlayPost={this.handleShowOverlayPost}
              bindLatestPostRef={this.bindLatestPostRef}
              post={latestPost}
            />
            <CanvasScreenOverlay
              animating={animating}
              style={{
                gridColumn: 'auto / span 1',
                gridRow: 'auto / span 1',
              }}
            >
              <EndlessHole />
            </CanvasScreenOverlay>
            <RecentPosts bindRecentPostsRef={this.bindRecentPostsRef} onShowOverlayPost={this.handleShowOverlayPost} />
            <FollowingPhotoWithCanvasEffects onRestartAnimation={handleRestartAnimation} />
            <CanvasScreenOverlay
              animating={animating}
              style={{
                gridColumn: 'auto / span 1',
                gridRow: 'auto / span 1',
              }}
            />
            <About />
            <CanvasScreenOverlay
              animating={animating}
              style={{
                gridColumn: 'auto / span 1',
                gridRow: 'auto / span 1',
              }}
            />
            <CanvasScreenOverlay
              animating={animating}
              style={{
                gridColumn: 'auto / span 1',
                gridRow: 'auto / span 1',
              }}
            />
          </GridWrapper>
        </BorderWrapper>
        {!isHidden && (
          <PostOverlay {...overlayPostDimensions} innerRef={this.bindPostOverlayRef}>
            <PostOverlayContentWrapper
              animation={animation === fadeInExpand ? fadeIn : fadeOut}
              animationDelay={animation === fadeInExpand ? '.2s' : '0s'}
            >
              <CloseBtn>&lt;&lt;&lt; home</CloseBtn>
              <h1>{latestPost.title}</h1>
              {latestPost.content}
            </PostOverlayContentWrapper>
          </PostOverlay>
        )}
      </Wrapper>
    );
  }
}

export default Home;
