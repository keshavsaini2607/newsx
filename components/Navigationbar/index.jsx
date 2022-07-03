import Link from "next/link";
import React from "react";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

const Navigationbar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand
          style={{ fontFamily: "'EB Garamond', serif", fontSize: "2rem" }}
        >
          <Link href="/">
            <span style={{cursor: 'pointer'}}>News X</span>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Latest News</Nav.Link>
            <Nav.Link href="#link">Sports</Nav.Link>
            <Nav.Link href="#link">Tech</Nav.Link>
          </Nav>
          <Link href="/login">
            <Button variant="secondary">Login / Signup</Button>
          </Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigationbar;
