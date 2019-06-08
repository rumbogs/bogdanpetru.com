struct Mesh {
  int type;
  vec3 center;
  float radius;
};

bool mesh_hit(const in Mesh mesh, const in Ray ray, const in float t_min, const in float t_max, inout float t, inout vec3 p, inout vec3 normal) {
  if (mesh.type == 0) {// SPHERE
    vec3 oc = ray.origin - mesh.center;
    float a = dot(ray.direction, ray.direction);
    float b = dot(oc, ray.direction);
    float c = dot(oc, oc) - pow(mesh.radius, 2.);
    float discriminant = pow(b, 2.) - a * c;
    if (discriminant > 0.) {
      float temp = (-b - sqrt(discriminant)) / a;
      if (temp < t_max && temp > t_min) {
        t = temp;
        p = point_at_parameter(ray, t);
        normal = (p - mesh.center) / mesh.radius;
        return true;
      }
      temp = (-b + sqrt(discriminant)) / a;
      if (temp < t_max && temp > t_min) {
        t = temp;
        p = point_at_parameter(ray, t);
        normal = (p - mesh.center) / mesh.radius;
        return true;
      }
    }
  }
  return false;
}