import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../redux/store/Slices/moviesSlice";
import  timesStyle from "../styles/ShowTimesPage.module.css";
export default function ShowTimes() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const [movies, setMovies] = useState([]);
  
  useEffect(() => {
    fetch("http://localhost:4000/movies")
      .then(res => res.json())
      .then(data => setMovies(data));
  }, []);
  
  const id = 0;
  let showTimes = null;
  
  if (movies.length > 0) {
    showTimes = movies[id]['show_times'];
  }
  
  console.log(showTimes);
  
  return (
    <>
      {showTimes && <div className={timesStyle["now-showing"]}>
       <h2 className={timesStyle["movie-name"]}>{ movies[id]['title'] }</h2>
        <p className={`${timesStyle["dashed"]} pb-2`}></p>
        <div className={`${timesStyle["location-bar"]} row`}></div>

        {showTimes.map((showTime, index) => (
          <div className={`${timesStyle["timerow"]} row`} key={index}>
            <h3 className={`${timesStyle["weekday"]}`}>{showTime.loaction}</h3>
            <div className={`${timesStyle["timecol"]} col`}>
              {showTime.times.map((time, index) => (
                <a key={index} className={`${timesStyle["btn"]} btn`} role="button">
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
