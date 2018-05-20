import styled from 'styled-components';

export default styled.div`
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: tomato;
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  animation-name: none;
  animation-duration: 0.3s;
  animation-iteration-count: infinite;
  font-size: 20px;
  text-transform: uppercase;

  @media only screen and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    display: flex;
    animation-name: flicker;
  }

  @keyframes flicker {
    0% {
      color: #fff;
    }
    50% {
      color: tomato;
    }
    100% {
      color: #fff;
    }
  }
`;
