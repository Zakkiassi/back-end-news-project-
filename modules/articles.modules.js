const db = require("../db/connection");
exports.selectArticles = (article_id) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1;", [article_id])
    .then((data) => {
      if (data.rowCount === 0) {
        return Promise.reject({ status: 404, message: "No article found" });
      }
      return data.rows;
    });
};
exports.updateArticlesById = (article_id, editArticles) => {
  const { vote } = editArticles;
  return db
    .query("UPDATE articls SET vote = vote + $2 WHERE article_id = $1 RETURNING *;", [
      article_id,
      vote,
    ])
    .then((result) => {
      return result.rows[0];
    });
};
