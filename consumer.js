const { kafka } = require("./client");
const group = process.argv[2];

async function init() {
  const consumer = kafka.consumer({ groupId: group });
  await consumer.connect();
  await consumer.subscribe({ topic: "rider-updates", fromBeginning: true });
  await consumer.run({
    eachMessage: ({ topic, message, partition }) => {
      console.log(
        `#${group} -${topic}: PART:${partition}: ${message.value.toString()}`
      );
    },
  });
}

init();
