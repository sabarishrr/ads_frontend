import "./App.css";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import UserManagementPage from './pages/UserManagementPage';
import HomePage from "./pages/HomePage";
import PrivateRoute from './logics/PrivateRoute';
import { AuthProvider } from "./logics/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgotPassword" element={<ForgotPasswordPage/>}/>
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
          <Route path="/users" element={ 
            <PrivateRoute allowedRoles={['admin', 'superadmin']}> 
              <UserManagementPage /> 
            </PrivateRoute> 
          } 
          />
          <Route path="/home" element={
              <PrivateRoute allowedRoles={['user', 'admin', 'superadmin']}>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
        </Router>
    </AuthProvider>
  );
}

export default App;