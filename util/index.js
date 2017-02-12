const jira = require('./jira');
const transform = require('./transform');

module.exports = {
  getMessage: transform.getMessage,
  getReviewData: transform.getReviewData,
  getJiraIssues: transform.getJiraIssues,
  getJiraIssuesFromData: transform.getJiraIssuesFromData,
  getJiraIssuesFromEvent: transform.getJiraIssuesFromEvent,
  getAuthHeader: jira.getAuthHeader,
  getFetchOptions: jira.getFetchOptions,
  transitionJiraIssue: jira.transitionJiraIssue,
  transitionJiraIssues: jira.transitionJiraIssues,
};
