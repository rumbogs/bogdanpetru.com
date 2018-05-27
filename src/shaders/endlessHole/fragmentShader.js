export default `
precision mediump float;

uniform vec2 u_mousePos;
varying vec2 u_fragRes;

vec3 rectOutline (vec2 st, float w, float offset, vec3 startColor, vec3 endColor) {
  vec3 bb = mix(
    startColor,
    endColor,
    smoothstep(offset, w + offset, mix(1.0, st.y, step(st.y, st.x) - step(1.0 - st.y, st.x)))
  );

  vec3 bbWithOffset = mix(
    endColor,
    bb,
    step(offset, st.y)
  );

  vec3 lb = mix(
    startColor,
    endColor,
    smoothstep(offset, w + offset, mix(1.0, st.x, step(st.x, st.y) - step(1.0 - st.x, st.y)))
  );

  vec3 lbWithOffset = mix(
    endColor,
    lb,
    step(offset, st.x)
  );

  vec3 tb = mix(
    startColor,
    endColor,
    smoothstep(offset, w + offset, mix(1.0, 1.0 - st.y, step(st.x, st.y) - step(st.x, 1.0 - st.y)))
  );

  vec3 tbWithOffset = mix(
    endColor,
    tb,
    step(offset, 1.0 - st.y)
  );

  vec3 rb = mix(
    startColor,
    endColor,
    smoothstep(offset, w + offset, mix(1.0, 1.0 - st.x, step(st.y, st.x) - step(st.y, 1.0 - st.x)))
  );

  vec3 rbWithOffset = mix(
    endColor,
    rb,
    step(offset, 1.0 - st.x)
  );

  return bbWithOffset + lbWithOffset + tbWithOffset + rbWithOffset;
}

void main() {
  vec2 st = gl_FragCoord.xy / u_fragRes.xy; // 0 -> 1
  const float viewportHalf = 0.5;

  // TODO: different widths based on aspect ratio, how to find angle between diagonals
  const float width = 0.1;

  vec3 purple = vec3(0.6, 0.0, 0.6);
  vec3 black = vec3(0.0);
  vec3 color = black;

  for( float offset = 0.0; offset <= viewportHalf; offset += width * 0.7) {
    color += rectOutline(st, width, offset, purple * pow(0.9 - offset, 4.0), black);
  }

  gl_FragColor = vec4(color, 1.0);
}
`;
