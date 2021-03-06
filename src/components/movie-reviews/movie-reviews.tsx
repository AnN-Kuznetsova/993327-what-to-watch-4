
import * as React from "react";
import {connect} from "react-redux";

import {ReviewType} from "../../types";
import {getActiveMovieReviews, getDataError} from "../../reducers/data/selectors";
import {
  getFormatedScore,
  getFormatedDate,
} from "../../utils/utils";


interface Props {
  reviews: ReviewType[];
  dataError?: object;
}


const COLUMNS_COUNT = 2;


const MovieReviewsComponent: React.FunctionComponent<Props> = (props: Props) => {
  const {
    reviews,
    dataError,
  } = props;

  const columns = [];

  if (dataError) {
    return (
      <div className="movie-card__reviews movie-card__row">
        <h2 key={dataError.toString()} style={{color: `#252525`}}>Reviews could not be loaded. Sorry</h2>
      </div>
    );
  }

  for (let columnIndex = 1; columnIndex <= COLUMNS_COUNT; columnIndex++) {
    const rows = [];
    for (let rowIndex = columnIndex - 1; rowIndex < reviews.length; rowIndex += COLUMNS_COUNT) {
      const review = reviews[rowIndex];
      rows.push(
          <div key={review.author + rowIndex} className="review">
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
      );
    }
    columns.push(<div key={columnIndex} className="movie-card__reviews-col">{rows}</div>);
  }

  return (
    <div className="movie-card__reviews movie-card__row">
      {columns}
    </div>
  );
};


const mapStateToProps = (state) => ({
  reviews: getActiveMovieReviews(state),
  dataError: getDataError(state),
});


const MovieReviews = connect(mapStateToProps)(MovieReviewsComponent);


export {
  MovieReviewsComponent,
  MovieReviews,
};
