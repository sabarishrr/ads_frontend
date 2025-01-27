import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { sendResetEmail } from "../logics/ForgotPasswordLogic";
import "../styles/ForgotPasswordPage.css";


function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await sendResetEmail(email);
      setSuccess(true);
      setError("");
    } catch (error) {
      setSuccess(false);
      setError(error.message);
    }
  };

  return (
    <Container className="forgot-password-container">
      <Row className="forgot-password-row">
        <Col md={6} className="forgot-password-form-col">
          <h1 className="forgot-password-title">Forgot Your Key?</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">Email sent successfully!</Alert>}
          <Form onSubmit={handleForgotPassword}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="forgot-password-input"
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="forgot-password-button">
              Send Reset Email
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default ForgotPasswordPage;