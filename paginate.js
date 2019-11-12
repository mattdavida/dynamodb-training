const AWS = require('aws-sdk')
const async = require('async');
const _ = require('underscore');


AWS.config.update({ region: 'us-east-2' })

const docClient = new AWS.DynamoDB.DocumentClient();

var startKey = [];
var results = [];
var pages = 0;


async.doWhilst(
    (callback) => {

        let params = {
            TableName: 'td_notes_test',
            Limit: 3
        };
        if (!_.isEmpty(startKey)) {
            params.ExclusiveStartKey = startKey;
        }

        docClient.scan(params, (err, data) => {
            if (err) {
                console.error(err);
                callback(err, {});
            }

            if (typeof data.LastEvaluatedKey !== 'undefined') {
                startKey = data.LastEvaluatedKey;
            } else {
                startKey = [];
            }
            if (!_.isEmpty(data.Items)) {
                results = _.union(results, data.Items);
            }

            pages++;

            callback(null, results);
        })
    },
    () => {
        if (_.isEmpty(startKey)) {
            return false;
        }


        return true;
    },
    (err, data) => {
        if (err) {
            console.error(err);
        }
        console.log(data);
        console.log('ITEM COUNT: ', data.length);
        console.log('PAGES: ', pages);
    }
)