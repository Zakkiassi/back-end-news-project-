const { getTopics } = require("./controllers/topics.controllers");
const {
  getArticles,
  patchArticleById,
} = require("./controllers/articles.controllers");
const { getAllUsers } = require("./controllers/users.contollers");

const express = require("express");
const app = express();
app.use(express.json());
app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticles);

app.get("/api/users", getAllUsers);
app.patch("/api/articles/:article_id", patchArticleById);

app.all("/*", (req, res, next) => {
  console.log("error handler");
  res.status(404).send({ msg: "file or articole not found" });
});

app.use((err, req, res, next) => {
  console.log(err, "costume error handler");
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else if (err.code === "22P02") {
    res.status(400).send({ msg: "bad request" });
  } else {
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

module.exports = app;
