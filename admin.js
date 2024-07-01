const { kafka } = require("./client");

async function init() {
  const admin = kafka.admin();
  console.log("admin connecting");
  admin.connect();
  console.log("admin connected");

  console.log("topic creating");
  await admin.createTopics({
    topics: [
      {
        topic: "rider-updates",
        numPartitions: 2,
      },
    ],
  });

  console.log("topic created");

  await admin.disconnect();
  console.log("admin disconnected");
}

init();
