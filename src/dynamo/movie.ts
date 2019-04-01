import * as AWS from "aws-sdk";

const dynamo = new AWS.DynamoDB.DocumentClient({
  apiVersion: "2012-08-10",
  maxRetries: 3,
});

export const create = async (filmData: FafFilmData): Promise<AWS.DynamoDB.DocumentClient.PutItemOutput> => {
  const movieId = `Movie+${filmData.film_id}`;

  const item = {
    FirstId: movieId,
    SecondId: movieId,
    Title: filmData.film_title,
    ReleaseYear: filmData.release_year,
    Certificate: filmData.certificate,
  };

  const params: AWS.DynamoDB.DocumentClient.PutItemInput = {
    TableName: process.env.tableName,
    Item: item,
  };

  try {
    return await dynamo.put(params).promise();
  } catch (error) {
    console.log(`Error|Unable to add movie to Dynamo|${item}`);
    throw error;
  }
};

export const addMetadata = async (id: string, metadata: OmdbData): Promise<AWS.DynamoDB.DocumentClient.UpdateItemOutput> => {
  const params: AWS.DynamoDB.DocumentClient.UpdateItemInput = {
    TableName: process.env.tableName,
    Key: {
      "FirstId": id,
      "SecondId": id,
    },
    UpdateExpression: `
      set
        Runtime = :runtime,
        Genre = :genre,
        Director = :director,
        Actors = :actors,
        Plot = :plot,
        Poster = :poster,
        Metascore = :metascore,
        ImdbRating = :imdbRating
    `,
    ExpressionAttributeValues: {
      ":runtime": metadata.Runtime,
      ":genre": metadata.Genre,
      ":director": metadata.Director,
      ":actors": metadata.Actors,
      ":plot": metadata.Plot,
      ":poster": metadata.Poster,
      ":metascore": metadata.Metascore,
      ":imdbRating": metadata.ImdbRating,
    },
  };

  try {
    return await dynamo.update(params).promise();
  } catch (error) {
    console.log(`Error|Unable to add movie metadata to Dynamo|${id}`);
    throw error;
  }
};
