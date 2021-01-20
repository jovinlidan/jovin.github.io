import React, { useState, useEffect } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import _ from "lodash";
import "./Movies.css";
import MovieTable from "./MovieTable";
import Pagination from "./Pagination";
import { paginate } from "./../utils/paginate";
import { deleteMovie } from "./../services/fakeMovieService";

const Movies = () => {
  const [allMovies, setAllMovies] = useState(getMovies());
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [movies, setMovies] = useState(
    paginate(allMovies, currentPage, pageSize)
  );
  const [allGenres, setAllGenres] = useState(getGenres());
  const [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" });
  const [currentGenre, setCurrentGenre] = useState("All Genres");

  useEffect(() => {
    setMovies(paginate(allMovies, currentPage, pageSize));
  }, [allMovies]);

  const handleDelete = (movieDeleted) => {
    deleteMovie(movieDeleted._id);
    const sorted = _.orderBy(
      getMovies(),
      [sortColumn.path],
      [sortColumn.order]
    );
    setAllMovies(sorted);
    setMovies(paginate(sorted, currentPage, pageSize));
  };

  const handleLike = (movie) => {
    const moviesCopy = [...movies];
    const idx = movies.indexOf(movie);
    moviesCopy[idx].liked = !moviesCopy[idx].liked;
    setMovies(moviesCopy);
  };

  const handleFilterGenre = (genre) => {
    const moviesCopy = getMovies();
    const filteredMovies =
      genre.name === "All Genres"
        ? getMovies()
        : moviesCopy.filter(
            (movie) => JSON.stringify(movie.genre) === JSON.stringify(genre)
          );
    const sorted = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );
    setCurrentGenre(genre.name);
    setMovies(paginate(sorted, 1, pageSize));
    setAllMovies(sorted);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setMovies(paginate(allMovies, page, pageSize));
  };

  const handleSort = (sorted) => {
    setMovies(paginate(sorted, currentPage, pageSize));
    setAllMovies(sorted);
  };

  return (
    <>
      <MovieTable
        movies={movies}
        allGenres={allGenres}
        onFilterGenre={handleFilterGenre}
        onLike={handleLike}
        onDelete={handleDelete}
        onSort={handleSort}
        sortColumn={sortColumn}
        setSortColumn={setSortColumn}
        allMovies={allMovies}
        currentGenre={currentGenre}
        setAllMovies={setAllMovies}
      />
      <Pagination
        itemsCount={allMovies.length}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        currentPage={currentPage}
      />
    </>
  );
};

export default Movies;
