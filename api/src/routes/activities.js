const { Router } = require('express');
const axios = require('axios');
const { Country, Activity } = require('../db.js');

const router = Router();

async function DB() {
  return await Activity.findAll();
}


router.get('/', async (req, res) => {

  try {

      const activities = await DB();

     res.status(201).send(activities);

  } catch(err){
    console.log(err);
  }


})


router.post('/', async (req, res) => {

  const { name, difficulty, duration, season, country } = req.body;

  try {
    const countrySelected = await Country.findAll({where: {name: country}})

    const activity = await Activity.create({
      name: name,
      difficulty: difficulty,
      duration: duration,
      season: season,
    })

    activity.addCountries(countrySelected);

    res.status(201).send(activity);
  } catch(err){
    console.log(err);
  }


})

module.exports = router;
