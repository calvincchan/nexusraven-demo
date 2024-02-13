import { Ollama } from "@langchain/community/llms/ollama";
import { LLM } from "@langchain/core/language_models/llms";
import { PromptTemplate } from "@langchain/core/prompts";
import "dotenv/config";
import ora from "ora";

async function generateResponse(model: LLM, question: string) {
  const prompt = PromptTemplate.fromTemplate(`<human>:
    OPTION:
    <func_start>def hello_world(n : int)<func_end>
    <docstring_start>
    \"\"\"
    Prints hello world to the user.

    Args:
    n (int) : Number of times to print hello world.
    \"\"\"
    <docstring_end>

    OPTION:
    <func_start>def hello_universe(n : int)<func_end>
    <docstring_start>
    \"\"\"
    Prints hello universe to the user.

    Args:
    n (int) : Number of times to print hello universe.
    \"\"\"
    <docstring_end>

    User Query: Question: {question}

    Please pick a function from the above options that best answers the user query and fill in the appropriate arguments.<human_end>
    `);

  const response = await model.invoke(await prompt.format({ question }));

  return response;
}

export default async function main() {
  /** Prepare LLM model with tools */
  const model = new Ollama({
    baseUrl: "http://localhost:11434",
    model: "nexusraven",
    temperature: 0.001,
  });

  /** Init message with context. */
  console.log(`Hello, this is demo of local LLM using Ollama and Nexusraven.`);

  const timer = "LLM";
  const question = "Please print hello universe 31 times.";

  console.time(timer);
  const spinner = ora(question).start();
  const result = await generateResponse(model, question);
  spinner.succeed();
  console.timeEnd(timer);
  console.log("result", result);
}

(async () => {
  await main();
})();
