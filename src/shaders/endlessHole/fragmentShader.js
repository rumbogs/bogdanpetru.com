export default `
precision mediump float;

uniform vec2 u_mousePos;
varying vec2 u_fragRes;

vec3 rectOutline (vec2 st, float yAR, float xAR, float xDelta, float yDelta, float xW, float yW, float xOffset, float yOffset, vec3 startColor, vec3 endColor) {
  float yMask = st.y * yAR;
  float xMask = st.x * xAR;
  vec3 bb = mix(
    startColor,
    endColor,
    smoothstep(
      yOffset,
      yW + yOffset,
      mix(
        1.0,
        st.y,
        step(yMask + 0.000001, st.x) - step(1.0 - yMask - 0.0001, st.x) // add very small values to avoid artifacts
      )
    )
  );

  vec3 bbWithOffset = mix(
    endColor,
    bb,
    step(yOffset, st.y)
  );

  vec3 lb = mix(
    startColor,
    endColor,
    smoothstep(
      xOffset, 
      xW + xOffset,
      mix(
        1.0,
        st.x,
        step(xMask, st.y) - step(1.0 - xMask, st.y)
      )
    )
  );

  vec3 lbWithOffset = mix(
    endColor,
    lb,
    step(xOffset, st.x)
  );

  vec3 tb = mix(
    startColor,
    endColor,
    smoothstep(
      yOffset,
      yW + yOffset,
      mix(
        1.0,
        1.0 - st.y,
        step(xMask - xDelta, st.y) - step(xMask, 1.0 - st.y)
      )
    )
  );

  vec3 tbWithOffset = mix(
    endColor,
    tb,
    step(yOffset, 1.0 - st.y)
  );

  vec3 rb = mix(
    startColor,
    endColor,
    smoothstep(
      xOffset,
      xW + xOffset,
      mix(
        1.0,
        1.0 - st.x,
        step(yMask - yDelta + 0.00001, st.x) - step(yMask + 0.000001, 1.0 - st.x) // add small values to avoid artifacts
      )
    )
  );

  vec3 rbWithOffset = mix(
    endColor,
    rb,
    step(xOffset, 1.0 - st.x)
  );

  return 
    bbWithOffset +
    lbWithOffset +
    tbWithOffset +
    rbWithOffset
  ;
}

void main() {
  vec2 st = gl_FragCoord.xy / u_fragRes.xy; // 0 -> 1
  const float viewportHalf = 0.5;

  float yAR = u_fragRes.y / u_fragRes.x;
  float xAR = 1.0 / yAR;
  float xDelta = xAR - 1.0;
  float yDelta = yAR - 1.0;

  const float yWidth = 0.1;
  float xWidth = yWidth * yAR;

  vec3 purple = vec3(0.6, 0.0, 0.6);
  vec3 black = vec3(0.0);
  vec3 color = black;

  for( float yOffset = 0.0; yOffset <= viewportHalf; yOffset += yWidth * 0.7) {
    float xOffset = yOffset * yAR;
    color += rectOutline(st, yAR, xAR, xDelta, yDelta, xWidth, yWidth, xOffset, yOffset, purple * pow(0.9 - yOffset, 4.0), black);
  }

  gl_FragColor = vec4(color, 1.0);
}
`;
