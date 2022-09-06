const request = require('supertest')
const app = require("../app")
const db = require('../db/connection.js')
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('404 error', () => {
  test('error for invalid end point', () => {
    return request(app).get("/api/nottopics")
    .expect(404)
    .then((res)=> {
      expect(res.body.msg).toBe("file not found")
    })
  });
});

describe("GET /api/topics", ()=> {
    test("200: returns an array of topic", () => {
        return request(app).get('/api/topics')
        .expect(200)
        .then((res) => {
            const{body} = res;
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
            
        })
    });
    
})