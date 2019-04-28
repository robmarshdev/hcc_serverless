import { get } from "superagent";
import { formatUrlDate } from "../lib/format-url-date";
import CINEMAS from "../utils/consts/cinemas";
import * as movieDb from "./dynamo/movie";
import * as listingDb from "./dynamo/listing";

const importMovies = async () => {
  for (const cinemaId of CINEMAS) {
    const req = await get(`https://www.findanyfilm.com/api/screenings/by_venue_id/venue_id/${cinemaId}/date-from/${formatUrlDate(new Date())}`);
    const films = req.body[cinemaId].films;

    Object.entries(films)
      .map(([id, data]) => data)
      .forEach((filmData: FafResponse) => parseListings(cinemaId, filmData));
  }
};

const parseListings = async (cinemaId: number, film: FafResponse) => {
  // console.log(`Cinema ${cinemaId} - Film showings: `, film.showings);
  // console.log(`Cinema ${cinemaId} - Film data: `, film.film_data);
  await movieDb.create(film.film_data);
  film.showings.forEach(async (listing) => {
    const dynamoListing = {
      ...listing,
      cinemaId,
      movieId: film.film_data.film_id,
    };
    console.log("test: ", dynamoListing);
    await listingDb.create(dynamoListing);
  });
}

export const handler = (event, context) => importMovies();
