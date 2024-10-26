import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styled from "styled-components";
import { TextField, Button, Typography, Container } from "@mui/material";

const loginSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must not exceed 20 characters"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(30, "Password must not exceed 30 characters"),
});

const StyledContainer = styled(Container)`
  max-width: 400px;
  min-width: 240px;
  background-color: var(--bgSoft);
  border: 1px solid gray;
  padding: 12px;
  border-radius: 8px;
  color: white;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
`;

const StyledButton = styled(Button)`
  align-self: flex-start;
`;

const ErrorMessage = styled(Typography)`
  color: red;
`;

const SuccessMessage = styled(Typography)`
  color: green;
`;

const StyledTextField = styled(TextField)`
  background-color: rgba(255, 255, 255, 0.1);
  color: white;

  & .MuiInputBase-input {
    color: white;
  }

  & .MuiOutlinedInput-root {
    & fieldset {
      border-color: white;
    }

    &.Mui-focused fieldset {
      border-color: blue;
    }
  }
`;

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit = async ({ username, password }) => {
    clearErrors();
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
      setError("root", { message: data.error || "Login failed" });
    }
  };

  return (
    <StyledContainer maxWidth="sm">
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h4" gutterBottom style={{ textAlign: "center" }}>
          Login
        </Typography>
        <StyledTextField
          fullWidth
          label="Username"
          variant="outlined"
          {...register("username")}
          error={!!errors.username}
          helperText={errors.username ? errors.username.message : ""}
        />
        <StyledTextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password ? errors.password.message : ""}
        />
        {errors.root && <ErrorMessage>{errors.root.message}</ErrorMessage>}
        {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
        <StyledButton type="submit" variant="contained" color="primary">
          Login
        </StyledButton>
      </StyledForm>
    </StyledContainer>
  );
};

export default LoginForm;
