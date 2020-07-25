import React from "react";
import configureStore from "redux-mock-store";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";

import {MainPage} from "./main-page.jsx";
import {NameSpace} from "../../reducers/name-space";

import {mockPromoMovie, mockMovies} from "../../__test-data__/test-mocks";


global.window = Object.create(window);
Object.defineProperty(window, `location`, {
  value: {
    pathname: `/`
  }
});

const mockStore = configureStore([]);

const store = mockStore({
  [NameSpace.DATA]: {
    movies: mockMovies,
  },
  [NameSpace.APPLICATION]: {
    genre: `All genres`,
    visibleMoviesCount: 8,
    prevPage: ``,
    playerStartTime: 0,
  },
});

const props = {
  promoMovie: mockPromoMovie,
  openMovieDetailsPage: () => {},
};

const nodeMock = {
  createNodeMock: () => {
    return {};
  }
};


describe(`Render MainPage`, () => {
  it(`Should match with snapshot`, () => {
    const mainPageSnapshot = renderer.create(
        <Provider store={store}>
          <MainPage {...props} />
        </Provider>, nodeMock
    ).toJSON();

    expect(mainPageSnapshot).toMatchSnapshot();
  });
});
