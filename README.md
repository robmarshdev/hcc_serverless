# Hull Cinema Club - Serverless

A demo application for the CodePen talk "Building Event-driven Applications with Serverless".

### Setup

**1. Install yarn and fetch dependencies**

`yarn install`

**2. Setup default AWS provider credentials following the instructions on [this video](https://www.youtube.com/watch?v=HSd9uYj2LJA).**

**3. Deploy the service**

`yarn deploy`

**4. Update the DynamoDB Stream**

The DynamoDB stream ARN on line 104 of the `serverless.yml` does not populate automatically and will need updating. Open AWS, navigate to DynamoDB and select your table. In the overview tab there is a Latest stream ARN value. Copy the timestamp at the end of the ARN and use it to replace the one in the `serverless.yml`

**5. Invoke the movie_import function**

`yarn invoke -f movie_import`

This will run the importer for the first time and means you won't have to wait 24 hours.

**6. Visit the dynamically created endpoint that is output when you ran serverless deploy i.e. `https://5p4rtvzt5i.execute-api.eu-west-2.amazonaws.com/dev/`**

### Disclaimer

This project was built to demonstrate a few of the event types available in the Serverless Framework. It does not necessarily adhere to best practices but is meant for demonstrative purposes only.
