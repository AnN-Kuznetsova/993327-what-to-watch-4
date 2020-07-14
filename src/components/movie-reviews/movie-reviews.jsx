import React from "react";

import {MoviePropType} from "../../prop-types";
import {
  getExtremeIndexesForSlice,
  getFormatedScore,
  getFormatedDate,
} from "../../utils/utils";


const COLUMNS_COUNT = 2;


export const MovieReviews = (props) => {
  const {movie} = props;
  const {reviews} = movie;

  const columnsCount = COLUMNS_COUNT;
  const columns = Array(columnsCount).fill(``);

  return (
    <div className="movie-card__reviews movie-card__row">
      {columns.map((column, indexColumn) => {
        const {beginingIndex, endingIndex} = getExtremeIndexesForSlice(reviews.length, columnsCount, indexColumn);

        return (
          <div key={indexColumn} className="movie-card__reviews-col">
            {reviews.slice(beginingIndex, endingIndex)
              .map((review, index) => (
                <div key={review.author + index} className="review">
                  <blockquote className="review__quote">
                    <p className="review__text">{review.text}</p>

                    <footer className="review__details">
                      <cite className="review__author">{review.author}</cite>
                      <time className="review__date" dateTime={getFormatedDate(review.date, true)}>
                        {getFormatedDate(review.date)}
                      </time>
                    </footer>
                  </blockquote>

                  <div className="review__rating">{getFormatedScore(review.rating)}</div>
                </div>
              ))}
          </div>
        );
      })}
    </div>
  );
};


MovieReviews.propTypes = {
  movie: MoviePropType.isRequired,
};
