const { selectArticles } = require("../modules/articles.modules");

exports.getArticles = (req, res, next) => {
  console.log(req.params);
  const { article_id } = req.params;
  selectArticles(article_id)
    .then((article) => {
      console.log(article);
      res.status(200).send({ article });
    })
    .catch(next);
};
