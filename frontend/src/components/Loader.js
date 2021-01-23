import React from 'react';
import {Spinner} from 'react-bootstrap';

const Loader = () => (
  <div className="spinner-container">
    <Spinner
      animation="border"
      role="status"
      style={{
        width: '80px',
        height: '80px',
        margin: 'auto',
        display: 'block',
      }}
    >
      <span className="sr-only">Loading...</span>
    </Spinner>
  </div>
);

export default Loader;
