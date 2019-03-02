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

