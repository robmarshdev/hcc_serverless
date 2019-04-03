import { APIGatewayProxyEvent, Context, APIGatewayProxyCallback, APIGatewayProxyResult } from "aws-lambda";
import * as Movies from "../dynamo/movie";

export const list = async (event: APIGatewayProxyEvent, context: Context, callback: APIGatewayProxyCallback): Promise<APIGatewayProxyResult> => {
  const movies = await Movies.list();
  console.log(movies);

  const response = {
    statusCode: 200,
    body: JSON.stringify(movies, null, 2),
  }
  return response;
};
