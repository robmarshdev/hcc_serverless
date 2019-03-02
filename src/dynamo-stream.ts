import { Context, DynamoDBStreamEvent } from "aws-lambda"
import * as Dynamo from "aws-sdk/clients/dynamodb";
import { get } from "superagent";
import { formatUrlMovieTitle } from "../lib/format-url-movie-title";
import getSSMParam from "../lib/get-ssm-param";

const converter = Dynamo.Converter.unmarshall;

const handleDynamoStream = async (event: DynamoDBStreamEvent, context: Context):
  Promise<void> => {

  console.log(`received stream with ${event.Records.length} records`);

  for (const record of event.Records) {
    if (record.eventName === "INSERT" ||
        record.eventName === "MODIFY") {

      const body = converter(record.dynamodb.NewImage);
      console.log("stream record: ", body);

      let req;
      const omdbApiKey = await getSSMParam("omdb_api_key");

      if (omdbApiKey) {
        // poster url is returned if you have an api key
        req = await get(`https://www.omdbapi.com?t=${formatUrlMovieTitle(body.Title)}&plot=full&apikey=${omdbApiKey}`);
      } else {
        req = await get(`https://www.omdbapi.com?t=${formatUrlMovieTitle(body.Title)}&plot=full`);
      }

      console.log("omdb body: ", req.body);
    }
  }
}



export const handler = (event, context) => handleDynamoStream(event, context);
