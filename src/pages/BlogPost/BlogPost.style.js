import styled from 'styled-components';

import { fontSizes, colors, main } from '../../styles/variables';
import media from '../../styles/breakpoints';

export const BlackBackground = styled.div`
  width: 100%;
  padding: ${main.postPadding}px;
  overflow: hidden;
  height: 100vh;

  ${media.s`
    padding: 0;
    overflow: visible;
  `};
`;

export const BlogPostWrapper = styled.div`
  position: relative;
  height: 100%;
  overflow-y: auto;
  padding: 36px 0; // 2em + 2 border width
  background-color: ${colors.BACKGROUND_COLOR};
  border: 2px solid ${colors.FONT_BASE};

  h1 {
    font-size: 72px;
    margin-top: 0;

    ${media.s`
      font-size: 50px;
    `};
  }

  h2,
  h3 {
    margin-top: 0;
  }

  /* repeated styles to correctly render svg */
  font-size: ${fontSizes.l};
  font-family: Karla, Helvetica, Arial, sans-serif;

  ${media.s`
    padding: 28px;
    /* repeated styles to correctly render svg */
    font-size: ${fontSizes.s};
    border: 0;
    overflow-y: visible;
    height: auto;
    border: 2px solid #000;
  `};
`;

export const CloseBtn = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 14px;
`;

export const ContentWrapper = styled.div`
  h1,
  h2,
  h3 {
    margin: 0 auto;
    max-width: 500px;
  }

  p {
    margin: 0 auto;
    max-width: 500px;
    font-size: 18px;

    ${media.s`
      font-size: ${fontSizes.s};
    `};
  }

  > p {
    margin: 0 auto;
    max-width: 500px;
    font-size: 14px;
    color: ${colors.GREY};
  }
`;

export const Wrapper = styled.div`
  .inCanvas {
    width: ${({ scrollbarWidth }) => `calc(100% - ${scrollbarWidth}px)`};
  }
`;
