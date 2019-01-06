import React from 'react';

import optiflowIcon from '../assets/ellipse_site@3x.png';

export default {
  title: 'Optiflow - a new mobile app',
  excerpt: 'Started working on a new React Native app, Optiflow',
  slug: 'about-optiflow',
  date: '2018-02-14',
  content: (
    <div>
      <div style={{ width: '20%' }}>
        <img src={optiflowIcon} alt="Optiflow Icon" />
      </div>
      <p>
        I recently been asked to develop an interesting iOS native app used in process optimization. I choose{' '}
        <a href="https://facebook.github.io/react-native/">React Native</a> given my experience with React and the
        strong community behind it. So far it has proven to be a good choice 😀.
      </p>
      <p>Will update with more information soon, stay tuned.</p>
    </div>
  ),
};
