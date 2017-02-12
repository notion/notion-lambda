const test = require('tape');
const path = require('path');

const util = require('./util');

const fixtures = path.join(__dirname, 'fixtures');

test('getMessage', (t) => {
  t.plan(1);
  const payload = require(path.join(fixtures, 'simple_message.json'));

  const actual = util.getMessage(payload);
  const expected = { action: 'submitted' };

  t.deepEqual(actual, expected);
});

test('getReviewData', (t) => {
  t.plan(1);
  const payload = require(path.join(fixtures, 'pr_review_payload.json'));
  const message = util.getMessage(payload);

  const actual = util.getReviewData(message);
  const expected = {
    action: 'submitted',
    state: 'commented',
    title: 'NT-1206 - Refactor drafts into messages. Build draft creating/updating',
    body: 'Fixes https://github.com/notion/notion-desktop/issues/1063.\r\nFixes [NT-4](https://notionai.atlassian.net/browse/NT-4)\r\nFixes [NT-1206](https://notionai.atlassian.net/browse/NT-1206)\r\n\r\n### What the pull request does\r\n- Moves drafts into messages \r\n  - Drafts are just `messages` with a property `is_draft: true` \r\n- Try persisting draft once `to`, `subject`, or `body` are defined.\r\n- Add draft persistence via draft cloud api\r\n\r\n### Where should the reviewer start?\r\n`modules/compose/components/index.js`\r\n`src/modules/drafts/effects.js`\r\n\r\n### Screen recordings (if appropriate)\r\n![editing-drafts](https://cloud.githubusercontent.com/assets/1278367/22663424/8b7c3d8e-ec7a-11e6-905e-718d30e7b62c.gif)\r\n\r\n## Remaining work\r\n- [x] Remove attachments\r\n- [x] Clean up pass\r\n- [x] Flow typing\r\n- [x] Tests',
    commitsUrl: 'https://api.github.com/repos/notion/notion-desktop/pulls/1091/commits',
    branch: 'threadview-draft',
  };

  t.deepEqual(actual, expected);
});

test('getJiraIssues with multiple matches', (t) => {
  t.plan(1);
  const payload = 'NT-1206 - Refactor drafts into messages. NT-12345 Build draft creating/updating';

  const actual = util.getJiraIssues(payload);
  const expected = ['NT-1206', 'NT-12345'];

  t.deepEqual(actual, expected);
});

test('getJiraIssues with no matches', (t) => {
  t.plan(1);
  const payload = 'Refactor drafts into messages. Build draft creating/updating';

  const actual = util.getJiraIssues(payload);
  const expected = [];

  t.deepEqual(actual, expected);
});

test('getJiraIssuesFromData', (t) => {
  t.plan(1);
  const payload = {
    title: 'NT-1206 - Refactor drafts into messages. NT-12345 Build draft creating/updating',
    body: 'Fixed [NT-4], and NT-1206.',
    branch: 'NT-1337-something-else',
    another: 'NT-666',
  };

  const actual = util.getJiraIssuesFromData(payload);
  const expected = ['NT-1206', 'NT-12345', 'NT-4', 'NT-1337'];

  t.deepEqual(actual, expected);
});

test('getAuthHeader', (t) => {
  t.plan(1);

  const actual = util.getAuthHeader('mynameis', '1234');
  const expected = 'Basic bXluYW1laXM6MTIzNA==';

  t.equal(actual, expected);
});

test('getFetchOptions', (t) => {
  t.plan(1);

  const actual = util.getFetchOptions('mynameis', '1234');
  const expected = {
    headers: {
      Authorization: 'Basic bXluYW1laXM6MTIzNA==',
      'Content-Type': 'application/json',
    },
    method: 'GET',
    redirect: 'follow',
  };

  t.deepEqual(actual, expected);
});

test('getJiraIssuesFromEvent', (t) => {
  t.plan(1);
  const payload = require(path.join(fixtures, 'pr_review_payload.json'));

  const actual = util.getJiraIssuesFromEvent(payload);
  const expected = ['NT-1206', 'NT-4'];

  t.deepEqual(actual, expected);
});
