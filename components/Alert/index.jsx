import React from "react";
import { Alert } from "react-bootstrap";

const CustomAlert = ({show}) => {
  if (show) {
    return (
      <Alert variant="success">
        <Alert.Heading>Successfully created user</Alert.Heading>
      </Alert>
    );
  }
};

export default CustomAlert;
