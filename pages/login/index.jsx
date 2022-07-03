import Head from "next/head";
import Link from "next/link";
import React from "react";
import { Button, Form } from "react-bootstrap";
import styles from "./Login.module.css";
import { IoIosArrowBack } from "react-icons/io";

const Login = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>News X Login</title>
      </Head>
      <Form className={styles.form}>
        <Link href="/">
          <div className={styles.center}>
            <IoIosArrowBack size="25px" style={{ marginLeft: '-10px' }} color="rgb(213, 73, 73)" />
            <span style={{color: "rgb(213, 73, 73)"}}>Home</span>
          </div>
        </Link>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Link href="/signup">
            <Form.Text className={styles.link}>New here? Signup</Form.Text>
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

export default Login;
