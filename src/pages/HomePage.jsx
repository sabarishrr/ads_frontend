import React from "react";
import { useAuth } from "../logics/AuthContext";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function HomePage() {
  const { user, logout } = useAuth();

  return (
    <Container>
      <Navbar bg="light" expand="lg">
        <LinkContainer to="/home">
          <Navbar.Brand>MyApp</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/home">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            {(user.role === "admin" || user.role === "superadmin") && (
              <LinkContainer to="/users">
                <Nav.Link>User Management</Nav.Link>
              </LinkContainer>
            )}
          </Nav>
          <Button variant="outline-danger" onClick={logout}>
            Logout
          </Button>
        </Navbar.Collapse>
      </Navbar>
      <h1>Welcome, {user.role}!</h1>
      {user.role === "superadmin" && <p>Super Admin content...</p>}
      {user.role === "admin" && <p>Admin content...</p>}
      {user.role === "user" && <p>User content...</p>}
    </Container>
  );
}

export default HomePage;
