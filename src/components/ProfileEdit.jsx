import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import styles from "../styles/Profile.module.css";
import Spinner from "./Spinner";
import { getUserByID, updateUser } from "../redux/store/Slices/usersSlice";

export default function ProfileEdit() {
  const { t, i18n } = useTranslation();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);
  const status = useSelector((state) => state.users.status);
  const error = useSelector((state) => state.users.error);

  useEffect(() => {
    if (id) {
      dispatch(getUserByID(id));
    }
  }, [dispatch, id]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onTouched",
    defaultValues: user,
  });

  const onSubmit = (data) => {
    dispatch(updateUser({ id, updatedUser: data }))
      .unwrap()
      .then(() => {
        alert("User Updated successfully");
        window.location.href = "/";
      })
      .catch((err) => {
        console.error(err);
      });
  };

  if (status === "loading" || !user) {
    return <Spinner />;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <form
      className={styles.registerForm}
      onSubmit={handleSubmit(onSubmit)}
      dir={`${i18n.language === "en" ? "ltr" : "rtl"}`}
    >
      <div>
        <div className={styles.mySpan}>
          <h5>
            <img
              className={styles.icon}
              src="assets/images/user.png"
              alt="User icon"
            />
            <span>{t("Account Profile")}</span>
          </h5>
        </div>
        <div>
          <div>
            <label>{t("First Name")}</label>
            <input
              type="text"
              placeholder="John"
              defaultValue={user.firstName}
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
            />
            {errors.firstName && (
              <p className="text-danger">{errors.firstName.message}</p>
            )}
          </div>
          <div>
            <label>{t("Last Name")}</label>
            <input
              type="text"
              placeholder="Doe"
              defaultValue={user.lastName}
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
            />
            {errors.lastName && (
              <p className="text-danger">{errors.lastName.message}</p>
            )}
          </div>
          <div>
            <label>{t("Phone Number")}</label>
            <input
              type="text"
              placeholder="+123 456 789"
              defaultValue={user.phoneNumber}
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
            />
            {errors.phoneNumber && (
              <p className="text-danger">{errors.phoneNumber.message}</p>
            )}
          </div>
          <div>
            <label>{t("Email")}</label>
            <input
              type="text"
              placeholder="John@hotmail.com"
              defaultValue={user.email}
              {...register("email", {
                required: "Please type your email address!",
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  message: "Please type a valid email address!",
                },
              })}
            />
            {errors.email && (
              <p className="text-danger">{errors.email.message}</p>
            )}
          </div>
        </div>
        <input
          type="submit"
          className="btn btn-block btn-primary font-weight-bold py-3"
          value={t("Edit Profile")}
          disabled={!isValid}
        />
      </div>
    </form>
  );
}
