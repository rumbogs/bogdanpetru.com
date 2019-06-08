struct Camera {
    vec3 origin;
    vec3 lower_left_corner;
    vec3 horizontal;
    vec3 vertical;
};

Ray get_ray(const in Camera camera, const in float u, const in float v) {
    return Ray(camera.origin, camera.lower_left_corner + u * camera.horizontal + v * camera.vertical - camera.origin);
}