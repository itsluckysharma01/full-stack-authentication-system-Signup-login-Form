import React, { useState } from "react";
import "./styles/Login.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const onSubmit = async (data) => {
    setLoading(true);
    setApiError("");
    setSuccess("");

    try {
      console.log('Sending login request...', data);
      
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log('Login response:', result);

      if (response.ok) {
        setSuccess(`Welcome back, ${result.user.name}! Login successful!`);
        // Store user data in localStorage
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));
        reset();
        
        // Redirect after 2 seconds
        setTimeout(() => {
          // You can redirect to dashboard or home page here
          console.log('User logged in successfully');
        }, 2000);
      } else {
        setApiError(result.message || "Login failed");
      }
    } catch (error) {
      console.error('Login error:', error);
      setApiError("Network error. Please check if the backend server is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Login Form</h1>
      {success && <div className="success-message">{success}</div>}
      {apiError && <div className="error-message">{apiError}</div>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            {...register("email", {
              required: "Email is Required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Email is Invalid",
              },
            })}
          />

          {errors.email && (
            <div className="error-message">{errors.email.message}</div>
          )}
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            {...register("password", {
              required: "Password is Required",
              minLength: {
                value: 6,
                message: "Password Must Be At Least 6 Characters",
              },
            })}
          />
          {errors.password && (
            <div className="error-message">{errors.password.message}</div>
          )}
        </div>
        <button type="submit" className="button login" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        <br></br>
        <span>
          for new Registration{" "}
          <button
            type="button"
            className="button"
            onClick={() => navigate("/signup")}
          >
            SignUp
          </button>{" "}
          here
        </span>
      </form>
    </div>
  );
};

export default Login;