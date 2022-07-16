import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <div style={{
        height: '100vh',
        width: '100vw',
        backgroundColor: '#FFFFFF',
        display: 'grid',
        placeItems: 'center',
    }}>
      <Spinner animation="border" />
      <h1>Loading please wait...</h1>
    </div>
  );
};

export default Loader;
