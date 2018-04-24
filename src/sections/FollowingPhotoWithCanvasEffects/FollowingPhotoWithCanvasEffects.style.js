import styled from 'styled-components';

import { colors } from '../../styles/variables';

export const FollowingPhotoWrapper = styled.div`
  grid-column: auto / span 1;
  grid-row: auto / span 1;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  background-color: ${colors.BACKGROUND_COLOR};
`;

export const ImageWrapper = styled.div`
  grid-column: 2 / span 3;
  grid-row: 1 / span 3;
  // background: ${({ imgSrc }) => `url(${imgSrc}) center / cover no-repeat`};
  min-height: 165px;
`;
