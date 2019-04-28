import { APIGatewayProxyEvent } from "aws-lambda";

export const getQueryStringParam = (event: APIGatewayProxyEvent, param: string)
: string | undefined => {
  if (event.queryStringParameters && event.queryStringParameters[param]) {
    return event.queryStringParameters[param];
  } else {
    return undefined;
  }
}
