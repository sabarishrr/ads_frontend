import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { registerUser } from "../logics/RegisterLogic";
import "../styles/RegisterPage.css";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser(email, password, role);
      setSuccess(true);
      setError("");
    } catch (error) {
      setSuccess(false);
      setError(error.message);
    }
  };

  return (
    <Container className="register-container">
      <Row className="register-row">
        <Col md={6} className="register-form-col">
          <h1 className="register-title">Register</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">Registration successful!</Alert>}
          <Form onSubmit={handleRegister}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="register-input"
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="register-input"
              />
            </Form.Group>
            <Form.Group controlId="formBasicRole">
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="register-input"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="superadmin">Super Admin</option>
              </Form.Control>
            </Form.Group>
            <Button variant="success" type="submit" className="register-button">
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default RegisterPage;