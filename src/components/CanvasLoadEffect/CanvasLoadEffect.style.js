import styled from 'styled-components';

import { colors, fontFamily } from '../../styles/variables';

const CanvasLoadEffectsWrapper = styled.div`
  grid-column: ${({ column }) => column};
  grid-row: ${({ row }) => row};
  border-right: ${({ column }) => (column !== 4 ? `2px solid ${colors.FONT_BASE}` : 'none')};
  border-top: ${({ row }) => (row !== 1 ? `2px solid ${colors.FONT_BASE}` : 'none')};

  button {
    box-sizing: border-box;
    cursor: pointer;
    background: transparent;
    font-family: ${fontFamily.FONT_KARLA};
    font-size: 16px;
    height: 100%;
    width: 100%;
    border: 0;
    text-transform: capitalize;
    padding: 0;

    &:hover {
      background-color: ${colors.FONT_BASE};
      color: ${colors.BACKGROUND_COLOR};
    }

    &:disabled:hover {
      background-color: ${colors.BACKGROUND_COLOR};
      color: gray;
    }
  }
`;

export default CanvasLoadEffectsWrapper;
