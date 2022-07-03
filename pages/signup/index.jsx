import React from "react";
import Link from "next/link";
import { Button, Form } from "react-bootstrap";
import styles from "../login/Login.module.css";
import { IoIosArrowBack } from "react-icons/io";

const Signup = () => {
  return (
    <div className={styles.container}>
      <Form className={styles.form}>
        <Link href="/">
          <div className={styles.center}>
            <IoIosArrowBack
              size="25px"
              style={{ marginLeft: "-10px" }}
              color="rgb(213, 73, 73)"
            />
            <span style={{ color: "rgb(213, 73, 73)" }}>Home</span>
          </div>
        </Link>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Full Name</Form.Label>
          <Form.Control type="text" placeholder="Full Name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Link href="/login">
            <Form.Text className={styles.link}>
              Have an account? Login
            </Form.Text>
          </Link>
        </Form.Group>
        <div className="d-grid gap-2">
          <Button variant="primary" size="md">
            Continue
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Signup;
