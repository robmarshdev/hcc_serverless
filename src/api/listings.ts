import { APIGatewayProxyEvent, Context, APIGatewayProxyCallback, APIGatewayProxyResult } from "aws-lambda";
import * as Listings from "../dynamo/listing";
import { getQueryStringParam } from "../../lib/get-query-string-param";

export const list = async (event: APIGatewayProxyEvent, context: Context, callback: APIGatewayProxyCallback): Promise<APIGatewayProxyResult> => {
  const date = getQueryStringParam(event, "date") || new Date().toISOString().split('T')[0];

  const listings = await Listings.list(date);
  console.log(listings);

  const response = {
    statusCode: 200,
    body: JSON.stringify(listings, null, 2),
  }
  return response;
};
