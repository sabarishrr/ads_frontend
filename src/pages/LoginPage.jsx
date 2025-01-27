import React, { useState } from "react";
import { Form,Button,Container,Row,Col,Alert } from "react-bootstrap";
import loginImage from "../assets/images/login.jpg";
import { loginUser } from "../logics/LoginLogic";
import "../styles/LoginPage.css";
import { useAuth } from "../logics/AuthContext";
import { Link } from "react-router-dom"

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { token, role } = await loginUser(email, password);
      login(token, role);
      setSuccess(true);
      setError("");
    } catch (error) {
      setSuccess(false);
      setError(error.message);
    }
  };

  return (
    <Container className="login-container">
      <Row className="login-row">
        <Col md={6} className="login-image-col">
          <img
            src={loginImage}
            alt="Person opening door"
            className="login-image"
          />
        </Col>
        <Col md={6} className="login-form-col">
          <h1 className="login-title">Hello, Welcome!</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">Login successful!</Alert>}
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Insert Your Key</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email / Phone No"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="login-input"
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
              />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox" className="mb-3">
              <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>
            <Button variant="primary" type="submit" className="login-button">
              Log-In
            </Button>
            {/* <Button variant="link" className="login-button"> */}
              
            {/* </Button> */}
            <Link to="/forgotPassword">Forgot Your Key?</Link>
            
          </Form>
          <p> Don't have an account? <Link to="/register"><Button variant="success"  type="button" className="login-button">
              Sign-Up
            </Button></Link> </p>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;