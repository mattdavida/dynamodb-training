const AWS = require('aws-sdk')
AWS.config.update({ region: 'us-east-2' })

const docClient = new AWS.DynamoDB.DocumentClient();

// docClient.put({
//     TableName: 'td_nodes_sdk',
//     Item: {
//         user_id: 'bb',
//         timestamp: 2,
//         title: 'new title',
//         content: 'new content'
//     }
// }, (err, data) => {
//     if (err) {
//         console.error(err);
//     }

//     console.log('DOC CLIENT PUT: ', JSON.stringify(data, null, 2));

// }) 

// docClient.update({
//     TableName: 'td_nodes_sdk',
//     Key: {
//         user_id: 'bb',
//         timestamp: 1
//     },
//     UpdateExpression: "set #t = :t",
//     ExpressionAttributeNames: {
//         '#t': 'title'
//     },
//     ExpressionAttributeValues: {
//         ":t": "Updated title"
//     }
// }, (err, data) => {
//     if (err) {
//         console.error(err);
//     }

//     console.log('DOC CLIENT PUT: ', JSON.stringify(data, null, 2));

// }) 


// docClient.delete({
//     TableName: 'td_nodes_sdk',
//     Key: {
//         user_id: 'bb',
//         timestamp: 1
//     }
// }, (err, data) => {
//     if (err) {
//         console.error(err);
//     }

//     console.log('DOC CLIENT DELETE: ', data);
// })  

docClient.batchWrite({
    RequestItems: {
        'td_nodes_sdk': [
            {
                DeleteRequest: {
                    Key: { user_id: 'bb', timestamp: 2 }
                }
            },
            {
                PutRequest: {
                    Item: {
                        user_id: '11',
                        timestamp: 1,
                        title: 'Title 11',
                        content: 'Content 11'
                    }
                }
            },
            {
                PutRequest: {
                    Item: {
                        user_id: '22',
                        timestamp: 2,
                        title: 'Title 22',
                        content: 'Content 22'
                    }
                }
            },
        ]
    }
}, (err, data) => {
    if (err) {
        console.error(err);
    }

    console.log('DOC CLIENT BATCHWRITE: ', JSON.stringify(data, null, 2));
})