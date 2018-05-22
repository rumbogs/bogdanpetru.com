export default `
precision mediump float;

uniform vec2 u_mousePos;

void main() {
  gl_FragColor = vec4(1.0, u_mousePos, 1.0);
}
`;
