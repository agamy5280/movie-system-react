import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import styles from "../styles/MoviePage.module.css";
import Spinner from "./Spinner";
import { getMovieByID } from "../redux/store/Slices/moviesSlice";
import { useNavigate } from "react-router-dom";

export default function MoviePage() {
  const { t, i18n } = useTranslation();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const movie = useSelector((state) => state.movies.movie);
  const status = useSelector((state) => state.movies.status);
  const error = useSelector((state) => state.movies.error);

  useEffect(() => {
    if (id) {
      dispatch(getMovieByID(id));
    }
  }, [dispatch, id]);

  const sendParams = () => {
    const params = new URLSearchParams({
      id: movie.id,
    });
    navigate(`/showtimes?${params.toString()}`);
  };

  if (status === "loading" || !movie) {
    return <Spinner />;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div
      className={styles["now-showing"]}
      dir={`${i18n.language === "en" ? "ltr" : "rtl"}`}
    >
      {" "}
      <div className={styles.row}>
        <h2 className={styles["title-header"]}>
          {movie.title}
        </h2>
      </div>
      <div className={styles["movie-container"]}>
        <div>
          <img
            src={`assets/images/${movie.movie_image}`}
            alt={`${movie.title} poster`}
          />
        </div>
        <div>
          <iframe
            width="560"
            height="500"
            src={movie?.trailer_youtube_link}
            title="Movie Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <hr className={styles.dashed} />
      <div className={styles["movie-details"]}>
        <div>
          <p>
            {t("Genre")}: <span>{movie.Genre}</span>
          </p>
          <p>
            Cast: <span>{movie.Starring}</span>
          </p>
          <p>
            {t("Language")}: <span>{movie.Language}</span>
          </p>
          <p>
            {t("Classification")}: <span>{movie.classification}</span>
          </p>
          <p>
            {t("Subtitle(s)")}: <span>{movie.Subtitle}</span>
          </p>
          <p>
            {t("Rating")}: <span>{movie.rating}</span>
          </p>
        </div>
        <div className={styles.desc}>
          <p>{t(movie.description)}</p>
        </div>
      </div>
      <div className={styles["showtimes-button"]}>
        <input
          className={`btn btn-secondary btn-lg ${styles.btn}`}
          onClick={sendParams}
          type="button"
          value={t("View Showtimes")}
        />
      </div>
    </div>
  );
}
