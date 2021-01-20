import React from "react";
import Table from "./Table";
import Like from "./Like";
import AddNew from "./../AddNew";
import { Link } from "react-router-dom";
const MovieTable = (props) => {
  const {
    movies,
    allGenres,
    onFilterGenre,
    onLike,
    onDelete,
    onSort,
    sortColumn,
    setSortColumn,
    allMovies,
    currentGenre,
  } = props;

  const columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => (
        <Link to={{ pathname: `/movies/${movie._id}`, state: movie }}>
          {movie.title}
        </Link>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like onClick={() => onLike(movie)} liked={movie.liked} />
      ),
    },
    {
      key: "delete",
      content: (movie) => (
        <button className="btn btn-danger" onClick={() => onDelete(movie)}>
          Delete
        </button>
      ),
    },
  ];

  return (
    <div className="table-btn-container">
      <div className="btn-container">
        {allGenres.map((filtergenre) => (
          <button
            className={filtergenre.name === currentGenre ? "btn-primary" : ""}
            onClick={() => onFilterGenre(filtergenre)}
            key={filtergenre._id}
          >
            {filtergenre.name}
          </button>
        ))}
      </div>

      <div>
        <AddNew to={"/movies/new"} />
        <h5>
          {movies.length > 0
            ? `Showing ${movies.length} movies in the database.`
            : "There are no movies in the database  "}
        </h5>
        <Table
          columns={columns}
          data={movies}
          onSort={onSort}
          setSortColumn={setSortColumn}
          sortColumn={sortColumn}
          allData={allMovies}
        />
      </div>
    </div>
  );
};

export default MovieTable;
