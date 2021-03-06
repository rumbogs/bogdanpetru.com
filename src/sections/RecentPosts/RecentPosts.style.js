import styled from 'styled-components';

import { colors } from '../../styles/variables';

export const RecentPostsWrapper = styled.div`
  grid-column: auto / span 1;
  grid-row: auto / span 2;
  background-color: ${colors.BACKGROUND_COLOR};
  padding: 2em;
`;

export const RecentPostsList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;

  a:before {
    display: none;
  }

  button {
    border: none;
    text-align: left;
    margin: 0;
    padding: 0;
    background-color: transparent;
    cursor: pointer;
    font-size: 14px;
    span {
      font-size: 12px;
    }
  }
`;
