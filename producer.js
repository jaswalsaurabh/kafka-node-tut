const { kafka } = require("./client");
const readLine = require("readline");

const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function init() {
  const producer = kafka.producer();
  console.log("producer connecting");
  await producer.connect();
  rl.setPrompt("> ");
  rl.prompt();

  rl.on("line", async (data) => {
    const [name, location] = data.split(' ');
    console.log("producer connected");
    await producer.send({
      topic: "rider-updates",
      messages: [
        {
          key: "locationUpdate",
          partition: location.toLowerCase() === "north" ? 0 : 1,
          value: JSON.stringify({ name, location }),
        },
      ],
    });
  }).on("close", async () => {
    await producer.disconnect();
  });
}

init();
