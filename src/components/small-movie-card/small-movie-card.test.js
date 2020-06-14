import Adapter from "enzyme-adapter-react-16";
import Enzyme, {shallow} from "enzyme";
import React from "react";
import renderer from "react-test-renderer";
import {SmallMovieCard} from "./small-movie-card.jsx";


Enzyme.configure({
  adapter: new Adapter(),
});


const props = {
  movieTitle: `Aviator`,
  cardTitleClickHandler: () => {},
  cardImageClickHandler: () => {},
};


describe(`Render SmallMovieCard`, () => {
  it(`Render correctly SmallMovieCard component`, () => {
    const catalogMoviesCardComponent = renderer.create(
        <SmallMovieCard {...props} />
    ).toJSON();

    expect(catalogMoviesCardComponent).toMatchSnapshot();
  });


  it(`Render correctly movie title`, () => {
    const catalogMoviesCardElement = shallow(
        <CatalogMoviesCard {...props} />
    );

    expect(catalogMoviesCardElement.find(`h3.small-movie-card__title .small-movie-card__link`).text())
      .toEqual(props.movieTitle);

    expect(catalogMoviesCardElement.find(`div.small-movie-card__image img`).prop(`alt`))
      .toEqual(props.movieTitle);
  });
});
