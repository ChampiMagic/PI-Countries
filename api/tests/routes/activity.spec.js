const request = require('supertest-session');
const app = require('../../src/app.js');
const { expect } = require('chai');

describe('create activity', () => {
  it('returns 201 if activity was created', async () => {
    const res = await request(app).post('/activities').send({name: "sky",difficulty: "principiante",duration: 2,season: "Verano", country: ["Argentina"]});
    expect(res.statusCode).to.equal(201);
  });
  it('returns 400 if something is wrong', async () => {
    const res = await request(app).post('/activities').send({nae: "sky",difficulty: "principiante",duration: 2,season: "Verano", country: ["Argentina"]});

    expect(res.statusCode).to.equal(400);
  });
  it('returns an error mesagge if name is messing', async () => {
    const res = await request(app).post('/activities').send({name: "sky",difficulty: "principiante",durtion: 2,season: "Verano", country: ["Argentina"]});

    expect(res.error.text).to.equal('Activity.duration cannot be null');
  });
});
