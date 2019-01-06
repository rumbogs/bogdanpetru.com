import styled from 'styled-components';

import { colors } from '../../styles/variables';
import media from '../../styles/breakpoints';

export const Wrapper = styled.div`
  position: relative;
`;

export const ClosedOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${colors.CLOSED_TV};

  ${media.s`
    position: static;
  `};

  p {
    display: block;
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 48%;
    font-size: 32px;
    margin: 0;
    color: #aaa;
    font-style: italic;
  }
`;
