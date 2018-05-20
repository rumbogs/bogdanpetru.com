import styled from 'styled-components';

import { colors } from '../../styles/variables';

export default styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  pointer-events: none;

  background-color: ${colors.BACKGROUND_COLOR};

  z-index: 9; // canvas is 10
`;
