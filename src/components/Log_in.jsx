import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/Profile.module.css"; // Import base styles
import LoginStyles from "../styles/Log_in.module.css"; // Import specific login styles
import Spinner from "./Spinner";
import { validateUser } from "../redux/store/Slices/usersSlice";
import { Link } from "react-router-dom";

const LogIn = () => {
  const { t, i18n } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onTouched",
  });
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(validateUser(data));
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

      <form className={LoginStyles.form} onSubmit={handleSubmit(onSubmit)} dir={`${i18n.language === "en" ? "ltr" : "rtl"}`}>
        <div className={LoginStyles.formGroup}>
          <label htmlFor="email" className={LoginStyles.label}>
            {t("Email")}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            {...register("email", {
              required: t("Email is required"),
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: t("Invalid email format"),
              },
            })}
            className={LoginStyles.input}
          />
          {errors.email && <p className={LoginStyles.errorMessage}>{errors.email.message}</p>}
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
              minLength: { value: 8, message: t("Minimum password length is 8 characters") },
            })}
            className={LoginStyles.input}
          />
          {errors.password && <p className={LoginStyles.errorMessage}>{errors.password.message}</p>}
        </div>

        <button type="submit" className={LoginStyles.submitButton} disabled={!isValid}>
          {t("Submit")}
        </button>
      </form>
    </div>
  );
};

export default LogIn;
