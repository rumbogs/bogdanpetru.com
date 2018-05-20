import styled from 'styled-components';

export default styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  pointer-events: none;
  height: 100%;
  width: 100%;
  overflow: hidden;

  display: block;

  canvas {
    // these can't be 100%, to take into account mobile sizes
    // where the height is bigger than 100%
    height: ${({ height }) => height}px;
    width: ${({ width }) => width}px;
    // opacity: 0.5;
  }
`;
