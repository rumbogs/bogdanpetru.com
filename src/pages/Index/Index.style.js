import styled, { keyframes } from 'styled-components';
import media from '../../styles/breakpoints';

import { fontSizes, colors } from '../../styles/variables';

const IndexWrapper = styled.div`
  padding: 50px;
  height: 100%;

  h1 {
    font-size: 72px;
    margin-top: 0;
  }

  h2,
  h3 {
    margin-top: 0;
  }

  /* repeated styles to correctly render svg */
  font-size: ${fontSizes.l};
  font-family: Karla, Helvetica, Arial, sans-serif;

  ${media.s`
  padding: 0;
  /* repeated styles to correctly render svg */
  font-size: ${fontSizes.s};
`};
`;
const GridWrapper = styled.div`
  display: grid;
  grid-gap: 2px;
  min-height: 100%;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));

  & > div {
    overflow: hidden;
    border: 2px solid ${colors.FONT_BASE};
  }
  ${media.s`
    display: block;

    & > div:not(:first-child) {
      border-top: 0;
    }
  `};
`;
const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;
const fadeInExpand = ({
  startWidth,
  finishWidth,
  startHeight,
  finishHeight,
  startX,
  startY,
  finishX,
  finishY,
}) => keyframes`
  0% {
    opacity: 0;
    width: ${startWidth};
    height: ${startHeight};
    transform: ${`translate(${startX}, ${startY})`};
    z-index: -1;
  }

  25% {
    opacity: 1;
    width: ${startWidth};
    height: ${startHeight};
    transform: ${`translate(${startX}, ${startY})`};
    z-index: 10;
  }

  100% {
    opacity: 1;
    width: ${finishWidth};
    height: ${finishHeight};
    transform: ${`translate(${finishX}, ${finishY})`};
    z-index: 10;
  }
`;
const BorderWrapper = styled.div`
  padding-bottom: 50px;
  /* padding: 2px; */
  /* background-color: ${colors.FONT_BASE}; */
  min-height: 100%;
  animation-name: ${({ animating }) => {
    if (animating === 'in') {
      return fadeOut;
    } else if (animating === 'out') {
      return fadeIn;
    }
    return 'none';
  }};
  animation-duration: .6s;
  animation-fill-mode: forwards;
  animation-delay: ${({ animating }) => (animating === fadeInExpand ? '.2s' : '0s')};

${media.s`
  padding-bottom: 0;
`}
`;
const Canvas1 = styled.div`
  grid-column: auto / span 1;
  grid-row: auto / span 1;
  background-color: ${colors.BACKGROUND_COLOR};

  ${media.s`
    display: none;
  `};
`;
const Canvas2 = styled.div`
  grid-column: auto / span 1;
  grid-row: auto / span 1;
  background-color: ${colors.BACKGROUND_COLOR};
`;
const Canvas3 = styled.div`
  grid-column: auto / span 1;
  grid-row: auto / span 2;
  background-color: ${colors.BACKGROUND_COLOR};
`;
const Canvas4 = styled.div`
  grid-column: auto / span 2;
  grid-row: auto / span 1;
  background-color: ${colors.BACKGROUND_COLOR};

  ${media.s`
    display: none;
  `};
`;
const PostOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${colors.BACKGROUND_COLOR};
  border: 2px solid ${colors.FONT_BASE};
  overflow-y: scroll;
  transform: translate3d(0, 0, 0);
  opacity: 0;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  transform: ${({ x, y }) => `translate(${x}, ${y})`};
  animation-name: ${({
    animation,
    startWidth,
    startHeight,
    finishWidth,
    finishHeight,
    startX,
    startY,
    finishX,
    finishY,
  }) =>
    animation
      ? animation({
          startWidth,
          startHeight,
          finishWidth,
          finishHeight,
          startX,
          startY,
          finishX,
          finishY,
        })
      : 'none'};
  animation-duration: 0.8s;
  animation-fill-mode: forwards;
  z-index: -1;
`;

const shrinkFadeOut = ({
  startWidth,
  finishWidth,
  startHeight,
  finishHeight,
  startX,
  startY,
  finishX,
  finishY,
}) => keyframes`
  0% {
    opacity: 1;
    width: ${startWidth};
    height: ${startHeight};
    transform: ${`translate(${startX}, ${startY})`};
    z-index: 10;
  }

  75% {
    opacity: 1;
    width: ${finishWidth};
    height: ${finishHeight};
    transform: ${`translate(${finishX}, ${finishY})`};
    z-index: 10;
  }

  100% {
    opacity: 0;
    width: ${finishWidth};
    height: ${finishHeight};
    transform: ${`translate(${finishX}, ${finishY})`};
    z-index: -1;
  }
`;

const PostOverlayContentWrapper = styled.div`
  padding-top: 50px;
  max-width: 500px;
  margin: 0 auto;
  font-size: 18px;
  opacity: 0;
  animation: ${({ animation }) => animation};
  animation-duration: 0.6s;
  animation-fill-mode: forwards;
  animation-delay: ${({ animationDelay }) => animationDelay};

  ${media.s`
    padding: 30px;
  `};
`;
const CloseBtn = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 14px;

  &::before {
    content: '';
    position: absolute;
    top: -0.1em;
    bottom: -0.1em;
    left: 0;
    right: 0;
    transform: scale(1, 0.1);
    transform-origin: bottom;
    background-color: ${colors.FONT_BASE};
    z-index: -1;
    transition: transform 0.3s;
  }
`;

export {
  IndexWrapper,
  GridWrapper,
  BorderWrapper,
  Canvas1,
  Canvas2,
  Canvas3,
  Canvas4,
  PostOverlay,
  fadeInExpand,
  shrinkFadeOut,
  fadeIn,
  fadeOut,
  PostOverlayContentWrapper,
  CloseBtn,
};