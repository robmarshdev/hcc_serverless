import { get } from "superagent";
import { formatUrlDate } from "../lib/format-url-date";
import CINEMAS from "../utils/consts/cinemas";

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
  film_id: number
}

const importMovies = async () => {
  for (const cinemaId of CINEMAS) {
    const req = await get(`https://www.findanyfilm.com/api/screenings/by_venue_id/venue_id/${cinemaId}/date-from/${formatUrlDate(new Date())}`);
    const films = req.body[cinemaId].films;

    Object.entries(films)
      .map(([id, data]) => data)
      .forEach((filmData: FafResponse) => parseListings(cinemaId, filmData));
  }
};

const parseListings = (cinemaId: number, film: FafResponse) => {
  console.log(`Cinema ${cinemaId} - Film showings: `, film.showings);
  console.log(`Cinema ${cinemaId} - Film data: `, film.film_data);
}

export const handler = (event, context) => importMovies();
