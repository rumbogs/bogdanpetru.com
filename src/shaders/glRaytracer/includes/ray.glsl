precision mediump float;

struct Ray {
  vec3 origin;
  vec3 direction;
};

vec3 point_at_parameter(vec3 a, vec3 b, float t) {
  return a + t * b;
}