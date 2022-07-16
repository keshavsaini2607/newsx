import Link from "next/link";
import React, { useState } from "react";
import {
  Button,
  Container,
  Dropdown,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { useStore } from "../../shared";
import { getValue } from "../../utils/common";
import { signOut } from "next-auth/react";
import { loginConstants } from "../../shared/constants";
import { useRouter } from "next/router";
import { AiOutlineUser } from "react-icons/ai";

const Navigationbar = () => {
  const router = useRouter();
  const [state, dispatch] = useStore();
  const authenticated = getValue(state, ["user", "authenticated"], false);
  const user = getValue(state, ["user", "user"], null);

  const logout = () => {
    signOut({
      redirect: false,
    }).then((result) => {
      console.log({ result });
      dispatch({
        type: loginConstants.LOGIN_FAILURE,
      });
    });
  };

  return (
    <Navbar bg="light" expand="lg" fixed>
      <Container>
        <Navbar.Brand
          style={{ fontFamily: "'EB Garamond', serif", fontSize: "2rem" }}
        >
          <Link href="/">
            <span style={{ cursor: "pointer" }}>Headlines.com</span>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Latest News</Nav.Link>
            <Nav.Link href="#link">Sports</Nav.Link>
            <Nav.Link href="#link">Tech</Nav.Link>
          </Nav>
          {!authenticated ? (
            <Link href="/login">
              <Button variant="secondary">Login / Signup</Button>
            </Link>
          ) : (
            <Dropdown>
              <Dropdown.Toggle id="dropdown-basic">
                <AiOutlineUser size="20px" />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#" onClick={() => router.push("/profile")}>
                  View Profile
                </Dropdown.Item>
                <Dropdown.Item href="/post/create">Create News</Dropdown.Item>
                <Dropdown.Item href="#" onClick={logout}>
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigationbar;
