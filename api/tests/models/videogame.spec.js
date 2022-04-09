const { Videogame, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe('Videogame model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));



  describe('Validators', () => {
    beforeEach(() => Videogame.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Videogame.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });


      it('debería funcionar cuando es un nombre válido', () => {
        Videogame.create({ name: 'Super Mario Bros' });
      });

      it("Debería crear exitosamente un nuevo juego con todos los parametros", (done) => {
        Videogame.create({
          name: "Probando",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.n porttitor sit amet est ac varius.",
          released: "2022-28-02",
          rating: 4,
          platforms: ["Xbox One", "PlayStation 4"],
          genres: ["RPG", "Platformer"],
        })
          .then(() => done())
          .catch(() => done(new Error("it should create a new Videogame")));
      });


    });


  });
});





