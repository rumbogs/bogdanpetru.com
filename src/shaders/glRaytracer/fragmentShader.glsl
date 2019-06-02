@import ./includes/ray;

precision mediump float;

// #define PI 3.14159265359

uniform vec2 u_mousePos;
varying vec2 u_fragRes;

vec3 origin = vec3(0.0, 0.0, 0.0);
vec3 vertical = vec3(0.0, 2.0, 0.0);
vec3 horizontal = vec3(4.0, 0.0, 0.0);
vec3 lower_left_corner = vec3(-2.0, -1.0, -1.0);

vec3 color(Ray ray) {
  vec3 unit_direction = normalize(ray.direction);
  float t = 0.5 * (unit_direction.y + 1.0);
  vec3 white = vec3(1.0, 1.0, 1.0);
  vec3 sky_blue = vec3(0.5, 0.7, 1.0);
  return mix(white, sky_blue, t);
}

void main() {
  vec2 st = gl_FragCoord.xy / u_fragRes.xy; // 0 -> 1
  Ray ray = Ray(origin, lower_left_corner + st.x * horizontal + st.y * vertical);
  vec3 color = color(ray);

  gl_FragColor = vec4(color, 1.0);
}
