import styled from 'styled-components';

import { colors } from '../../styles/variables';
import media from '../../styles/breakpoints';

export default styled.div`
  grid-column: auto;
  grid-row: auto;
  background-color: ${colors.BACKGROUND_COLOR};

  ${media.s`
    display: none;
  `};
`;
