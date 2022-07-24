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
    return <Loader />;
  }
  if (user && user.authenticated) {
    router.replace("/");
  }

  return (
    <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-center text-indigo-600 sm:text-3xl">
          Join Us Today!
        </h1>

        <p className="max-w-md mx-auto mt-4 text-center text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati
          sunt dolores deleniti inventore quaerat mollitia?
        </p>

        <form
          className="p-8 mt-6 mb-0 space-y-4 rounded-lg shadow-2xl"
          onSubmit={makeUser}
        >
          <p className="text-lg font-medium">Create a new account</p>

          <div>
            <label htmlFor="email" className="text-sm font-medium">
              Full Name
            </label>

            <div className="relative mt-1">
              <input
                type="text"
                id="fName"
                className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                placeholder="Your Full Name"
                value={fName}
                onChange={(e) => setFName(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>

            <div className="relative mt-1">
              <input
                type="email"
                id="email"
                className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <span className="absolute inset-y-0 inline-flex items-center right-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>

            <div className="relative mt-1">
              <input
                type="password"
                id="password"
                className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <span className="absolute inset-y-0 inline-flex items-center right-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="block w-full px-5 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg"
          >
            Create Account
          </button>

          <p className="text-sm text-center text-gray-500">
            Already have an account?
            <Link href="/login">
              <a className="underline" href="#">
                Log in
              </a>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
