const db = require("../db/connection");
exports.selectArticles = (article_id) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1;", [article_id])
    .then((data) => {
      if (data.rowCount === 0) {
        return Promise.reject({ status: 404, msg: "No article found" });
      }
      return data.rows;
    });
};
exports.updateArticlesById = (article_id, votes) => {
  const varArr = [article_id, votes];
  return db
    .query(
      "UPDATE articles SET votes = votes + $2 WHERE article_id = $1 RETURNING *;",
      varArr
    )
    .then((result) => {
      console.log(result.rows[0]);
      return result.rows[0];
    });
};
