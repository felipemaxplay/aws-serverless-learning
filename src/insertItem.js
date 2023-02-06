"use strict";

const { v4 } = require("uuid");
const AWS = require("aws-sdk");

const insertItem = async (event) => {
  const { item } = JSON.parse(event.body);
  const createdAt = new Date().toISOString();
  const id = v4();

  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  const newItem = {
    id,
    item,
    createdAt,
    itemStatus: false,
  };

  await dynamoDb.put({
    TableName: "ItemTableNew",
    Item: newItem,
  }).promise();

  return {
    statusCode: 201,
    body: JSON.stringify(newItem),
  };
};

module.exports = {
  handler: insertItem,
};
