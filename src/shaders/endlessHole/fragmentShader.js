export default `
precision mediump float;

uniform vec2 u_mousePos;
varying vec2 u_fragRes;

float rect(vec2 st, float width) {
  // bottom-left
  vec2 bl = step(vec2(width), st);
  float pct = bl.x * bl.y;

  // top-right
  vec2 tr = step(vec2(width), 1.0 - st);
  pct *= tr.x * tr.y;

  return pct;
}

void main() {
  vec2 st = gl_FragCoord.xy / u_fragRes.xy; // 0 -> 1

  vec3 purple = vec3(0.6, 0.0, 0.6);
  vec3 black = vec3(0.0);

  vec3 bottomBorder = mix(
    mix(purple, black, st.y * 10.0),
    black,
    step(0.1, st.y)
  );

  vec3 leftBorder = mix(
    purple,
    black,
    st.x
  );

  gl_FragColor = vec4(bottomBorder, 1.0);
}
`;
