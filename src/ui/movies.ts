import { APIGatewayProxyEvent, APIGatewayProxyCallback, APIGatewayProxyResult, Context } from "aws-lambda";
import * as Mustache from "mustache";

export const handler = async (event: APIGatewayProxyEvent, context: Context, callback: APIGatewayProxyCallback): Promise<APIGatewayProxyResult> => {
  // put movies here
  const view = {
    movies: {
      Title: "Movie 1",
      Poster: "https://m.media-amazon.com/images/M/MV5BNGFhOWJmMDktOWRkNy00OGIxLTk2YjMtNTZkNGE0YzViZTNlXkEyXkFqcGdeQXVyMzg2MzE2OTE@._V1_SX300.jpg",
    },
  }

  let html = Mustache.render(`
    {{#movies}}
      <ul>
        <img src="{{Poster}}"/>
        <li>{{Title}}</li>
      </ul>
    {{/movies}}
  `, view);

  const response = {
    statusCode: 200,
    body: html,
    headers: {
      'content-type': 'text/html; charset=UTF-8'
    }
  };

  return response;
}
