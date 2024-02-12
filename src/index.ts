import { Ollama } from "@langchain/community/llms/ollama";
import "dotenv/config";
import { HumanMessage } from "langchain/schema";
import ora from "ora";

export default async function main() {
  /** Prepare LLM model with tools */
  const model = new Ollama({
    baseUrl: "http://localhost:11434",
    model: "nexusraven",
    temperature: 0.001,
  });

  /** Init message with context. */
  console.log(`Hello, this is demo of local LLM using Ollama and Nexusraven.`);
  // Starts the timer
  console.time("LLM");
  const spinner = ora("Hello, What's the date of today?").start();
  const result = await model.invoke([
    new HumanMessage(`Hello, What's the date of today?`),
  ]);
  spinner.stop();
  console.timeEnd("LLM");
  console.log("result", result);
}

(async () => {
  await main();
})();
