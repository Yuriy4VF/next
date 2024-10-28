import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styled from "styled-components";
import { TextField, Button, Typography, Container } from "@mui/material";

const registerSchema = yup.object().shape({
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

const RegisterForm = ({ onSubmit, errorMessage }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  return (
    <StyledContainer maxWidth="sm">
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h4" gutterBottom style={{ textAlign: "center" }}>
          Register
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
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <StyledButton type="submit" variant="contained" color="primary">
          Register
        </StyledButton>
      </StyledForm>
    </StyledContainer>
  );
};

export default RegisterForm;
