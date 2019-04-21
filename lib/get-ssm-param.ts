import * as AWS from "aws-sdk";

const getSSMParam = async (param: string): Promise<string | undefined> => {
  const ssm = new AWS.SSM({ region: "eu-west-2" });

  try {
    const result = await ssm.getParameter({
      Name: `hcc_${param}`,
      WithDecryption: true,
    }).promise();

    if (result.Parameter && result.Parameter.Value) {
      return result.Parameter.Value;
    } else {
      return undefined;
    }
  } catch (error) {
    console.log(`Error|Unable to fetch SSM parameter|${JSON.stringify(error)}`);
    return undefined;
  }
};

export default getSSMParam;
