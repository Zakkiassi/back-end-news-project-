const db = require("../db/connection");
exports.selectArticles = (article_id) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1;", [article_id])
    .then((data) => {
      if (!data.rows[0]) {
        return Promise.reject({ status: 404, msg: "No article found" });
      }
      console.log(data.rows, "in the module");
      return data.rows[0];
    });
  //.catch((err) => console.log(err));
};
