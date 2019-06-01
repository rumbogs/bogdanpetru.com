attribute vec2 a_position;

uniform vec2 u_resolution;
varying vec2 u_fragRes;

void main() {
   // convert the rectangle points from pixels to 0.0 to 1.0
   vec2 clipSpace = (a_position / u_resolution * 2.0) - 1.0; // -1, 1

   gl_Position = vec4(clipSpace, 0, 1);
   u_fragRes = u_resolution;
}
