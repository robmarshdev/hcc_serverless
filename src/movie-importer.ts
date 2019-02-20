import { get } from "superagent";
import { formatUrlDate } from "../lib/format-url-date";

const importMovies = async () => {;
  const req = await get(`https://www.findanyfilm.com/api/screenings/by_venue_id/venue_id/10719/date-from/${formatUrlDate(new Date())}`);
  const body = req.body;
  console.log("Result: ", JSON.stringify(body["10719"].films));
};

export const handler = (event, context) => importMovies();
