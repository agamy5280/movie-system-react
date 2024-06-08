import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../redux/store/Slices/moviesSlice";
import  timesStyle from "../styles/ShowTimesPage.module.css";
import { useNavigate } from "react-router-dom";
import { getMovieByID } from "../redux/store/Slices/moviesSlice";
import Spinner from "./Spinner";
import { useSearchParams } from "react-router-dom";

export default function ShowTimes() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const movie = useSelector((state) => state.movies.movie);
  const status = useSelector((state) => state.movies.status);
  const error = useSelector((state) => state.movies.error);
  const id = searchParams.get("id");
  let showTimes = null;


  const sendParams = (showTime, movieLocation) => {
    const params = new URLSearchParams({
      time: showTime,
      id: movie.id,
      location: movieLocation
    });
    navigate(`/seats?${params.toString()}`);
  };

  useEffect(() => {
    if (id) {
      dispatch(getMovieByID(id));
    }
  }, [dispatch, id]);


  if (status === "loading" || !movie) {
    return <Spinner />;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }


  
  if (movie) {
    showTimes = movie['show_times'];
  }
  
  console.log(showTimes);
  
  return (
    <>
      {showTimes && <div className={timesStyle["now-showing"]}>
       <h2 className={timesStyle["movie-name"]}>{ movie['title'] }</h2>
        <p className={`${timesStyle["dashed"]} pb-2`}></p>
        <div className={`${timesStyle["location-bar"]} row`}></div>

        {showTimes.map((showTime, index) => (
          <div className={`${timesStyle["timerow"]} row`} key={index}>
            <h3 className={`${timesStyle["weekday"]}`}>{showTime.loaction}</h3>
            <div className={`${timesStyle["timecol"]} col`}>
              {showTime.times.map((time, index) => (
                <a key={index} className={`${timesStyle["btn"]} btn`} role="button" onClick={()=>sendParams(time, showTime.loaction)}>
                  {time}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>}
    </>
  );
}
