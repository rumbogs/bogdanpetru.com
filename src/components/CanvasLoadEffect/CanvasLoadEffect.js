import React from 'react';

import CanvasLoadEffectsWrapper from './CanvasLoadEffect.style';

const CanvasLoadEffects = ({ onRestartAnimation, type, row, column, disabled, idx }) => (
  <CanvasLoadEffectsWrapper row={row} column={column}>
    <button onClick={onRestartAnimation} name={type} disabled={disabled}>
      {idx + 1}
    </button>
  </CanvasLoadEffectsWrapper>
);

export default CanvasLoadEffects;
