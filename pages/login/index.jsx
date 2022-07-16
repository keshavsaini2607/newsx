import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import styles from "./Login.module.css";
import { IoIosArrowBack } from "react-icons/io";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useStore } from "../../shared";
import { loginConstants } from "../../shared/constants";
import { getValue } from "../../utils/common";
import Loader from "../../components/Loader";

const Login = () => {
  const router = useRouter();
  const [state, dispatch] = useStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const user = getValue(state, ["user"], null);

  const loginHandler = async (e) => {
    e.preventDefault();
    setError("");
    const payload = { email, password };
    dispatch({ type: loginConstants.LOGIN_REQUEST });
    const result = await signIn("credentials", { ...payload, redirect: false });
    console.log({ result });
    if (!result.error) {
      const session = await getSession();
      dispatch({
        type: loginConstants.LOGIN_SUCCESS,
        payload: session
      })
      router.replace(`/`);
    } else {
      setError(result.error);
      dispatch({
        type: loginConstants.LOGIN_FAILURE,
        payload: result.error
      })
    }
  };

  if(user && user.authenticating) {
    return <Loader />
  }

  if(user && user.authenticated) {
    router.replace('/')
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>News X Login</title>
      </Head>

      <Form className={styles.form} onSubmit={loginHandler}>
        {error?.length > 1 && (
          <Alert key="error" variant="danger">
            <p style={{ textTransform: "capitalize" }}>{error}</p>
          </Alert>
        )}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <Link href="/signup">
            <Form.Text className={styles.link}>New here? Signup</Form.Text>
          </Link>
        </Form.Group>
        <div className="d-grid gap-2">
          <Button variant="primary" size="md" type="submit">
            Continue
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Login;
