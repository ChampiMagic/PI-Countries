const { Router } = require('express');
const axios = require('axios');
const { Country, Activity } = require('../db.js');

const router = Router();

router.post('/', async (req, res) => {

  const { name, difficulty, duration, season, country } = req.body;

  try {
    const countrySelected = await Country.findOne({where: {name: country}})

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
