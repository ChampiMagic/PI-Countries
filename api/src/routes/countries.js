const { Router } = require('express');
const axios = require('axios');
const { Country, Activity } = require('../db.js');

const router = Router();

async function DB() {
  return await Country.findAll({
    include: Activity,
  });
}


router.get('/',  async (req, res) => {

const { name } = req.query;



if(name){

  const allCountries = await DB();
  const reqCountries = allCountries.filter( country => country.name.toLowerCase().includes(name.toLowerCase()) )
  if(reqCountries.length){
    res.status(200).send(reqCountries);
  } else {
    res.status(404).send("Not Found");
  }


} else {
  try {

    const countries = await DB();

    res.status(200).send(countries);

  }catch(err) {
    res.send(err);
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
      if(country.id){
          res.status(200).send(country);
      } else {res.status(404).send("Not Found")}


  }catch(err) {
    res.statusCode(404).send(err.errors[0].message);
  }


})







module.exports = router;
