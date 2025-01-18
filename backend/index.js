const express = require("express");
const app = express();
const port = process.env.PORT || 8000;

require("dotenv").config();
require("./Models/db");
const TaskRouter = require("./Routes/TaskRouter");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use("/tasks", TaskRouter);

app.get("/", (req, res) => {
  res.send("hello from server ");
});

app.listen(port, () => {
  console.log("server is runnig on port ", port);
});
