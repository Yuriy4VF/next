"use client";

import React, { useState } from "react";
import RegisterForm from "../../../components/forms/RegisterForm";

const RegistrationPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleRegister = async ({ username, password }) => {
    setErrorMessage("");
    setSuccessMessage("");

    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      setSuccessMessage("Registration successful!");
    } else {
      const data = await response.json();
      setErrorMessage(data.error || "Registration failed");
    }
  };

  return (
    <div>
      <h3>RegistrationPage</h3>
      {successMessage && <div style={{ color: "green" }}>{successMessage}</div>}
      <RegisterForm onSubmit={handleRegister} errorMessage={errorMessage} />
    </div>
  );
};

export default RegistrationPage;
