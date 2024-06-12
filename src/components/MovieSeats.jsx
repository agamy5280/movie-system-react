import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import Spinner from "./Spinner";
import { getMovieByID } from "../redux/store/Slices/moviesSlice";
import styles from "../styles/Seats.module.css";

export default function MovieSeats() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const movieTime = searchParams.get("time");
  const movieLocation = searchParams.get("location");

  const [leftSeats, setLeftSeats] = useState(generateSeatData(5, 4));
  const [middleSeats, setMiddleSeats] = useState(generateSeatData(5, 8));
  const [rightSeats, setRightSeats] = useState(generateSeatData(5, 4));
  const [selectedSeats, setSelectedSeats] = useState([]);

  const movie = useSelector((state) => state.movies.movie);
  const status = useSelector((state) => state.movies.status);
  const error = useSelector((state) => state.movies.error);

  const navigate = useNavigate();
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (!userData) {
      alert("You must log in first!");
      navigate("/login");
    }
  }, [navigate]);
  useEffect(() => {
    if (id) {
      dispatch(getMovieByID(id));
    }
  }, [dispatch, id]);

  function generateSeatData(rows, seatsPerRow) {
    const seatData = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < seatsPerRow; j++) {
        const seatCode = `${i + 1}${String.fromCharCode(65 + j)}`;
        const occupied = Math.random() < 0.3;
        const seat = {
          number: seatCode,
          occupied: occupied,
          selected: false,
        };
        row.push(seat);
      }
      seatData.push(row);
    }
    return seatData;
  }

  const seatClicked = (seat, section) => {
    if (!seat.occupied) {
      const updatedSeat = { ...seat, selected: !seat.selected };
      const seatCode = updatedSeat.number;
      let updatedSelectedSeats = [...selectedSeats];

      if (updatedSeat.selected) {
        updatedSelectedSeats.push(seatCode);
      } else {
        updatedSelectedSeats = updatedSelectedSeats.filter(
          (selectedSeat) => selectedSeat !== seatCode
        );
      }

      setSelectedSeats(updatedSelectedSeats);

      // Update seat state
      const updateSeatData = (seatData, setSeatData) => {
        const updatedData = seatData.map((row) =>
          row.map((s) => (s.number === seatCode ? updatedSeat : s))
        );
        setSeatData(updatedData);
      };

      switch (section) {
        case "left":
          updateSeatData(leftSeats, setLeftSeats);
          break;
        case "middle":
          updateSeatData(middleSeats, setMiddleSeats);
          break;
        case "right":
          updateSeatData(rightSeats, setRightSeats);
          break;
        default:
          break;
      }
    }
  };
  const confirmReservation = () => {
    const params = new URLSearchParams({
      id: movie.id,
      title: movie.title,
      image: movie.movie_image,
      time: movieTime,
      location: movieLocation,
      seats: selectedSeats,
      price: calculateTicketPrice(),
    });
    navigate(`/confirm?${params.toString()}`);
  };

  const calculateTicketPrice = () => {
    const selectedCount = selectedSeats.length;
    return selectedCount * 100;
  };

  if (status === "loading" || !movie) {
    return <Spinner />;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className={styles.title}>
        <div className={styles.chooseSeats}>
          <img
            className={styles.seatImg}
            src="assets/images/armchair.png"
            alt="Choose Seats"
          />
          <h2 className={styles.titleSeats}>{t("Choose Seats")}</h2>
        </div>
      </div>
      <div className={styles.seatInfo}>
        <div className={styles.seatOriantationInfo}>
          <div className={styles.seatEmptyInfo}></div>
          <p className={styles.seatStatus}>{t("N/A")}</p>
        </div>
        <div className={styles.seatOriantationInfo}>
          <div className={styles.seatSelectedInfo}></div>
          <p className={styles.seatStatus}>{t("Selected")}</p>
        </div>
        <div className={styles.seatOriantationInfo}>
          <div className={styles.seatOccupiedInfo}></div>
          <p className={styles.seatStatus}>{t("Occupied")}</p>
        </div>
      </div>
      <div className={styles.seatMap}>
        <div className={styles.screen}>
          <img
            className={styles.screenImg}
            src={`assets/images/${movie.movie_image}`}
            alt={movie.title}
          />
        </div>
        <div className={styles.seatsContainer}>
          <div className={styles.leftSeats}>
            {leftSeats.map((row, i) => (
              <div key={i} className={styles.rowSeat}>
                {row.map((seat, j) => (
                  <div
                    key={j}
                    className={`${styles.seat} ${
                      seat.occupied ? styles.occupied : ""
                    } ${seat.selected ? styles.selected : ""}`}
                    onClick={() => seatClicked(seat, "left")}
                  ></div>
                ))}
              </div>
            ))}
          </div>
          <div className={styles.middleSeats}>
            {middleSeats.map((row, i) => (
              <div key={i} className={styles.rowSeat}>
                {row.map((seat, j) => (
                  <div
                    key={j}
                    className={`${styles.seat} ${
                      seat.occupied ? styles.occupied : ""
                    } ${seat.selected ? styles.selected : ""}`}
                    onClick={() => seatClicked(seat, "middle")}
                  ></div>
                ))}
              </div>
            ))}
          </div>
          <div className={styles.rightSeats}>
            {rightSeats.map((row, i) => (
              <div key={i} className={styles.rowSeat}>
                {row.map((seat, j) => (
                  <div
                    key={j}
                    className={`${styles.seat} ${
                      seat.occupied ? styles.occupied : ""
                    } ${seat.selected ? styles.selected : ""}`}
                    onClick={() => seatClicked(seat, "right")}
                  ></div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.seatDetails}>
        <div className={styles.selectedSeats}>
          <span id="selected-count">{selectedSeats.length}</span>{" "}
          {t("Seats Selected")}
        </div>
        <div className={styles.totalPrice}>
          {t("Total Price") + ": "}
          <span id="total-price">
            {calculateTicketPrice().toLocaleString("en-US", {
              style: "currency",
              currency: "EGP",
            })}
          </span>
        </div>
        <button className={styles.confirmBtn} onClick={confirmReservation}>
          {t("Confirm")}
        </button>
      </div>
    </div>
  );
}
