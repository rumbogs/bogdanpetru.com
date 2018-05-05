import React from 'react';
import { withRouter } from 'react-router-dom';

const ButtonWithRouter = ({ onClick, children, slug, history }) => (
  <button
    onClick={() => {
      onClick();
      history.push(slug);
    }}
  >
    {children}
  </button>
);

export default withRouter(ButtonWithRouter);
