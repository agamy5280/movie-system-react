import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Spinner from "./Spinner";
import styles from "../styles/preReservartions.module.css";
import { fetchPrevReservations } from "../redux/store/Slices/usersSlice";

export default function PrevReservation() {
  const { t, i18n } = useTranslation();
  const userID = JSON.parse(localStorage.getItem("userData")).id;
  const dispatch = useDispatch();
  const reservations = useSelector((state) => state.users.reservations);
  const status = useSelector((state) => state.users.status);
  const error = useSelector((state) => state.users.error);

  useEffect(() => {
    if (userID) {
      dispatch(fetchPrevReservations(userID));
      console.log(reservations);
    }
  }, [dispatch, userID]);

  if (status === "loading" || !reservations) {
    return <Spinner />;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles["now-showing"]} >
      <div className="row" dir={i18n.language==="en"? "ltr" : "rtl"}>
        <h1 className={styles.what}>{t("Last Reservations")}</h1>
        <p className={`${styles.dashed} pb-2`}></p>
      </div>
      {reservations?.map((reservation) => {
        return (
          <div className={styles["movie-sec"]} key={reservation.id}>
            <div className={styles["sec-img"]}>
              <img src={`assets/images/${reservation.image}`} alt="" />
            </div>
            <div className={styles["sec-details"]} dir={i18n.language==="en"? "ltr" : "rtl"} style={{marginRight:20}}>
              <div className={styles.title}>
                <h3>{t("Movie Name")}: {reservation.title} </h3>
              </div>
              <div className={styles.info}>
                <p>
                  {t("Time")}: <span>{reservation.time}</span>
                </p>
                <p>
                  {t("Location")}: <span>{reservation.location}</span>
                </p>
                <p>
                  {t("Seats")}: <span>{reservation.seats}</span>
                </p>
                <p>
                  {t("Price")}: <span>{reservation.price} {t("EGP")}</span>
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
