const db = require("../db/connection");
exports.selectAllUsers = () => {
  return db.query("SELECT * FROM users").then((data) => {
    if (data.rowCount === 0) {
      return Promise.reject({ status: 404, message: "No article found" });
    }
    return data.rows;
  });
};
