"use strict";

const { v4 } = require("uuid");
const AWS = require("aws-sdk");

const fetchItem = async (event) => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  const { id } = event.pathParameters;

  let item;

  try {
    const results = await dynamoDb
      .get({
        TableName: "ItemTableNew",
        Key: { id },
      })
      .promise();

    item = results.Item;
  } catch (e) {
    console.error(e);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(item),
  };
};

module.exports = {
  handler: fetchItem,
};
