import { get } from "superagent";
import { formatUrlDate } from "../lib/format-url-date";
import CINEMAS from "../utils/consts/cinemas";

const importMovies = async () => {
  for (const cinemaId of CINEMAS) {
    const req = await get(`https://www.findanyfilm.com/api/screenings/by_venue_id/venue_id/${cinemaId}/date-from/${formatUrlDate(new Date())}`);
    const body = req.body;
    console.log(`Cinema ${cinemaId} result: `, JSON.stringify(body[cinemaId].films));
  }
};

export const handler = (event, context) => importMovies();
