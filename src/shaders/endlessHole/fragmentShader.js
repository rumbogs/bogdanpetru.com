export default `
precision mediump float;

#define PI 3.14159265359

uniform vec2 u_mousePos;
uniform vec2 u_minMousePos;
varying vec2 u_fragRes;

mat2 rotate2d(float _angle){
  return mat2(cos(_angle),-sin(_angle),
              sin(_angle),cos(_angle));
}

vec3 rectOutline (vec2 st, vec2 aspectRatio, vec2 diagDelta, vec4 width, vec4 offset, vec3 startColor, vec3 endColor) {
  // float bLX = st.x * 1.0 / (1.0 - mouse.x);
  // float bLY = st.y * (1.0 - mouse.y);
  // float lTX = 1.0 - 1.0 / (1.0 - mouse.x) * st.x;
  // float lTY = st.y * (mouse.y) + (1.0 - mouse.y);
  // float rBX = 1.0 - (1.0 - mouse.y) * st.y;
  // float rBY = st.x * (1.0 - mouse.x) + mouse.x; // add mouse.x to keep graph origin at (1,0)

  float rBX = st.x;
  float rBY = 1.0 - st.y * aspectRatio.y;
  float tRX = st.x * aspectRatio.x - diagDelta.x;
  float tRY = st.y;
  vec4 maskFunc = vec4(
    //////// TOP ///////
    // st.x, st.y
    // step(
    //   st.x,
    //   st.y
    // ) - step(
    //   st.x * aspectRatio.x * (1.0 - u_mousePos.y),
    //   1.0 - st.y
    // ),
    step(
      (1.0 - st.y * (1.0 / (u_mousePos.y + u_minMousePos.y)) - (1.0 - (1.0 / (u_mousePos.y + u_minMousePos.y)))) * (u_mousePos.y / 0.1),
      1.0 - st.x
    ) - step(
      st.x * aspectRatio.x * (1.0 - u_mousePos.y),
      1.0 - st.y
    ),
    //////// LEFT ///////
    step(
      st.x * aspectRatio.x * (1.0 - u_mousePos.y),
      1.0 - st.y
    ) - step(
      st.y * aspectRatio.y * (1.0 - u_mousePos.y + u_minMousePos.y),
      st.x
    ),
    //////// BOTTOM ///////
    step(
      st.y * aspectRatio.y * (1.0 - u_mousePos.y + u_minMousePos.y), // adding minimum mouse y position keep values bigger than 0
      st.x
    ) - step(
      1.0 - st.y * aspectRatio.y * (1.0 - u_mousePos.y + u_minMousePos.y),
      st.x
    ),
    //////// RIGHT ///////
    step(
      st.y * (u_mousePos.y) + (1.0 - u_mousePos.y),
      st.x
    ) - step(
      st.x,
      1.0 - st.y * aspectRatio.y * (1.0 - u_mousePos.y + u_minMousePos.y)
    )
  );

  vec3 bb = mix(
    startColor,
    endColor,
    smoothstep(
      offset.z,
      width.z + offset.z,
      mix(
        1.0,
        st.y,
        maskFunc.z
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
        maskFunc.y
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
        maskFunc.x
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
        maskFunc.w
      )
    )
  );

  vec3 rbWithOffset = mix(
    endColor,
    rb,
    step(offset.w, 1.0 - st.x)
  );

  return 
    bbWithOffset
    // lbWithOffset +
    // tbWithOffset
    // rbWithOffset
  ;
}

void main() {
  vec2 st = gl_FragCoord.xy / u_fragRes.xy; // 0 -> 1
  const float HALF_VIEWPORT = 0.5;
  const float WIDTH = 0.3;

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

  vec3 bb = mix(purple, black, step(0.1, st.y));

  st = rotate2d(PI * 0.2) * st;

  vec3 rb = mix(purple, black, step(0.01, st.y));

  color = bb + rb;

  // color += rectOutline(
  //   st,
  //   aspectRatio,
  //   diagDelta,
  //   width,
  //   offset,
  //   purple,
  //   black
  // );

  gl_FragColor = vec4(color, 1.0);
}
`;
