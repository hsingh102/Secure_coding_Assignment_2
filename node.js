// code_sample.js
// Intentionally INSECURE sample for security tools (OWASP, CodeSweep, etc.)

const { exec } = require("child_process");
const mysql = require("mysql2");
const fetch = require("node-fetch");
const readline = require("readline");

// Hard-coded DB config (insecure)
const dbConfig = {
  host: "mydatabase.com",
  user: "admin",
  password: "secret123"
};

// Get user input (no validation)
function getUserInput() {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question("Enter your name: ", (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

// Insecure email sending using shell command → command injection risk
function sendEmail(to, subject, body) {
  const command = `echo ${body} | mail -s "${subject}" ${to}`;
  exec(command, (err) => {
    if (err) {
      console.log("Error sending email:", err);
    }
  });
}

// Insecure HTTP request (no HTTPS, no checks)
async function getData() {
  const url = "http://insecure-api.com/get-data";
  const response = await fetch(url);
  const data = await response.text();
  return data;
}

// SQL injection risk (string concatenation)
function saveToDb(data) {
  const query = `INSERT INTO mytable (column1, column2) VALUES ('${data}', 'Another Value')`;

  const connection = mysql.createConnection(dbConfig);
  connection.query(query, (err) => {
    if (err) {
      console.log("DB Error:", err);
    }
    connection.end();
  });
}

// Main flow
(async () => {
  const userInput = await getUserInput();
  console.log("User Input:", userInput);

  sendEmail("test@example.com", "Hello", `User said: ${userInput}`);

  const apiData = await getData();
  console.log("API Data:", apiData);

  saveToDb(apiData);
})();
