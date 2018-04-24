export default `
uniform float time;
uniform sampler2D texture;

uniform float u_pixelSize;
varying vec2 vUv;
vec4 myTexture;

void main(void) {
  
  if (u_pixelSize != 0.0) {
    float pixels = 512.0;
    float dx = u_pixelSize * (1.0 / pixels);
    float dy = u_pixelSize * (1.0 / pixels);
    // center it by adding half of displacement
    vec2 coord = vec2((dx * floor(vUv.x / dx)) + (dx / 2.0), (dy * floor(vUv.y / dy)) + (dy / 2.0));
    myTexture = texture2D(texture, coord);
  } else {
    myTexture = texture2D(texture, vUv);
  }

  gl_FragColor = vec4(myTexture.rgb, myTexture.a);
}
`;
