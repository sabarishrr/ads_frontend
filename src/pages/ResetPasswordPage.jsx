import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { resetPassword } from "../logics/ResetPasswordLogic";
import "../styles/ResetPasswordPage.css";

function ResetPasswordPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await resetPassword(token, password);
      setSuccess(true);
      setError("");
      setTimeout(() => navigate('/login'), 3000);
    } catch (error) {
      setSuccess(false);
      setError(error.message);
    }
  };

  return (
    <Container className="reset-password-container">
      <Row className="reset-password-row">
        <Col md={6} className="reset-password-form-col">
          <h1 className="reset-password-title">Reset Your Password</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">Password reset successfully! Redirecting to login...</Alert>}
          <Form onSubmit={handleResetPassword}>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="reset-password-input"
              />
            </Form.Group>
            <Form.Group controlId="formBasicConfirmPassword">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="reset-password-input"
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="reset-password-button">
              Reset Password
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default ResetPasswordPage;