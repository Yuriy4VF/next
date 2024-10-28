"use client";

import React, { useState } from "react";
import LoginForm from "../../../components/forms/LoginForm";

const LoginPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleLogin = async ({ username, password }) => {
    setErrorMessage("");
    setSuccessMessage("");

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      setSuccessMessage("Login successful!");
    } else {
      const data = await response.json();
      setErrorMessage(data.error || "Login failed");
    }
  };

  return (
    <div>
      <h3>LoginPage</h3>
      {successMessage && <div style={{ color: "green" }}>{successMessage}</div>}
      <LoginForm onSubmit={handleLogin} errorMessage={errorMessage} />
    </div>
  );
};

export default LoginPage;
