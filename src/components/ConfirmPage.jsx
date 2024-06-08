import React, { useEffect, useState } from "react";
import ConfirmStyle from "../styles/ConfirmPage.module.css";
import { getMovieByID } from "../redux/store/Slices/moviesSlice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./Spinner";
import { getUserByID, updateUser } from "../redux/store/Slices/usersSlice";
import { useTranslation } from "react-i18next";

const ConfirmPage = () => {
    const dispatch = useDispatch();
    const LocalUser = JSON.parse(localStorage.getItem('userData'));
    var user = useSelector((state) => state.users.user);
    const {t,i18n} = useTranslation();
    const searchParams = new URLSearchParams(window.location.search);
    const movieDetails = {
    id: searchParams.get("id"),
    title: searchParams.get("title"),
    time: searchParams.get("time"),
    seats: searchParams.get("seats"),
    price: searchParams.get("price"),
    image: searchParams.get("image"),
    location: searchParams.get("location"),
  };
const id =LocalUser.id
  useEffect(() => {
    if (id) {
      dispatch(getUserByID(id));
    }
  }, [dispatch, id]);

    const onClose = () => {
    const updatedPastRes = [...user["past-reservation"], movieDetails];
    const updatedUser = { ...user, "past-reservation": updatedPastRes };
    console.log(updatedUser);


    dispatch(updateUser({ id, updatedUser }))
    .unwrap()
    .then(() => {
      alert("User Updated successfully");
      window.location.href = "/";
    })
    .catch((err) => {
      console.error(err);
    });


  };

  if (!user) {
    return <Spinner />;
  }
  return (
    <div>
      <div className={ConfirmStyle.now_showing} dir={i18n.language=="en" ? "ltr" : "rtl"}>
        <div className={ConfirmStyle.what}>
          <h3>{t("Booking Details")}</h3>
        </div>

        <div className={ConfirmStyle.movie_sec}>
          <div className={ConfirmStyle.sec_details} style={{marginRight:20}}>
            <div className={ConfirmStyle.title}>
              <h4>{movieDetails.title}</h4>
            </div>
            <div className={ConfirmStyle.info}>
              <p>
              {t("Time")} : <span>{movieDetails.time}</span>
              </p>
              <p>
              {t("Location")}: <span>{movieDetails.location}</span>
              </p>
              <p>
              {t("Seats")}: <span>{movieDetails.seats}</span>
              </p>
            </div>
            <button className={ConfirmStyle.btn} onClick={onClose}>
            {t("Confirm")}
            </button>
          </div>
          <div className={ConfirmStyle.sec_img}>
            <img
              src={`assets/images/${movieDetails.image}`}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPage;
