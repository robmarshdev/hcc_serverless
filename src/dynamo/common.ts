import * as AWS from "aws-sdk";

const dynamo = new AWS.DynamoDB.DocumentClient({
  apiVersion: "2012-08-10",
  maxRetries: 3,
});

export const put = async (item: any): Promise<AWS.DynamoDB.DocumentClient.PutItemOutput> => {
  const params: AWS.DynamoDB.DocumentClient.PutItemInput = {
    TableName: process.env.tableName,
    Item: item,
  };

  return await dynamo.put(params).promise();
}
