import styled from 'styled-components';

import { colors, fontFamily } from '../../styles/variables';

export const LatestPostWrapper = styled.div`
  position: relative;
  grid-column: auto / span 3;
  grid-row: auto / span 2;
  background-color: ${colors.BACKGROUND_COLOR};
`;

export const Content = styled.div`
  padding: 2em 2em 3em;

  a::before {
    display: none;
  }

  a:hover {
    color: ${colors.FONT_BASE};
  }

  h1 {
    margin-bottom: 0;
  }

  h4 {
    position: relative;
    font-size: 12px;
    color: ${colors.CLOSED_TV};
    margin: 0;
    font-family: ${fontFamily.FONT_KARLA};
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  > p {
    margin-top: 0;
    margin-bottom: 2em;
    display: block;
    font-size: 14px;
    color: ${colors.GREY};
  }
`;

export const RollingText = styled.div`
  position: absolute;
  bottom: 0;
  border-top: 2px solid ${colors.FONT_BASE};
  overflow: hidden;
  margin-top: 0em;
  height: 1.5em;
  font-size: 14px;
  font-style: italic;
  letter-spacing: 0.1em;
  transform: translate3d(0, 0, 0);

  a {
    margin-left: 20px;
  }
`;

export const StartPar = styled.p`
  margin: 0;
  display: inline-block;
  vertical-align: middle;
  white-space: nowrap;
  animation-name: rolling-start;
  animation-duration: 10s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;

  @keyframes rolling-start {
    100% {
      transform: translateX(-33.3333%);
    }
  }
`;

export const SeeMoreBtn = styled.button`
  font-size: 16px;
  cursor: pointer;
  background-color: transparent;
  border: 0;
  text-align: left;
  font-family: ${fontFamily.FONT_KARLA};
  padding: 0;

  p {
    display: inline;
  }
`;
