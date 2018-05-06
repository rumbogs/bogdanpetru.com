import React from 'react';
import { __DO_NOT_USE_OR_YOU_WILL_BE_HAUNTED_BY_SPOOKY_GHOSTS as scSecrets } from 'styled-components';
// import styleSheet from 'styled-components/lib/models/StyleSheet'; // eslint-disable-line

import { colors } from '../../styles/variables';

const { StyleSheet: styleSheet } = scSecrets;

if (typeof document !== `undefined`) {
  styleSheet.reset(false);
}

const SVGWrapper = ({ children, height, width, scrollTop }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height}>
    {typeof document !== `undefined` && (
      <defs
        dangerouslySetInnerHTML={{
          __html: styleSheet.instance.toHTML().replace(/<([a-z][a-z0-9]*)[^>]*?(\/?)>/gi, '<style>'),
        }}
      />
    )}
    {/* used as white background to avoid artefacts */}
    <rect width="100%" height="100%" fill={colors.BACKGROUND_COLOR} />
    <foreignObject x="0" y="0" width={width} height={height}>
      <div xmlns="http://www.w3.org/1999/xhtml" style={{ height: '100%', transform: `translate(0, -${scrollTop}px)` }}>
        {children}
      </div>
    </foreignObject>
  </svg>
);

export default SVGWrapper;
