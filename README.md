# Hull Cinema Club - Serverless

A demo application for the CodePen talk "Building Event-driven Applications with Serverless".

### Setup

In order to deploy the application you'll need an AWS account that has had a payment method setup (though this project won't cost you anything to run).

**1. Install yarn and fetch dependencies**

`yarn install`

**2. Setup default AWS provider credentials following the instructions on [this video](https://www.youtube.com/watch?v=HSd9uYj2LJA).**

**3. Deploy the service**

`yarn deploy`

**4. Update the DynamoDB Stream**

The DynamoDB stream ARN on line 104 of the `serverless.yml` does not populate automatically and will need updating. Open AWS, navigate to DynamoDB and select your table. In the overview tab there is a Latest stream ARN value. Copy it, uncomment lines 103 + 104 of the `serverless.yml` and replace the value of the stream ARN.

**5. Deploy again **

Now that your DynamoDB table has been created it can be used to trigger the `dynamo_stream` function (as configured in step 4). You will need to redeploy to add this event.

`yarn deploy`

**5. Invoke the movie_import function**

`yarn invoke -f movie_import`

This will run the importer for the first time and means you won't have to wait 24 hours.

**6. Visit the dynamically created endpoint that is output when you ran serverless deploy i.e. `https://5p4rtvzt5i.execute-api.eu-west-2.amazonaws.com/dev/`**

### Removal

The movie importer is a scheduled event that will run every 24 hours from when you deploy this application. Assuming you don't want it running for the rest of time, run the following command...

`yarn remove`

### Disclaimer

This project was built to demonstrate a few of the event types available in the Serverless Framework. It does not necessarily adhere to best practices but is meant for demonstrative purposes only.
