import { Context, DynamoDBStreamEvent } from "aws-lambda"
import * as Dynamo from "aws-sdk/clients/dynamodb";
import { addMetadata } from "./dynamo/movie";
import { get } from "superagent";
import { formatUrlMovieTitle } from "../lib/format-url-movie-title";
import getSSMParam from "../lib/get-ssm-param";

const converter = Dynamo.Converter.unmarshall;

const handleDynamoStream = async (event: DynamoDBStreamEvent, context: Context):
  Promise<void> => {

  console.log(`received stream with ${event.Records.length} records`);

  for (const record of event.Records) {
    if (record.eventName === "INSERT") {
      const body = converter(record.dynamodb.NewImage);

      if(!body.Title) return;

      console.log("stream record: ", body);

      let req;
      const omdbApiKey = await getSSMParam("omdb_api_key");

      if (omdbApiKey) {
        // poster url is returned if you have an api key
        req = await get(`https://www.omdbapi.com?t=${formatUrlMovieTitle(body.Title)}&y=${body.ReleaseYear}&plot=full&apikey=${omdbApiKey}`);

        // quick hack - try again without specifying year if not found
        if (req.body.Response === "False") {
          req = await get(`https://www.omdbapi.com?t=${formatUrlMovieTitle(body.Title)}&plot=full&apikey=${omdbApiKey}`);
        }

      } else {
        req = await get(`https://www.omdbapi.com?t=${formatUrlMovieTitle(body.Title)}&y=${body.ReleaseYear}&plot=full`);
      }

      if (req.body.Response === "True") {
        addMetadata(record.dynamodb.NewImage.FirstId.S, {
          Runtime: req.body.Runtime,
          Actors: req.body.Actors,
          Genre: req.body.Genre,
          Director: req.body.Director,
          Plot: req.body.Plot,
          Poster: req.body.Poster,
          Metascore: req.body.Metascore,
          ImdbRating: req.body.imdbRating,
        });
      } else {
        // TODO - put onto queue and notify
      }

      console.log("omdb body: ", req.body);
    }
  }
}



export const handler = (event, context) => handleDynamoStream(event, context);
