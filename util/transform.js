'use strict';

const jiraIssueRe = /(NT\-\d+)/gi;

function getMessage(event) {
  return JSON.parse(event.Records[0].Sns.Message);
}

function getReviewData(message) {
  return {
    action: message.action,
    state: message.review.state,
    title: message.pull_request.title,
    body: message.pull_request.body,
    commitsUrl: message.pull_request.commits_url,
    branch: message.pull_request.head.ref,
  };
}

function getJiraIssues(str) {
  const results = str.match(jiraIssueRe);
  if (!results) return [];
  return results;
}

function getJiraIssuesFromData(data) {
  const issues = new Set();

  const keys = ['title', 'body', 'branch'];
  keys.forEach((key) => {
    if (!data.hasOwnProperty(key)) return;

    const newIssues = getJiraIssues(data[key]);
    newIssues.forEach((issue) => issues.add(issue));
  });

  return Array.from(issues);
}

function getJiraIssuesFromEvent(event) {
  const message = getMessage(event);
  const data = getReviewData(message);
  return getJiraIssuesFromData(data);
}

module.exports = {
  getMessage: getMessage,
  getReviewData: getReviewData,
  getJiraIssues: getJiraIssues,
  getJiraIssuesFromData: getJiraIssuesFromData,
  getJiraIssuesFromEvent: getJiraIssuesFromEvent,
};
