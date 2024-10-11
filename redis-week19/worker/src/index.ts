import { createClient } from "redis";

const client = createClient();

const main = async () => {
  await client.connect();
  console.log("Worker connected to Redis");
  while (1) {
    try {
      const response = await client.brPop("problems", 0);
      console.log(response);

      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Processed users submissions");
    } catch (error) {
      console.log("Error proccessing users submissions", error);
    }
  }
};

main();
