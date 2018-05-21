import styled from 'styled-components';

import { colors } from '../../styles/variables';

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
`;
