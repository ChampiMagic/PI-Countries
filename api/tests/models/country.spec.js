const { Country, conn } = require('../../src/db.js');
const { expect } = require('chai');

const  generateRandomString = () => {
  var num = 1;
  return function(){
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result1= ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < num; i++ ) {
        result1 += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    num += 1;
    return result1;
  }

}
const generator = generateRandomString();

describe('Country model', () => {
  let pk = generator();

  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  it('Create country model', async () => {
    const country = await Country.create({
      id: pk,
      name: "PAPA",
      flag: "Some flag URL",
      continent: "PA",
      capital: "PO",
      subregion: "acvb",
      area: 3546,
      population: 3,
    })
    expect(country.dataValues.name).to.equal("PAPA");
  })
  it('find the require country', async () => {
    const country = await Country.findByPk(pk);

    expect(country.dataValues.id).to.equal(pk);
  })

});
