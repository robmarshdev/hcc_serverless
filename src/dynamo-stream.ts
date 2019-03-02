import { Context, DynamoDBStreamEvent } from "aws-lambda"

const handleDynamoStream = async (event: DynamoDBStreamEvent, context: Context):
  Promise<void> => {

  console.log(`received stream with ${event.Records.length} records`);

  event.Records.forEach((record) => { console.log(`stream record: `, JSON.stringify(record.dynamodb)) });
}

export const handler = (event, context) => handleDynamoStream(event, context);
