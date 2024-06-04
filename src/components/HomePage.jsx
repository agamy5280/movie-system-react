import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getMovies } from '../redux/store/Slices/moviesSlice';
import homeStyle from "../styles/HomePage.module.css";
const HomePage = () => {
    const {t,i18n} = useTranslation();
    const dispatch = useDispatch();
    const movies = useSelector((state)=>state.movies.movies)
    useEffect(()=>{
        dispatch(getMovies())
    },[])
    return (
        <div className="home p-2">
            <div className={homeStyle["now-showing"]}>
                <h1 className={homeStyle["what"]}>What&#39;s On</h1>
                <p className={`${homeStyle["dashed"]} dashed pb-2`}></p>
                <div className="container p-0">
                <div className="row">
                    {
                        movies?.map((movie)=>{
                            return (
                                <div className="col-sm-3" key={movie.id}>
                                    <div className={`${homeStyle["card"]} card border-0 pb-2`}>
                                        <img
                                        className="card-img-top"
                                        src={`assets/images/${movie.movie_image}`}
                                        alt="movie image"
                                        />
                                        <div className={`card-body ps-1`}>
                                        <h5 className={`${homeStyle["card-title"]} card-title`}>{movie.title.toLowerCase()}</h5>
                                        <p className="">
                                            <img
                                            className={homeStyle["classification"]}
                                            src={`assets/images/${ movie.classification }.png`}
                                            />
                                        </p>
                                        <p className="card-text">
                                            <span className="fw-bold">Language:</span> { movie.Language }
                                        </p>
                                        <a
                                            className={`${homeStyle["btn"]} btn btn-secondary btn-lg`}
                                            >Show Info</a
                                        >
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                </div>
                {
                    !movies&&
                    <div className="text-center m-5">
                        <div
                            className="spinner-border text-primary mt-5"
                            role="status"
                            style={{width:"100px",height:"100px"}}
                        >
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default HomePage;
