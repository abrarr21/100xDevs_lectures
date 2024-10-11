import express from "express";
import { createClient } from "redis";

const app = express();
app.use(express.json());

const client = createClient();

async function startServer() {
  try {
    await client.connect();
    console.log("Connected to Redis");

    app.listen(6969, () => {
      console.log("Server is running at port: 6969");
    });
  } catch (error) {
    console.log("Failed to connect to Redis", error);
  }
}

startServer();

app.post("/submit", async (req, res) => {
  const problemId = req.body.problemId;
  const code = req.body.code;
  const language = req.body.language;

  try {
    await client.lPush(
      "problems",
      JSON.stringify({ code, language, problemId }),
    );
    res.json({
      message: "Submission received!",
    });
  } catch (error) {
    res.json({
      message: "Submission failed",
    });
  }
});
