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

export const list = async (date: string): Promise<any[]> => {
  const firstId = `Date+${date}`;

  const dbResult = await dynamo.queryByFirstId(firstId);

  if (dbResult && dbResult.Items) {
    return dbResult.Items.map((item) => ({
      movieId: item.SecondId.split('+')[1].split('_')[0],
      cinemaId: item.SecondId.split('+')[1].split('_')[1],
      time: item.SecondId.split('+')[1].split('_')[2],
      ticketingLink: item.TicketingLink,
    }));
  } else {
    return [];
  }
}
