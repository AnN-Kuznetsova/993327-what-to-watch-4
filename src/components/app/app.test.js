import React from "react";
import configureStore from "redux-mock-store";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";

import {AppComponent} from "./app.jsx";

import {PageType} from "../../const.js";

import {mockPromoMovie, mockMovies} from "../../__test-data__/test-mocks.js";


const nodeMock = {
  createNodeMock: () => {
    return {};
  }
};

const mockStore = configureStore([]);

const store = mockStore({
  movies: mockMovies,
  genre: `All genres`,
  movieList: mockMovies,
});

const props = {
  activeMovie: mockPromoMovie,
  onOpenMovieDetails: () => {},
};


describe(`Render App`, () => {
  it(`Should match with snapshot when page is "MAIN"`, () => {
    props.activePage = PageType.MAIN;

    const appSnapshot = renderer.create(
        <Provider store={store}>
          <AppComponent {...props} />
        </Provider>, nodeMock
    ).toJSON();

    expect(appSnapshot).toMatchSnapshot();
  });
});
