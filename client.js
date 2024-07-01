const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  brokers: ["localhost:9092"],
  clientId: "node-kaf",
});

module.exports = { kafka };
