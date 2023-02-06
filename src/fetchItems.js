"use strict";

const { v4 } = require("uuid");
const AWS = require("aws-sdk");

const fetchItems = async (event) => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  let items;

  try {
    const results = await dynamoDb
      .scan({
        TableName: "ItemTableNew",
      })
      .promise();

    items = results.Items;
  } catch (e) {
    console.error(e);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(items),
  };
};

module.exports = {
  handler: fetchItems,
};
