const { Router } = require('express');
const axios = require('axios');
const { Country, Activity } = require('../db.js');

const router = Router();

async function DB() {
  return await Country.findAll();
}


router.get('/',  async (req, res) => {

const { name } = req.query;

if(name){

  const allCountries = await DB();
  const reqCountries = allCountries.filter( country => country.name.includes(name) )
  res.status(200).send(reqCountries);

} else {
  try {

    const countries = await DB();
    res.status(200).send(countries);

  }catch(err) {
    console.log(err)
  }

}

})

router.get('/:code',  async (req, res) => {
  const { code } = req.params;

  try {

    const country = await Country.findAll(
      {
        where: {
          id: code,
        },
        include: Activity,
      })
    res.send(country);

  }catch(err) {
    console.log(err)
  }


})







module.exports = router;
