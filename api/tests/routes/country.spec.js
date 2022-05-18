/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const request = require('supertest-session');
const app = require('../../src/app.js');




describe('get countries', () => {
  it('should return 200 if we get all countries from bd', async () => {
    const res = await request(app).get('/countries');

    expect(res.statusCode).to.equal(200);
  });
  it('should return 404 if the country dont exist in bd', async () => {
    const res = await request(app).get('/countries?name=laza');

    expect(res.statusCode).to.equal(404);
  });
  it('should return error message if the country dont exist in bd for bad params request', async () => {
    const res = await request(app).get('/countries?name=laza');

    expect(res.error.text).to.equal("Not Found");
  });
  it('should return error message if the country dont exist in bd for bad query request', async () => {
    const res = await request(app).get('/countries/A3S');
    expect(res.error.text).to.equal("Not Found");
  });
});
