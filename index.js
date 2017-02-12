'use strict';

console.log('Loading function');

exports.handler = (event, context, callback) => {
    const message = event.Records[0].Sns.Message;
    console.log('From SNS:', message);
    callback(null, message);
};
