'use strict';
var fs = require("fs");

var accessKey = process.env.AWS_ACCESS_KEY_ID || 'YOUR_KEY';
var accessSecret = process.env.AWS_SECRET_ACCESS_KEY || 'YOUR_SECRET';

var amazonMws = require('../../../lib/amazon-mws')(accessKey, accessSecret);

/*  use __RAW__ to get the raw response in response->data; this along  with __CHARSET__ do not get written in the request. */
function GetFeedSubmissionResultRaw(FeedSubmissionId) {

    amazonMws.feeds.search({
        'Version': '2009-01-01',
        'Action': 'GetFeedSubmissionResult',
        'SellerId': 'SELLER_ID',
        'MWSAuthToken': 'MWS_AUTH_TOKEN',
        'FeedSubmissionId': FeedSubmissionId,
        __RAW__ : true 
    }, (error, response) => { 
        if (error) {
            console.log('error ', error);
            return;
        }
        fs.writeFileSync('response.txt',response.data)
        console.log('Headers', response.Headers);
    });
};

GetFeedSubmissionResultRaw('10101010XXX');