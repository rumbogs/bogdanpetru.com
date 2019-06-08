#define WORLD_SIZE 2

bool mesh_list_hit(const in Mesh world[WORLD_SIZE], const in Ray ray, const in float t_min, const in float t_max, inout float t, inout vec3 p, inout vec3 normal) {
  float temp_t;
  vec3 temp_p;
  vec3 temp_normal;
  bool hit_anything = false;
  float closest_so_far = t_max;
  for (int i = 0; i < WORLD_SIZE; i++) {
    if (mesh_hit(world[i], ray, t_min, closest_so_far, temp_t, temp_p, temp_normal)) {
      hit_anything = true;
      closest_so_far = temp_t;
      t = temp_t;
      p = temp_p;
      normal = temp_normal;
    }
  }
  return hit_anything;
}