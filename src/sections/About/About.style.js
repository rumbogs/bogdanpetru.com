import styled from 'styled-components';

import { colors } from '../../styles/variables';

const MAX_HEIGHT = '443px';

export const AboutWrapper = styled.div`
  grid-column: auto / span 2;
  /* grid-row: auto / span 2; */
  background-color: ${colors.FONT_BASE};
  perspective: 1500px;
  /* height: ${MAX_HEIGHT}; */

  overflow: visible !important;

  strong {
    font-style: italic;
  }

  p:first-child {
    margin: 0;
}
`;

export const HoverWrapper = styled.div.attrs(({ rotateX, rotateY }) => ({
  transform: `rotateX(${-rotateX * 5}deg) rotateY(${rotateY * 5}deg)`,
}))`
  position: relative;
  transform: translate3d(0, 0, 0);
  transition: transform 0.1s;
  perspective: 1500px;
  height: ${MAX_HEIGHT};
`;

export const FrontRotatingContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: 2em;
  transform: translate3d(0, 0, 0);
  transform: ${({ flipped }) => `rotateY(${flipped * 180}deg)`};
  backface-visibility: hidden;
  transition: transform 1s;
  transform-style: preserve-3d;
  background-color: ${colors.BACKGROUND_COLOR};
  height: ${MAX_HEIGHT};
  z-index: ${({ flipped }) => (flipped % 2 === 0 ? '1' : '0')};
`;

export const BackRotatingContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: 2em;
  transform: translate3d(0, 0, 0);
  transform: rotateY(180deg);
  transform: ${({ flipped }) => `rotateY(${180 + flipped * 180}deg)`};
  backface-visibility: hidden;
  transition: transform 1s;
  transform-style: preserve-3d;
  background-color: ${colors.BACKGROUND_COLOR};
  height: ${MAX_HEIGHT};
  z-index: ${({ flipped }) => flipped % 2};
`;
