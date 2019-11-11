const AWS = require('aws-sdk');
AWS.config.update({ region: "us-east-2" });

const dynamodb = new AWS.DynamoDB();

// dynamodb.listTables({}, (err, data) => {
//     if (err) {
//         console.error(err);
//     }
//     console.log(data)
// }) 


// dynamodb.describeTable({
//     TableName: 'td_notes_test'
// }, (err, data) => {
//     if (err) {
//         console.error(err);
//     }
//     console.log(JSON.stringify(data, null, 2))
// })

dynamodb.createTable({
    TableName: 'td_nodes_sdk',
    AttributeDefinitions: [
        {
            AttributeName: "user_id",
            AttributeType: "S"
        },
        {
            AttributeName: "timestamp",
            AttributeType: "N"
        },
    ],
    KeySchema: [
        {
            AttributeName: "user_id",
            KeyType: "HASH"
        },
        {
            AttributeName: 'timestamp',
            KeyType: "RANGE"
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
    }
}, (err, data) => {
    if (err) {
        console.error(err);
    }
    console.log(JSON.stringify(data, null, 2))
})