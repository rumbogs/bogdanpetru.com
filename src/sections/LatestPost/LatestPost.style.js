import styled from 'styled-components';

import { colors, fontFamily } from '../../styles/variables';

export const LatestPostWrapper = styled.div`
  grid-column: auto / span 3;
  grid-row: auto / span 2;
  background-color: ${colors.BACKGROUND_COLOR};
`;

export const Content = styled.div`
  padding: 2em;

  a::before {
    display: none;
  }

  a:hover {
    color: ${colors.FONT_BASE};
  }
`;

export const RollingText = styled.div`
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
