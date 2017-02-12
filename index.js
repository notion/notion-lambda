'use strict';

const util = require('./util');

exports.handler = (event, context, callback) => {
  const issues = util.getJiraIssuesFromEvent(event);
  util.transitionJiraIssues(issues);

  console.log('Processing issues:', issues);
  callback(null, issues);
}
