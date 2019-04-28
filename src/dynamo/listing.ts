import * as dynamo from "./common";

export const create = async (listing: any): Promise<void> => {
  const date = listing.showtime.split(' ')[0];
  const time = listing.display_showtime;

  const firstId = `Date+${date}`;
  const secondId = `Listing+${listing.movieId}_${listing.cinemaId}_${time}`;

  const item = {
    FirstId: firstId,
    SecondId: secondId,
    Showtime: listing.showtime,
    TicketingLink: listing.ticketing_link,
  };

  await dynamo.put(item);
};
