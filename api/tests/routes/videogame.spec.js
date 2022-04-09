const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app");
const { Videogame, conn } = require("../../src/db.js");

const agent = session(app);

const videogame = {
  name: "Maincra",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.n porttitor sit amet est ac varius.",
  released: "2022-28-02",
  rating: 4,
  platforms: ["Xbox One", "PlayStation 4"],
  genres: ["RPG", "Platformer"],
};

describe("Videogame routes", () => {
  describe("GET Videogames", () => {
    it("should get 200", () => agent.get("/videogames").expect(200)).timeout(
      40000
    );
  });
});


describe('Test de APIS', () => {
  describe('GET /', () => {
    it('responds with 200', () => agent.get('/genres').expect(200));

  })
})


describe("Videogame routes", () => {
  describe("GET plat", () => {
    it("should get 200", () => agent.get("/videogames/plat").expect(200)).timeout(
      40000
    );
  });
});


