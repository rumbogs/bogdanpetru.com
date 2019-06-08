struct Ray {
  vec3 origin;
  vec3 direction;
};

vec3 point_at_parameter(const in Ray ray, const in float t) {
  return ray.origin + t * ray.direction;
}