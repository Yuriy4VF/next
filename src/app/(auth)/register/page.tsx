"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import RegisterForm from "../../../components/forms/RegisterForm";
import { registerUser, clearMessages } from "../../../store/registrationSlice";

const RegistrationPage = () => {
  const dispatch = useDispatch();
  const { errorMessage, successMessage } = useSelector(
    (state) => state.registration
  );

  const handleRegister = (data) => {
    dispatch(clearMessages());
    dispatch(registerUser(data));
  };

  return (
    <div>
      <h3>RegistrationPage</h3>
      {successMessage && <div style={{ color: "green" }}>{successMessage}</div>}
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      <RegisterForm onSubmit={handleRegister} />
    </div>
  );
};

export default RegistrationPage;
