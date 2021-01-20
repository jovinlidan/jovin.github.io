import React from "react";
import Joi from "joi-browser";
import Form from "./../Form";
import { getGenresWithout } from "./../services/fakeGenreService";
import { saveMovie } from "./../services/fakeMovieService";
import { Redirect } from "react-router-dom";
class MovieForm extends Form {
  state = {
    data: {
      title: "",
      numberInStock: "",
      dailyRentalRate: "",
      ["genre.name"]: "",
    },
    errors: {},
  };
  schema = {
    title: Joi.string().required().label("Title"),
    numberInStock: Joi.number().required().label("Number In Stock"),
    ["genre.name"]: Joi.string()
      .valid(getGenresWithout("All Genres").map((genre) => genre.name))
      .required()
      .label("Genre"),
    dailyRentalRate: Joi.number()
      .min(1)
      .max(10)
      .required()
      .label("Daily Rental Rate"),
  };
  componentDidMount() {
    const { location, history, match } = this.props;
    const { state: movie } = location;
    movie &&
      this.setState({
        data: {
          title: movie.title,
          numberInStock: movie.numberInStock,
          dailyRentalRate: movie.dailyRentalRate,
          ["genre.name"]: movie.genre.name,
        },
      });
  }
  doSubmit = () => {
    // Call the server
    const { location } = this.props;
    const { state: movie } = location;
    saveMovie(this.state.data, movie && movie._id);
    this.props.history.push("/movies");
    //console.log("Submitted");
  };
  handleNotFound = () => {
    const { location, history, match } = this.props;
    const { state: movie } = location;
    if (match.url !== "/movies/new" && movie === undefined) {
      return <Redirect from="/movies/:id" to="/not-found" />;
    }
  };

  render() {
    return (
      <>
        {this.handleNotFound()}
        <h1>Movie Form </h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect(
            "genre.name",
            "Genre",
            getGenresWithout("All Genres")
          )}
          {this.renderInput("numberInStock", "NumberInStock")}
          {this.renderInput("dailyRentalRate", "DailyRentalRate")}
          {this.renderButton("Save")}
        </form>
      </>
    );
  }
}

export default MovieForm;
