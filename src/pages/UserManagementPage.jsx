import React, { useState, useEffect } from "react";
import { Table, Button, Form, Container, Row, Col, Alert } from "react-bootstrap";
import { fetchUsers, addUser, updateUser, deleteUser } from "../logics/UserManagementLogic";
import "../styles/UserManagementPage.css";

function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [editingUser, setEditingUser] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const users = await fetchUsers();
      setUsers(users);
    } catch (error) {
      setError("Failed to load users");
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await addUser({ email, password, role });
      setSuccess("User added successfully");
      setError("");
      loadUsers();
    } catch (error) {
      setError("Failed to add user");
      setSuccess("");
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ id: editingUser._id, email, role });
      setSuccess("User updated successfully");
      setError("");
      loadUsers();
      setEditingUser(null);
    } catch (error) {
      setError("Failed to update user");
      setSuccess("");
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      setSuccess("User deleted successfully");
      setError("");
      loadUsers();
    } catch (error) {
      setError("Failed to delete user");
      setSuccess("");
    }
  };

  return (
    <Container className="user-management-container">
      <h1>User Management</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={editingUser ? handleUpdateUser : handleAddUser}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        {!editingUser && (
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
        )}
        <Form.Group controlId="formBasicRole">
          <Form.Label>Role</Form.Label>
          <Form.Control
            as="select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="superadmin">Super Admin</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          {editingUser ? "Update User" : "Add User"}
        </Button>
        {editingUser && (
          <Button variant="secondary" onClick={() => setEditingUser(null)}>
            Cancel
          </Button>
        )}
      </Form>
      <Table striped bordered hover className="user-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Button variant="warning" onClick={() => setEditingUser(user)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDeleteUser(user._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default UserManagementPage;