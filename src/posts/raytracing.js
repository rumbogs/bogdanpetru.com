import React from 'react';

import GLRaytracer from '../components/GLRaytracer/GLRaytracer';

export default {
  title: 'Raytracing experiment',
  excerpt: "Trying to build a raytracer in Rust, failed on more advanced topics, so I'm building it in WebGL...",
  slug: 'raytracing',
  date: '2019-05-28',
  content: (
    <div>
      <p>
        Started to build a raytracer in Rust based on Peter Shirley&apos;s very nice tutorial Raytracing in a Week End.
        I couldn&apos;t get the noise function working as expected, seems that the random number implementation in Rust
        is different than C++. Also my BVH implementation was making the renderer slower instead of faster so... go
        figure.
      </p>
      <GLRaytracer />
    </div>
  ),
};
