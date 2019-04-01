type FafResponse = {
  showings: FafShowing[],
  film_data: FafFilmData,
};

type FafShowing = {
  enabled: boolean,
  showtime: Date,
  display_showtime: string,
  ticketing_link: string,
};

type FafFilmData = {
  film_id: number,
  film_title: string,
  release_year: number,
  certificate: "TBC" | "U" | "PG" | "12A" | "15" | "18"
};

type OmdbData = {
  Runtime: string,
  Genre: string[],
  Director: string,
  Actors: string[],
  Plot: string,
  Poster: string,
  Metascore: number,
  ImdbRating: number,
};
