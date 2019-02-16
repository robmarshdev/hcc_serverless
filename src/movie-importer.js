const request = require("superagent");
const formatUrlDate = require("../lib/format-url-date").formatUrlDate;

const importMovies = async () => {
  const req = await request.get(`https://www.findanyfilm.com/api/screenings/by_venue_id/venue_id/10719/date-from/${formatUrlDate(new Date())}`);
  const body = req.body;
  console.log("Result: ", JSON.stringify(body["10719"].films));
};

exports.handler = async (event, context) => importMovies();
