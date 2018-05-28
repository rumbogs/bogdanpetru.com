export default `
precision mediump float;

uniform vec2 u_mousePos;
varying vec2 u_fragRes;

vec3 rectOutline (vec2 st, vec2 aspectRatio, vec2 diagDelta, vec2 mouse, vec4 width, vec4 offset, vec3 startColor, vec3 endColor) {
  vec2 mask = st * aspectRatio;
  vec3 bb = mix(
    startColor,
    endColor,
    smoothstep(
      offset.z,
      width.z + offset.z,
      mix(
        1.0,
        st.y,
        step((1.0 - mouse.y) * st.y, st.x) - step(1.0 - (1.0 - mouse.y) * mask.y, st.x)
      )
    )
  );

  vec3 bbWithOffset = mix(
    endColor,
    bb,
    step(offset.z, st.y)
  );

  vec3 lb = mix(
    startColor,
    endColor,
    smoothstep(
      offset.y, 
      width.y + offset.y,
      mix(
        1.0,
        st.x,
        step((1.0 - mouse.y) * st.x, st.y) - step(1.0 - (1.0 - mouse.x) * mask.x, st.y)
      )
    )
  );

  vec3 lbWithOffset = mix(
    endColor,
    lb,
    step(offset.y, st.x)
  );

  vec3 tb = mix(
    startColor,
    endColor,
    smoothstep(
      offset.x,
      width.x + offset.x,
      mix(
        1.0,
        1.0 - st.y,
        step(mask.x - diagDelta.x, st.y) - step(mask.x, 1.0 - st.y)
      )
    )
  );

  vec3 tbWithOffset = mix(
    endColor,
    tb,
    step(offset.x, 1.0 - st.y)
  );

  vec3 rb = mix(
    startColor,
    endColor,
    smoothstep(
      offset.w,
      width.w + offset.w,
      mix(
        1.0,
        1.0 - st.x,
        step(mask.y - diagDelta.y, st.x) - step(mask.y, 1.0 - st.x) // add small values to avoid artifacts
      )
    )
  );

  vec3 rbWithOffset = mix(
    endColor,
    rb,
    step(offset.w, 1.0 - st.x)
  );

  return 
    bbWithOffset +
    lbWithOffset
    // tbWithOffset +
    // rbWithOffset
  ;
}

void main() {
  vec2 st = gl_FragCoord.xy / u_fragRes.xy; // 0 -> 1
  const float HALF_VIEWPORT = 0.5;
  const float WIDTH = 0.1;

  // find aspect ratio for both directions
  vec2 aspectRatio = vec2(u_fragRes.x / u_fragRes.y, u_fragRes.y / u_fragRes.x);

  // find diagonal offset for top and right border angle
  vec2 diagDelta = aspectRatio - 1.0;

  // find width of border for each side, based on mouse position
  vec4 width = vec4(
    1.0 - u_mousePos.y,
    (1.0 - u_mousePos.x) * aspectRatio.y,
    1.0 + u_mousePos.y,
    (1.0 + u_mousePos.x) * aspectRatio.y
  ) * WIDTH;

  vec3 purple = vec3(0.6, 0.0, 0.6);
  vec3 black = vec3(0.0);
  vec3 color = black;

  // for( float i = 0.0; i <= 5.0; i++ ) {
  //   vec4 offset = width * i * 0.7;
    
  //   color += rectOutline(
  //     st,
  //     aspectRatio,
  //     diagDelta,
  //     width,
  //     offset,
  //     purple * pow(i * 0.5, 4.0),
  //     black
  //   );
  // }

  vec4 offset = width * 0.0 * 0.7;

  color += rectOutline(
    st,
    aspectRatio,
    diagDelta,
    u_mousePos,
    width,
    offset,
    purple,
    black
  );

  gl_FragColor = vec4(color, 1.0);
}
`;
