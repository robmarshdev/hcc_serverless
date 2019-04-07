# Hull Cinema Club - Serverless

A demo application for the CodePen talk "Building Event-driven Applications with Serverless".

### Setup

1. Install yarn and fetch dependencies

`yarn install`

2. Setup AWS provider credentials following the instructions on [this video](https://www.youtube.com/watch?v=HSd9uYj2LJA).

3. Deploy the service

`yarn deploy`

4. Invoke the movie_import function

`yarn invoke -f movie_import`

This will run the importer for the first time and means you won't have to wait 24 hours.

5. Visit the dynamically created endpoint that is output when you ran serverless deploy i.e. `https://5p4rtvzt5i.execute-api.eu-west-2.amazonaws.com/dev/`

### Disclaimer

This project was built to demonstrate a few of the event types available in the Serverless Framework. It does not necessarily adhere to best practices but is meant for demonstrative purposes only.
