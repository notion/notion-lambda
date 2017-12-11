const GithubApi = require('github');

const github = new GithubApi({ version: '3.0.0' });
const repos = process.env.GH_REPOS.split(',');

console.log(repos);

github.authenticate({
  type: 'oauth',
  token: process.env.GH_TOKEN,
});

repos.forEach((repo) => {
  github.repos.createHook({
    owner: 'notion',
    repo: repo,
    name: 'amazonsns',
    config: {
      'aws_key': process.env.AWS_KEY,
      'aws_secret': process.env.AWS_SECRET,
      'sns_topic': process.env.AWS_SNS_TOPIC,
      'sns_region': process.env.AWS_SNS_REGION || 'us-east-1',
    },
    events: ['pull_request_review'],
  }, (err, result) => {
    console.log(err);
    console.log(result);
  });
});

