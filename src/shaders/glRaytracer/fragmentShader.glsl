precision mediump float;

#define PI 3.14159265359

uniform vec2 u_mousePos;
varying vec2 u_fragRes;

float box(in vec2 _st, in vec2 _size){
  _size = vec2(0.5) - _size * 0.5;
  vec2 uv = smoothstep(
    _size,
    _size + vec2(0.1),
    _st
  ) * smoothstep(
    _size,
    _size + vec2(0.1),
    vec2(1.0) - _st
  );

  return uv.x * uv.y;
}

void main() {
  vec2 st = gl_FragCoord.xy / u_fragRes.xy; // 0 -> 1
  const float WIDTH = 0.1;

  vec3 purple = vec3(0.094, 0.094, 0.094);
  vec3 black = vec3(0.0);
  vec3 color = black;

  for( float i = 1.0; i > 0.0 ; i -= WIDTH ) {
    color += vec3(mix(purple, black, box(st, vec2(i))));
    st += u_mousePos * 0.05;
  }

  gl_FragColor = vec4(color, 1.0);
}
