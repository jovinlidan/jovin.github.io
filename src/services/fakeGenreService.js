export const genres = [
  { _id: "000000000000000000000000", name: "All Genres" },
  { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
  { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
  { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" },
];

export function getGenresWithout(name) {
  return genres.filter((g) => g.name !== name);
}

export function getGenres(name) {
  return genres;
}
