import readline from "readline";
import fetch from "node-fetch";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter your name: ", async (name) => {
  const res = await fetch("https://api.publicapis.org/entries");
  const data = await res.json();
  console.log(`Hello, ${name}!`);
  console.log("Fetched data example:", data.entries[0].API);
  rl.close();
});
