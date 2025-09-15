import React, { useState } from "react";
import "./styles/Login.css"; // Using same CSS for now
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const password = watch("password");

  const onSubmit = async (data) => {
    setLoading(true);
    setApiError("");
    setSuccess("");

    try {
      console.log("Sending signup request...", data);

      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("Signup response:", result);

      if (response.ok) {
        setSuccess("Registration successful! Redirecting to login...");
        reset();
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setApiError(result.message || "Registration failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setApiError(
        "Network error. Please check if the backend server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Sign Up Form</h1>
      {success && <div className="success-message">{success}</div>}
      {apiError && <div className="error-message">{apiError}</div>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            {...register("name", { required: "Name is Required" })}
          />
          {errors.name && (
            <div className="error-message">{errors.name.message}</div>
          )}
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
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

        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            {...register("confirmPassword", {
              required: "Confirm Password is Required",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <div className="error-message">
              {errors.confirmPassword.message}
            </div>
          )}
        </div>

        <div>
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            {...register("age", {
              required: "Age is Required",
              min: { value: 1, message: "Age must be positive" },
              max: { value: 120, message: "Age must be realistic" },
            })}
          />
          {errors.age && (
            <div className="error-message">{errors.age.message}</div>
          )}
        </div>

        <div>
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            {...register("gender", { required: "Gender is Required" })}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && (
            <div className="error-message">{errors.gender.message}</div>
          )}
        </div>

        <button type="submit" className="button login" disabled={loading}>
          {loading ? "Registering..." : "Sign Up"}
        </button>

        <br />
        <span>
          Already have an account?{" "}
          <button
            type="button"
            className="button"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </span>
      </form>
    </div>
  );
};

export default SignUp;
