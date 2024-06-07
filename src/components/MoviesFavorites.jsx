import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { getMovies } from "../redux/store/Slices/moviesSlice";
import { selectFavorites } from "../redux/store/Slices/favoritesSlice";
import Spinner from "./Spinner";
import homeStyle from "../styles/HomePage.module.css";
export default function FavoritesMovies() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);
  const status = useSelector((state) => state.movies.status);

  const favorites = useSelector(selectFavorites);
  if (status === "loading" || !favorites) {
    return <Spinner />;
  }

  return (
    <div className="home p-2" dir={`${i18n.language === "en" ? "ltr" : "rtl"}`}>
      <div className={homeStyle["now-showing"]}>
        <h1 className={homeStyle["what"]}>{t("Movies Favorites")}</h1>
        <p className={`${homeStyle["dashed"]} dashed pb-2`}></p>
        <div className="container p-0">
          <div className="row">
            {favorites?.map((movie) => {
              return (
                <div className="col-sm-3" key={movie.id}>
                  <div className={`${homeStyle["card"]} card border-0 pb-2`}>
                    <img
                      className="card-img-top"
                      src={`assets/images/${movie.movie_image}`}
                      alt="movie image"
                    />
                    <div className={`card-body ps-1`}>
                      <h5 className={`${homeStyle["card-title"]} card-title`}>
                        {movie.title.toLowerCase()}
                      </h5>
                      <p className="">
                        <img
                          className={homeStyle["classification"]}
                          src={`assets/images/${movie.classification}.png`}
                        />
                      </p>
                      <p className="card-text">
                        <span className="fw-bold">{t("Language")}:</span>{" "}
                        {t(movie.Language)}
                      </p>
                      <a
                        className={`${homeStyle["btn"]} btn btn-secondary btn-lg`}
                      >
                        {t("Show Info")}
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
