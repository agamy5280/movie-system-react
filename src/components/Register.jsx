import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import LoginStyles from "../styles/Log_in.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onTouched",
  });

  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    data["past-reservation"] = [];
    data["movie-favorites"] = [];

    axios
      .post("http://localhost:8000/users", data)
      .then((res) => {
        alert("Register succesfully. Please Login first!");
        navigate("/login");
      })
      .catch((err) => {
        alert("Error Happen when registerd");
      });
  };

  return (
    <div className={LoginStyles.container}>
      <Link className={LoginStyles.logoLink} to="/">
        <img
          className={LoginStyles.logo}
          src="assets/images/logo-dark.png"
          alt="logo"
        />
      </Link>

      <form
        className={LoginStyles.form}
        onSubmit={handleSubmit(onSubmit)}
        dir={`${i18n.language === "en" ? "ltr" : "rtl"}`}
      >
        <div className={LoginStyles.formGroup}>
          <label htmlFor="firstName" className={LoginStyles.label}>
            {t("First Name")}
          </label>
          <input
            type="firstName"
            id="firstName"
            name="firstName"
            {...register("firstName", {
              required: "Please type your First Name!",
              minLength: {
                value: 3,
                message: "First Name must be minimum 3 characters!",
              },
              pattern: {
                value: /^[A-Za-z]+$/,
                message: "First Name must not contain numbers!",
              },
            })}
            className={LoginStyles.input}
          />
          {errors.firstName && (
            <p className={LoginStyles.errorMessage}>
              {errors.firstName.message}
            </p>
          )}
        </div>
        <div className={LoginStyles.formGroup}>
          <label htmlFor="lastName" className={LoginStyles.label}>
            {t("Last Name")}
          </label>
          <input
            type="lastName"
            id="lastName"
            name="lastName"
            {...register("lastName", {
              required: "Please type your Last Name!",
              minLength: {
                value: 3,
                message: "Last Name must be minimum 3 characters!",
              },
              pattern: {
                value: /^[A-Za-z]+$/,
                message: "Last Name must not contain numbers!",
              },
            })}
            className={LoginStyles.input}
          />
          {errors.lastName && (
            <p className={LoginStyles.errorMessage}>
              {errors.lastName.message}
            </p>
          )}
        </div>
        <div className={LoginStyles.formGroup}>
          <label htmlFor="phoneNumber" className={LoginStyles.label}>
            {t("Phone Number")}
          </label>
          <input
            type="phoneNumber"
            id="phoneNumber"
            name="phoneNumber"
            {...register("phoneNumber", {
              required: "Please type your phone number!",
              minLength: {
                value: 10,
                message: "Mobile number must be at least 10 numbers!",
              },
              maxLength: {
                value: 20,
                message: "Mobile number must be at most 20 numbers!",
              },
              pattern: {
                value: /^01\d+$/,
                message:
                  "Mobile number must start with '01' and does not contain characters.",
              },
            })}
            className={LoginStyles.input}
          />
          {errors.phoneNumber && (
            <p className={LoginStyles.errorMessage}>
              {errors.phoneNumber.message}
            </p>
          )}
        </div>
        <div className={LoginStyles.formGroup}>
          <label htmlFor="email" className={LoginStyles.label}>
            {t("Email")}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            {...register("email", {
              required: "Please type your email address!",
              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: "Please type a valid email address!",
              },
            })}
            className={LoginStyles.input}
          />
          {errors.email && (
            <p className={LoginStyles.errorMessage}>{errors.email.message}</p>
          )}
        </div>

        <div className={LoginStyles.formGroup}>
          <label htmlFor="password" className={LoginStyles.label}>
            {t("Password")}
          </label>
          <input
            type="password"
            id="password"
            name="password"
            {...register("password", {
              required: t("Password is required"),
              minLength: {
                value: 8,
                message: t("Minimum password length is 8 characters"),
              },
            })}
            className={LoginStyles.input}
          />
          {errors.password && (
            <p className={LoginStyles.errorMessage}>
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className={LoginStyles.submitButton}
          disabled={!isValid}
        >
          {t("Submit")}
        </button>
      </form>
    </div>
  );
};

export default Register;
