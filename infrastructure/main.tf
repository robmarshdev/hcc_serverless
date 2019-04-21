provider "aws" {
  version = "~> 1.0"
  region  = "eu-west-2"
}

// will be overwritten by tfvars file
variable "omdb_api_key" {}

resource "aws_dynamodb_table" "hcc_db" {
  name             = "hull_cinema_club"
  read_capacity    = 2
  write_capacity   = 2
  hash_key         = "FirstId"
  range_key        = "SecondId"
  stream_enabled   = true
  stream_view_type = "NEW_IMAGE"

  attribute {
    name = "FirstId"
    type = "S"
  }

  attribute {
    name = "SecondId"
    type = "S"
  }
}

resource "aws_ssm_parameter" "db_name" {
  name      = "hcc_db_name"
  type      = "String"
  value     = "${aws_dynamodb_table.hcc_db.id}"
  overwrite = true
}

resource "aws_ssm_parameter" "db_arn" {
  name      = "hcc_db_arn"
  type      = "String"
  value     = "${aws_dynamodb_table.hcc_db.arn}"
  overwrite = true
}

resource "aws_ssm_parameter" "db_stream_arn" {
  name      = "hcc_db_stream_arn"
  type      = "String"
  value     = "${aws_dynamodb_table.hcc_db.stream_arn}"
  overwrite = true
}

resource "aws_ssm_parameter" "omdb_api_key" {
  name      = "hcc_omdb_api_key"
  type      = "String"
  value     = "${var.omdb_api_key}"
  overwrite = true
}
