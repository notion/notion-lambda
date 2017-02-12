'use strict';

const fetch = require('node-fetch');

const QE_REVIEW_ID = '91';
const jiraUri = 'https://notionai.atlassian.net/rest/api/2';

function getAuthHeader(user, pass) {
  if (typeof user === 'undefined') {
    user = process.env.JIRA_USER;
  }

  if (typeof pass === 'undefined') {
    pass = process.env.JIRA_PASS;
  }

  const encrypted = new Buffer(`${user}:${pass}`).toString('base64');
  return `Basic ${encrypted}`;
}

function getFetchOptions(user, pass) {
  return {
    method: 'GET',
    redirect: 'follow',
    headers: {
      'Authorization': getAuthHeader(user, pass),
      'Content-Type': 'application/json',
    },
  }
}

function transitionJiraIssue(issue) {
  const url = `${jiraUri}/issue/${issue}/transitions`;
  const options = getFetchOptions();
  options.method = 'POST';
  options.body = JSON.stringify({
    transition: {
      id: QE_REVIEW_ID,
    }
  });

  return fetch(url, options)
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.error(err);
    });
}

function transitionJiraIssues(issues) {
  issues.forEach((issue) => transitionJiraIssue(issue));
}

module.exports = {
  getAuthHeader: getAuthHeader,
  getFetchOptions: getFetchOptions,
  transitionJiraIssue: transitionJiraIssue,
  transitionJiraIssues: transitionJiraIssues,
};
