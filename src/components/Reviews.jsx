import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { getUserByID } from '../redux/store/Slices/usersSlice';
import styles from '../styles/Reviews.module.css'; // Import the CSS module
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';

const Reviews = ({ movie }) => {
  const dispatch = useDispatch();
  const reviews = movie.reviews;
  const [newReview, setNewReview] = useState({
    rating: '',
    comment: '',
    username: '',
  });

 

  const LocalUser = JSON.parse(localStorage.getItem('userData'));
  const userId = LocalUser.id;
  const user = useSelector((state) => state.users.user);

  const addReview = async (id, updatedMovie) => {
    try {
      const response = await axios.patch(`http://localhost:8000/movies/${id}`, updatedMovie);
      console.log(response.data);
    } catch (error) {
      console.error('Error updating movie:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Set username in the new review
    const reviewToSubmit = {
      ...newReview,
      username: user.firstName,
    };

    const updatedMovie = {
      ...movie,
      reviews: [...movie.reviews, reviewToSubmit],
    };

    addReview(movie.id, updatedMovie);

    // Clear the form
    setNewReview({ rating: '', comment: '', username: '' });
  };

  useEffect(() => {
    if (userId) {
      dispatch(getUserByID(userId));
    }
  }, [dispatch, userId]);

  return (
    <div >
      {/* <h3 className={styles['title-header']}>Reviews</h3> */}
      {/* className={`${styles.reviewsContainer}`} */}
      <ul > 
        {reviews.map((review, index) => (
          <li key={index} className={`${styles.reviewItem} `}>
            <p className={styles.username}>{review.username}</p>
            { Array.from({ length: review.rating }, (_, index) => index).map((el, idx)=><StarBorderOutlinedIcon className={styles['rating']}/>)}
            

            <p className={styles.comment}>{review.comment}</p>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit} className={styles.reviewForm}>
        <label>
          Rating: <br />
          <input
            type="number"
            value={newReview.rating}
            onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
            min="1"
            max="5"
            required
          />
        </label>
        <label>
          Comment:
          <textarea
            className={styles.textarea}
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            required
          />
        </label>
        <button type="submit" className={styles.submitButton}>Add Review</button>
      </form>
    </div>
  );
};

export default Reviews;
