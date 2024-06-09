import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMovies } from "../redux/store/Slices/moviesSlice";
import DOMPurify from 'dompurify';
import soonStyle from "../styles/ComingSoon.module.css";
import Spinner from './Spinner';
import { useTranslation } from 'react-i18next';

export const getSafeUrl = (url) => {
  return DOMPurify.sanitize(url, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
};


const ComingSoon = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);
  const status = useSelector((state) => state.movies.status);
  const error = useSelector((state) => state.movies.error);
  const {t,i18n} = useTranslation();
  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);


  
  if (status === "loading" || !movies) {
    return <Spinner />;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  
  return (
    <div className={soonStyle["now-showing"]}>
      <div className="row" dir={i18n.language==="en"? "ltr" : "rtl"}>
        <h1 className={soonStyle["what"]}>{t("Coming Soon")}</h1>
        <p className={`${soonStyle["dashed"]} pb-2`} ></p>
      </div>

      {movies && (
        <>
          <div id="carouselExample" className={`${soonStyle["carousel"]} carousel slide`}>
            <div className={`${soonStyle["carousel-inner"]} carousel-inner`}>
              {movies.map((movie, index) => (
                <div
                  className={`${soonStyle["carousel-item"]} carousel-item ${index === 0 ? 'active' : ''}`}
                  key={movie.id}
                >
                  <iframe
                    src={getSafeUrl(movie.trailer_youtube_link)}
                    title={movie.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>
              ))}
            </div>

            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>

          {movies.map((movie) => (
            <React.Fragment key={movie.id}>
              <div className={soonStyle["movie-sec"]}>
                <div className={soonStyle["sec-img"]}>
                  <img src={`assets/images/${movie.movie_image}`} alt="" />
                </div>
                <div className={soonStyle["sec-details"]} dir={i18n.language==="en"? "ltr" : "rtl"}>
                  <div className={soonStyle["title"]}>
                    <h3>{movie.title}</h3>
                  </div>
                  <div className={soonStyle["info"]}>
                    <p>
                      {t("Release Date")}: <span>{t(movie.Release_Date)}</span>
                    </p>
                    <p>
                      {t("Starring")}: <span>{movie.Starring}</span>
                    </p>
                    <p>
                      {t("Language")}: <span>{t(movie.Language)}</span>
                    </p>
                  </div>
                  <div className="">
                    <p className={soonStyle["disc"]}>{`${t(movie.description).slice(0, 100)} . . . .`}</p>
                  </div>
                </div>
              </div>
              <p className={`${soonStyle["dashed"]} pb-2`}></p>
            </React.Fragment>
          ))}
        </>
      )}
    </div>
  );
};

export default ComingSoon;
