import { css } from 'styled-components';

import { sizes } from './variables';

const media = Object.keys(sizes).reduce((obj, label) => {
  const emSize = sizes[label] / 16;
  return {
    ...obj,
    [label]: (...args) => css`
      @media screen and (max-width: ${emSize}em) {
        ${css(...args)};
      }
    `,
  };
}, {});

export default media;
