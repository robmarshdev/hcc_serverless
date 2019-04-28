# Hull Cinema Club - Serverless

A demo application for the CodePen talk "Building Event-driven Applications with Serverless".

### Requirements

* Too create the infrastructure you'll need to install [Terraform](https://www.terraform.io/downloads.html).
* To deploy the application you'll need an AWS account that has had a payment method setup (though this project won't cost you anything to run).

### Setup

**1. Install yarn and fetch dependencies**

`yarn install`

**2. Setup default AWS provider credentials following the instructions on [this video](https://www.youtube.com/watch?v=HSd9uYj2LJA).**

**3. Plan and apply Terraform**

`yarn tf_plan -out plan`
`yarn tf_apply plan`

**3. Deploy the service**

`yarn deploy`

**4. Invoke the movie_import function**

`yarn invoke -f movie_import`

This will run the importer for the first time and means you won't have to wait 24 hours.

**5. Visit the dynamically created endpoint that is output when you ran serverless deploy i.e. `https://5p4rtvzt5i.execute-api.eu-west-2.amazonaws.com/dev/`**

### Removal

The movie importer is a scheduled event that will run every 24 hours from when you deploy this application. Assuming you don't want it running for the rest of time, run the following command...

`yarn remove`

### Disclaimer

This project was built to demonstrate a few of the event types available in the Serverless Framework. It does not necessarily adhere to best practices but is meant for demonstrative purposes only.
