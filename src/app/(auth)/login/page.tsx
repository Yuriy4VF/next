"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "../../../components/forms/LoginForm";

import { login, clearMessages } from "../../../store/authSlice";
import { useRouter } from "next/router";

const LoginPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { errorMessage, successMessage } = useSelector((state) => state.auth);

  const handleLogin = async ({ username, password }) => {
    dispatch(clearMessages()); // Очистить сообщения перед новой попыткой входа
    dispatch(login({ username, password }));
  };

  useEffect(() => {
    if (successMessage) {
      router.push("/chat");
    }
  }, [successMessage, router]);

  return (
    <div>
      <h3>LoginPage</h3>
      {successMessage && <div style={{ color: "green" }}>{successMessage}</div>}

      <LoginForm onSubmit={handleLogin} errorMessage={errorMessage} />
    </div>
  );
};

export default LoginPage;
