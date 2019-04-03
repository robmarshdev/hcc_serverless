import { APIGatewayProxyEvent, APIGatewayProxyCallback, APIGatewayProxyResult, Context } from "aws-lambda";
import * as Mustache from "mustache";
import { get } from "superagent";

export const handler = async (event: APIGatewayProxyEvent, context: Context, callback: APIGatewayProxyCallback): Promise<APIGatewayProxyResult> => {
  const url = `https://${event.headers.Host}/${event.requestContext.stage}/api/movies`;

  const httpReq = await get(url);

  console.log(httpReq.body);

  // put movies here
  const view = {
    movies: httpReq.body.Items,
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
