const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-2' })

const docClient = new AWS.DynamoDB.DocumentClient();

docClient.put({
    TableName: 'td_nodes_sdk',
    Item: {
        user_id: 'ABC',
        timestamp: 1,
        title: 'updated title',
        content: 'updated content'

    },
    ConditionExpression: '#t <> :t',
    ExpressionAttributeNames: {
        '#t': 'timestamp'
    },
    ExpressionAttributeValues: {
        ':t': 1
    }
}, (err, data) => {
    if (err) {
        console.error(err);
    }
    console.log(data);
})