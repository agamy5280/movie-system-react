import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../redux/store/Slices/moviesSlice";
import homeStyle from "../styles/HomePage.module.css";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Spinner from "./Spinner";
import {
  addFavorite,
  removeFavorite,
} from "../redux/store/Slices/favoritesSlice";
import { hover } from "@testing-library/user-event/dist/hover";
const HomePage = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);
  const status = useSelector((state) => state.movies.status);
  const favorites = useSelector((state) => state.favorites.movies);
  const isFavorite = (movieId) => {
    console.log(favorites);
    return favorites.some((favorite) => favorite.id === movieId);
  };
  useEffect(() => {
    dispatch(getMovies());
  }, []);
  const handleAddToFavorites = (movie) => {
    dispatch(addFavorite(movie));
  };
  const handleRemoveFromFavorites = (movie) => {
    dispatch(removeFavorite(movie));
  };
  if (status === "loading" || !movies) {
    return <Spinner />;
  }
  return (
    <div className="home p-2" dir={`${i18n.language === "en" ? "ltr" : "rtl"}`}>
      <div className={homeStyle["now-showing"]}>
        <h1 className={homeStyle["what"]}>{t("What's On")}</h1>
        <p className={`${homeStyle["dashed"]} dashed pb-2`}></p>
        <div className="container p-0">
          <div className="row">
            {movies?.map((movie) => {
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
                      <Button
                        size="small"
                        onClick={() => {
                          if (isFavorite(movie.id)) {
                            handleRemoveFromFavorites(movie);
                          } else {
                            handleAddToFavorites(movie);
                          }
                        }}
                        sx={{
                          color: isFavorite(movie.id)
                            ? "red !important"
                            : "black !important",
                        }}
                      >
                        <FavoriteIcon />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {!movies && (
          <div className="text-center m-5">
            <div
              className="spinner-border text-primary mt-5"
              role="status"
              style={{ width: "100px", height: "100px" }}
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
