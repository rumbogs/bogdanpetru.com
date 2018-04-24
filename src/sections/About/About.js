import React, { Component } from 'react';

import { AboutWrapper, HoverWrapper, BackRotatingContent, FrontRotatingContent } from './About.style';

const page1 = (
  <div>
    <h3>About me</h3>
    <p>
      Former architect, I now code web stuff and play around with creative tech. For a more complete story browse around
      &#8634;.
    </p>
    <p>
      Having completed my architecture studies, I started to become a lot more interested in the WEB. Building my
      website and some for other people, it felt like I discovered a new world, more open and unconstrained by signing
      papers, counting doors, and following the sun light.
    </p>
  </div>
);
const page2 = (
  <div>
    <p>
      My first encounter with computer programming was during one of my university course on generative algorithms and
      their use on creating geometry that can be used in architecture. Our primary tool was Rhino and Grasshopper, a
      visual node based programming language built in Python. The thing that bugged me the most was that this
      didn&apos;t have nearly any practical applications for regular architecture. It turned out to be really expensive
      to create in real life scenarios and therefore limited in use (for the interested{' '}
      <a
        onClick={e => e.stopPropagation()}
        href="https://qz.com/321920/the-problem-with-starchitect-designed-gravity-defying-buildings-is-that-they-fall-apart/"
      >
        see here
      </a>).
    </p>
  </div>
);
const page3 = (
  <div>
    <p>
      After that I started to get smaller gigs online and through friends for customizing Wordpress, themes or
      otherwise. The immediate result of seeing my code running in the browser, the practicality of Javascript and
      commercial viability seemed really appealing to me so I continued working in web development until now.
    </p>
    <p>
      Javascript is my main programming language at this moment and I feel like it will be for a very long time. Other
      than that, I&apos;ve been playing around with GLSL in WebGL shaders, which will open a lot of doors in the future
      of web development IMO. I can&apos;t wait to see what will come next.
    </p>
  </div>
);
const pages = [page1, page2, page3];

class About extends Component {
  state = {
    frontPage: 0,
    backPage: 0,
    flipped: 0,
    animating: false,
    rotateX: 0,
    rotateY: 0,
  };

  onMouseMove = e => {
    e.preventDefault();
    const { pageX, pageY } = e;
    const { offsetHeight, offsetWidth, offsetLeft, offsetTop } = this.wrapper;
    const originalX = pageX - offsetLeft;
    const originalY = pageY - offsetTop;
    const rotateY = originalX / offsetWidth * 2 - 1; // -1 < x < 1
    const rotateX = originalY / offsetHeight * 2 - 1; // -1 < y < 1
    this.setState({ rotateX, rotateY });
  };

  handleTransitionEnd = e => this.setState({ animating: false });

  handleClick = e => {
    e.preventDefault();
    const { animating, flipped, rotateY, frontPage, backPage } = this.state;

    const newFlipPos = rotateY >= 0.5 ? flipped + 1 : flipped - 1;

    if (!animating) {
      this.setState(
        {
          frontPage: newFlipPos % 2 === 0 ? newFlipPos % 3 : frontPage,
          backPage: newFlipPos % 2 === 0 ? backPage : newFlipPos % 3,
        },
        () => {
          this.setState({
            flipped: newFlipPos,
            animating: true,
          });
        }
      );
    }
  };

  handleMouseEnter = () => {
    // cannot be throttled because the leave event is triggered
    // before the last mouseMove and the element doesn't revert
    // back to initial position
    this.wrapper.addEventListener('mousemove', this.onMouseMove, false);
  };

  handleMouseLeave = () => {
    this.wrapper.removeEventListener('mousemove', this.onMouseMove);
    this.setState({
      rotateX: 0,
      rotateY: 0,
    });
  };

  bindWrapperRef = node => this.wrapper = node // eslint-disable-line

  render() {
    const { frontPage, backPage, flipped, rotateX, rotateY } = this.state;

    return (
      <AboutWrapper
        onClick={this.handleClick}
        innerRef={this.bindWrapperRef}
        onFocus={this.handleFocus}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <HoverWrapper rotateX={rotateX} rotateY={rotateY}>
          <BackRotatingContent flipped={flipped}>{pages.slice().splice(backPage, 1)[0]}</BackRotatingContent>
          <FrontRotatingContent onTransitionEnd={this.handleTransitionEnd} flipped={flipped}>
            {pages.slice().splice(frontPage, 1)[0]}
          </FrontRotatingContent>
        </HoverWrapper>
      </AboutWrapper>
    );
  }
}

export default About;
