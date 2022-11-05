const request = require("supertest");
const app = require("../app");
const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("404 error", () => {
  test("error for invalid end point", () => {
    return request(app)
      .get("/api/nottopics")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("file or articole not found");
      });
  });
});

describe("GET /api/topics", () => {
  test("200: returns an array of topic", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((res) => {
        const { body } = res;
        expect(Array.isArray(body.topics)).toBe(true);
        body.topics.forEach((topic) => {
          expect(topic).toEqual(
            expect.objectContaining({
              slug: expect.any(String),
              description: expect.any(String),
            })
          );
          expect(Object.keys(topic).length).toBe(2);
        });
      });
  });
});
describe("GET /api/articles/:article_id", () => {
  test("200:return an object of article ", () => {
    const ARTICLE_ID = 1;
    return request(app)
      .get(`/api/articles/${ARTICLE_ID}`)
      .expect(200)
      .then((res) => {
        const { body } = res;
        console.log(body);
        expect(body.article[0]).toEqual({
          article_id: 1,
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          body: "I find this existence challenging",
          created_at: "2020-07-09T20:11:00.000Z",
          votes: 100,
        });
      });
  });
  test("status:404, respond with error message", () => {
    return request(app)
      .get("/api/article/500")
      .expect(404)
      .then(({ body }) => {
        console.log(body);
        const { msg } = body;
        expect(msg).toBe("file or articole not found");
      });
  });
  test("status:400, responds with an error message when passed a bad user ID", () => {
    return request(app)
      .get("/api/articles/notAnID")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("bad request");
      });
  });
});
exports.patchParkById = (req, res) => {
  const { park_id } = req.params;
  updateParkById(park_id, req.body)
    .then((park) => {
      res.status(200).send({ park });
    })
    .catch((err) => console.log(err));
};

describe("GET /api/users", () => {
  test("200: returns an array of users", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then((res) => {
        const { body } = res;
        expect(Array.isArray(body.users)).toBe(true);
        body.users.forEach((user) => {
          expect(user).toEqual(
            expect.objectContaining({
              username: expect.any(String),
              name: expect.any(String),
              avatar_url: expect.any(String),
            })
          );
          expect(Object.keys(user).length).toBe(3);
        });
      });
  });
});

describe("PATCH /api/articles/:article_id", () => {
  const articleUpdate = {
    votes: 3,
  };
  test("status:200, responds with the updated article", () => {
    return request(app)
      .patch("/api/articles/1")
      .send(articleUpdate)
      .expect(200)
      .then(({ body }) => {
        expect(body.article).toEqual({
          article_id: 1,
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          body: "I find this existence challenging",
          created_at: "2020-07-09T20:11:00.000Z",
          votes: 103,
        });
      });
  });
  test("status:404, respond with error message", () => {
    return request(app)
      .get("/api/article/1000")
      .expect(404)
      .then(({ body }) => {
        console.log(body);
        const { msg } = body;
        expect(msg).toBe("file or articole not found");
      });
  });
  test("status:400, responds with an error message when passed a bad user ID", () => {
    return request(app)
      .get("/api/articles/notAnID")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("bad request");
      });
  });
});
