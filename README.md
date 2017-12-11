# Notion Lambda [![Build Status](https://travis-ci.org/notion/notion-lambda.svg?branch=master)](https://travis-ci.org/notion/notion-lambda)

## Setup

### Requirements

* Node v4.3 // this is what AWS Lambda uses
* AWS SNS // bridge between github and AWS
* AWS Lambda // serverless function that processes github events and sends to JIRA

### Environment variables

* GH_TOKEN="" // Github personal access token
* GH_REPOS="" // Github repos to receive events from, comma delimited, e.g. "desktop,ml"
* AWS_KEY=""
* AWS_SECRET=""
* AWS_SNS_TOPIC=""
* AWS_SNS_REGION="us-east-1"
* JIRA_USER="" // JIRA user name
* JIRA_PASS="" // JIRA password

## Functions

### Custom Github Webhook to JIRA

This lambda function does the following:

* Receives `pull_request_review` events from Github
* Processes that event for any JIRA issues
* Transitions those JIRA issues from `RESOLVED` to `IN TEST`
