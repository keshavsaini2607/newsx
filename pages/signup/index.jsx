import React, { useState } from "react";
import Link from "next/link";
import { Alert, Button, Form } from "react-bootstrap";
import styles from "../login/Login.module.css";
import { IoIosArrowBack } from "react-icons/io";
import { createUser } from "../../client/request";
import CustomAlert from "../../components/Alert";
import { useRouter } from "next/router";
import Head from "next/head";
import { useStore } from "../../shared";
import { getValue } from "../../utils/common";
import Loader from "../../components/Loader";

const Signup = () => {
  const router = useRouter();
  const [state, dispatch] = useStore();
  const [email, setEmail] = useState("");
  const [fName, setFName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);

  const user = getValue(state, ["user"], null);

  const makeUser = async (e) => {
    e.preventDefault();
    setError("");
    const payload = { email, fullName: fName, password };
    const response = await createUser(payload);
    if (response.error) {
      if (response?.message?.keyPattern?.email === 1) {
        console.log(response?.message?.keyPattern?.email === 1);
        setError("Email already exists");
      } else {
        setError(response.message);
      }
    } else {
      setError("");
      setEmail("");
      setFName("");
      setPassword("");
      console.log(response);
      router.replace("/login");
    }
  };

  if (user && user.authenticating) {
    return <Loader />
  }
  if (user && user.authenticated) {
    router.replace("/");
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create new account</title>
      </Head>
      <Form className={styles.form}>
        {error?.length > 1 && (
          <Alert key="error" variant="danger">
            <p style={{ textTransform: "capitalize" }}>{error}</p>
          </Alert>
        )}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Full Name"
            value={fName}
            onChange={(e) => setFName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Link href="/login">
            <Form.Text className={styles.link}>
              Have an account? Login
            </Form.Text>
          </Link>
        </Form.Group>
        <div className="d-grid gap-2">
          <Button variant="primary" size="md" onClick={makeUser}>
            Continue
          </Button>
        </div>
      </Form>
      <div
        style={{
          position: "absolute",
          top: 10,
          right: 5,
        }}
      >
        <CustomAlert show={show} />
      </div>
    </div>
  );
};

export default Signup;
