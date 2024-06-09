import React from 'react';
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import LoginStyles from "../styles/Log_in.module.css"; // Import specific login styles
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
      } = useForm({
        mode: "onTouched",
      });

      const {t,i18n} = useTranslation();
      const navigate = useNavigate();
      const onSubmit = (data) => {
        data["past-reservation"] = [];

        axios.post("http://localhost:8000/users",data)
        .then(res=>{
            alert("Register succesfully. Please Login first!");
            navigate("/login");
        }).catch(err=>{
            alert("Error Happen when registerd");
        })
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
            <label htmlFor="firstName" className={LoginStyles.label}>
                {t("First Name")}
            </label>
            <input
                type="firstName"
                id="firstName"
                name="firstName"
                {...register("firstName", {
                required: t("First Name is required"),
                minLength: { value: 3, message: t("Minimum First Name length is 3 characters") },
                })}
                className={LoginStyles.input}
            />
            {errors.firstName && <p className={LoginStyles.errorMessage}>{errors.firstName.message}</p>}
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
                required: t("Last Name is required"),
                minLength: { value: 3, message: t("Minimum Last Name length is 3 characters") },
                })}
                className={LoginStyles.input}
            />
            {errors.lastName && <p className={LoginStyles.errorMessage}>{errors.lastName.message}</p>}
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
                required: t("Phone Number is required"),
                minLength: { value: 11, message: t("Minimum Phone Number length is 11 characters") },
                })}
                className={LoginStyles.input}
            />
            {errors.phoneNumber && <p className={LoginStyles.errorMessage}>{errors.phoneNumber.message}</p>}
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
}

export default Register;
