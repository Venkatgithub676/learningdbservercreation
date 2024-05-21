const express = require("express");
const app = express();
const { open } = require("sqlite");
const path = require("path");
const dbPath = path.join(__dirname, "goodreads.db");
const sqlite3 = require("sqlite3");
let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server is running at http://localhost:3000/");
    });
  } catch (error) {
    console.log(`DB Error : ${error.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

app.get("/books", async (request, response) => {
  const getQuery = `SELECT * FROM BOOK order by book_id;`;
  let res = await db.all(getQuery);
  response.send(res);
});

module.exports = app;
