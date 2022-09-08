const {
  selectArticles,
  updateArticlesById,
} = require("../modules/articles.modules");

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

exports.patchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const { votes } = req.body;
  updateArticlesById(article_id, votes)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};
