import styled from 'styled-components';

import { fontSizes, colors } from '../../styles/variables';
import media from '../../styles/breakpoints';

export const BlackBackground = styled.div`
  width: 100%;
  padding: 50px;
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
  overflow-y: scroll;
  padding: 36px 0; // 2em + 2 border width
  background-color: ${colors.BACKGROUND_COLOR};
  border: 2px solid ${colors.FONT_BASE};

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
  margin: 0 auto;
  max-width: 500px;

  p {
    font-size: 18px;

    ${media.s`
      font-size: ${fontSizes.s};
    `};
  }
`;
