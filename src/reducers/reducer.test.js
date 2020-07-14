import {reducer, ActionType, ActionCreator} from "./reducer";

import {PageType} from "../const";

import {movies} from "../mocks/movies";
import {promoMovie} from "../mocks/promo-movie";

import {mockMovies} from "../__test-data__/test-mocks";


describe(`Reduser should work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      movies,
      genre: `All genres`,
      movieList: movies,
      activeMovie: promoMovie,
      activePage: PageType.MAIN,
    });
  });


  it(`Reducer should change current genre by a given value`, () => {
    expect(reducer({
      movies: [],
      genre: `All genres`,
      movieList: [],
      activeMovie: {},
      activePage: ``,
    }, {
      type: ActionType.CHANGE_GENRE,
      payload: `Drama`,
    })).toEqual({
      movies: [],
      genre: `Drama`,
      movieList: [],
      activeMovie: {},
      activePage: ``,
    });

    expect(reducer({
      movies: [],
      genre: `Biography`,
      movieList: [],
      activeMovie: {},
      activePage: ``,
    }, {
      type: ActionType.CHANGE_GENRE,
      payload: `All genres`,
    })).toEqual({
      movies: [],
      genre: `All genres`,
      movieList: [],
      activeMovie: {},
      activePage: ``,
    });
  });


  it(`Reducer should get movies according to the current genre`, () => {
    expect(reducer({
      movies: mockMovies,
      genre: `All genres`,
      movieList: [],
      activeMovie: {},
      activePage: ``,
    }, {
      type: ActionType.GET_MOVIES,
    })).toEqual({
      movies: mockMovies,
      genre: `All genres`,
      movieList: mockMovies,
      activeMovie: {},
      activePage: ``,
    });

    expect(reducer({
      movies: mockMovies,
      genre: `Drama`,
      movieList: mockMovies,
      activeMovie: {},
      activePage: ``,
    }, {
      type: ActionType.GET_MOVIES,
    })).toEqual({
      movies: mockMovies,
      genre: `Drama`,
      movieList: [mockMovies[0], mockMovies[1], mockMovies[2]],
      activeMovie: {},
      activePage: ``,
    });

    expect(reducer({
      movies: mockMovies,
      genre: `Adventure`,
      movieList: [mockMovies[0], mockMovies[1]],
      activeMovie: {},
      activePage: ``,
    }, {
      type: ActionType.GET_MOVIES,
    })).toEqual({
      movies: mockMovies,
      genre: `Adventure`,
      movieList: [mockMovies[2]],
      activeMovie: {},
      activePage: ``,
    });
  });


  it(`Reducer should change active movie by a given value`, () => {
    expect(reducer({
      movies: [],
      genre: `All genres`,
      movieList: [],
      activeMovie: {},
      activePage: ``,
    }, {
      type: ActionType.CHANGE_ACTIVE_MOVIE,
      payload: mockMovies[1],
    })).toEqual({
      movies: [],
      genre: `All genres`,
      movieList: [],
      activeMovie: mockMovies[1],
      activePage: ``,
    });
  });


  it(`Reducer should change active page by a given value`, () => {
    expect(reducer({
      movies: [],
      genre: ``,
      movieList: [],
      activeMovie: {},
      activePage: PageType.MAIN,
    }, {
      type: ActionType.CHANGE_ACTIVE_PAGE,
      payload: PageType.MOVIE_DETAILS,
    })).toEqual({
      movies: [],
      genre: ``,
      movieList: [],
      activeMovie: {},
      activePage: PageType.MOVIE_DETAILS,
    });

    expect(reducer({
      movies: [],
      genre: ``,
      movieList: [],
      activeMovie: {},
      activePage: PageType.MOVIE_DETAILS,
    }, {
      type: ActionType.CHANGE_ACTIVE_PAGE,
      payload: PageType.MAIN,
    })).toEqual({
      movies: [],
      genre: ``,
      movieList: [],
      activeMovie: {},
      activePage: PageType.MAIN,
    });
  });
});


describe(`Action creators should work correctly`, () => {
  it(`Action creator for change genre returns correct action`, () => {
    expect(ActionCreator.changeGenre(`All genres`)).toEqual({
      type: ActionType.CHANGE_GENRE,
      payload: `All genres`,
    });
  });


  it(`Action creator for get movies returns correct action`, () => {
    expect(ActionCreator.getMovies(3)).toEqual({
      type: ActionType.GET_MOVIES,
      payload: 3,
    });

    expect(ActionCreator.getMovies()).toEqual({
      type: ActionType.GET_MOVIES,
      payload: null,
    });
  });


  it(`Action creator for change active movie returns correct action`, () => {
    expect(ActionCreator.changeActiveMovie(mockMovies[1])).toEqual({
      type: ActionType.CHANGE_ACTIVE_MOVIE,
      payload: mockMovies[1],
    });
  });


  it(`Action creator for change active page returns correct action`, () => {
    expect(ActionCreator.changeActivePage(PageType.MOVIE_DETAILS)).toEqual({
      type: ActionType.CHANGE_ACTIVE_PAGE,
      payload: PageType.MOVIE_DETAILS,
    });
  });
});
