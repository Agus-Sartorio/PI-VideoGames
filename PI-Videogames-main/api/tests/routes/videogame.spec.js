const { Videogame, conn } = require('../../src/db.js');
const session = require('supertest-session');
const app = require('../../src/app.js');
const agent = session(app);

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
      it('should work when its a valid name', () => {
        Videogame.create({ name: 'Hola' });
      });
    });
  });
});



 describe('Routes', () => {

  describe('GET /videogames', () => {
    it('expecting 200 as response', () =>
      agent.get('/videogames').expect(200)
    );
  });

  describe('GET /videogames?name=portal', () => {
    it('expecting 200 when portal is the name searched', () => 
      agent.get('/videogames?name=portal').expect(200)
    );
  });

  describe('GET /videogames?name=nonExistingName', () => {
    it('expecting 404 when the name searched doesnt exist', () => 
      agent.get('/videogames?name=nonExistingName').expect(404)
    );
  });

  describe('GET /videogame/:id', () => {
    it('expecting 200 when the id searched exists', () => 
      agent.get('/videogame/3498').expect(200)
    );
  });

  describe('GET /videogame/:id', () => {
    it('expecting 404 when the id searched doesnt exist', () => 
      agent.get('/videogame/1111111111119').expect(404)
    );
  });

  describe('GET /genres', () => {
    it('expecting 200 as response', () => 
      agent.get('/genres').expect(200)
    );
  });

  describe('GET /nonExistingRoute', () => {
    it('expecting 404 as response', () => 
      agent.get('/nonExistingRoute').expect(404)
    );
  }); 


})

