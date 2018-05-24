export default `
precision mediump float;

uniform vec2 u_fragResolution;
uniform float u_time;

float random (vec2 st) {
  return fract(sin(dot(st.xy,
    vec2(12.9898,78.233)))*
  43758.5453123);
}

void main() {
  vec2 st = gl_FragCoord.xy / u_fragResolution.xy * u_time;
  float rnd = random(st);
  gl_FragColor = vec4(vec3(rnd), 1.0);
}
`;
