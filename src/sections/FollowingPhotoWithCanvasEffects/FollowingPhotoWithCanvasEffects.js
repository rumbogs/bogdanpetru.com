import React from 'react';

import CanvasLoadEffect from '../../components/CanvasLoadEffect/CanvasLoadEffect';
import { FollowingPhotoWrapper, ImageWrapper } from './FollowingPhotoWithCanvasEffects.style';

const FollowingPhotoWithCanvasEffects = ({ onRestartAnimation }) => {
  const canvasLoadButtons = ['pixelate', 'pixelate', 'pixelate', 'pixelate', 'pixelate', 'pixelate', 'pixelate'].map(
    (type, idx) => (
      <CanvasLoadEffect
        onRestartAnimation={onRestartAnimation}
        type={type}
        row={idx + 1 < 4 ? idx + 1 : 4}
        column={idx + 1 <= 4 ? 1 : idx + 1 - 3}
        disabled={idx !== 0}
        key={type + idx}
        idx={idx}
      />
    )
  );
  return (
    <FollowingPhotoWrapper>
      {canvasLoadButtons}
      <ImageWrapper />
    </FollowingPhotoWrapper>
  );
};

export default FollowingPhotoWithCanvasEffects;
