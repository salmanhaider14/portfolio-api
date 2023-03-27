const { json } = require("express");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose.connect(
  "mongodb://salmanpatrick5:nullreference404@ac-x0vrprq-shard-00-00.7ana4mj.mongodb.net:27017,ac-x0vrprq-shard-00-01.7ana4mj.mongodb.net:27017,ac-x0vrprq-shard-00-02.7ana4mj.mongodb.net:27017/?ssl=true&replicaSet=atlas-r6nhrv-shard-0&authSource=admin&retryWrites=true&w=majority"
);
const db = mongoose.connection;

db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to database"));

app.get("/", (req, res) => {
  res.send("Assalam o Alaikum");
});

const projectRouter = require("./Routes/projectsRoutes");
app.use("/projects", projectRouter);

app.listen(3000, () => console.log("Server is running"));