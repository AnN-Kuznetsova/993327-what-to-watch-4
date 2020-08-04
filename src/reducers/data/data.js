import {extend, disableForm} from "../../utils/utils";

import {ActionCreator as ApplicationActionCreator} from "../application/application";
import {PageType, AppRoute} from "../../const";
import {createReviews} from "../../adapters/review";
import {createMovies, createMovie} from "../../adapters/movie";
import {getActiveMovie} from "../application/selectors";
import {history} from "../../history";


const initialState = {
  movies: null,
  promoMovie: null,
  maxMoviesCount: null,
  activeMovieReviews: [],
  dataError: null,
};


const ActionType = {
  LOAD_MOVIES: `LOAD_MOVIES`,
  LOAD_PROMO_MOVIE: `LOAD_PROMO_MOVIE`,
  LOAD_ACTIVE_MOVIE_REVIEWS: `LOAD_ACTIVE_MOVIE_REVIEWS`,
  SET_MAX_MOVIES_COUNT: `SET_MAX_MOVIES_COUNT`,
  SET_DATA_ERROR: `SET_DATA_ERROR`,
};


const ActionCreator = {
  loadMovies: (movies) => ({
    type: ActionType.LOAD_MOVIES,
    payload: movies,
  }),

  loadPromoMovie: (movie) => ({
    type: ActionType.LOAD_PROMO_MOVIE,
    payload: movie,
  }),

  loadActiveMovieReviews: (comments) => ({
    type: ActionType.LOAD_ACTIVE_MOVIE_REVIEWS,
    payload: comments,
  }),

  setMaxMoviesCount: (count) => ({
    type: ActionType.SET_MAX_MOVIES_COUNT,
    payload: count,
  }),

  setDataError: (error) => ({
    type: ActionType.SET_DATA_ERROR,
    payload: error,
  }),
};


const Operation = {
  loadMovies: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((response) => createMovies(response.data))
      .then((response) => {
        dispatch(ActionCreator.loadMovies(response));
      });
  },

  loadPromoMovie: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`)
      .then((response) => createMovie(response.data))
      .then((response) => {
        dispatch(ActionCreator.loadPromoMovie(response));
        dispatch(ApplicationActionCreator.changeActiveMovie(response));
        dispatch(ApplicationActionCreator.changeActivePage(PageType.MAIN));
      });
  },

  loadActiveMovieReviews: (activeMovieId) => (dispatch, getState, api) => {
    return api.get(`/comments/${activeMovieId}`)
      .then((response) => createReviews(response.data))
      .then((response) => {
        dispatch(ActionCreator.loadActiveMovieReviews(response));
        dispatch(ActionCreator.setDataError(null));
      })
      .catch((error) => {
        dispatch(ActionCreator.setDataError(error));
      });
  },

  sendReview: (reviewData) => (dispatch, getState, api) => {
    disableForm(reviewData.addReviewFormElements);

    return api.post(`/comments/${reviewData.movieId}`, {
      rating: reviewData.rating,
      comment: reviewData.comment,
    })
    .then((response) => createReviews(response.data))
    .then((response) => {
      history.push(AppRoute.FILM.replace(`:id`, getActiveMovie(getState()).id));
      dispatch(ApplicationActionCreator.changeActivePage(PageType.MOVIE_DETAILS));
      disableForm(reviewData.addReviewFormElements, false);
      dispatch(ActionCreator.loadActiveMovieReviews(response));
      dispatch(ActionCreator.setDataError(null));
    })
    .catch((error) => {
      disableForm(reviewData.addReviewFormElements, false);
      dispatch(ActionCreator.setDataError(error));
    });
  },
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_MOVIES:
      return extend(state, {
        movies: action.payload,
      });

    case ActionType.LOAD_PROMO_MOVIE:
      return extend(state, {
        promoMovie: action.payload,
      });

    case ActionType.LOAD_ACTIVE_MOVIE_REVIEWS:
      return extend(state, {
        activeMovieReviews: action.payload,
      });

    case ActionType.SET_MAX_MOVIES_COUNT:
      return extend(state, {
        maxMoviesCount: action.payload,
      });

    case ActionType.SET_DATA_ERROR:
      return extend(state, {
        dataError: action.payload,
      });

    default:
      return state;
  }
};


export {
  ActionCreator,
  ActionType,
  Operation,
  reducer,
};
