//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const axios = require('axios');
const { Country } = require('./src/db.js');
const removeAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

const start = async () => {
  try {
    const metaData = await axios.get('https://restcountries.com/v3.1/all');
    const data = metaData.data.map( e => {
      return {
        id: e.cca3,
        name: e.name.common,
        flag: e.flags.png,
        continent: e.continents,
        capital: e.capital,
        subregion: e.subregion,
        area: e.area,
        population: e.population,
      }
    })

    data.forEach( async (country) => {

      let capital;

  if(country.capital === undefined) {
    capital = "NoDataAvailable"

  } else {

  capital = removeAccents(country.capital[0])

  }


      await Country.create({
        id: country.id,
        name: country.name,
        flag: country.flag,
        continent: country.continent[0],
        capital: capital,
        subregion: country.subregion,
        area: country.area,
        population: country.population,
      })

    }) 

  } catch(err) {
    console.log(err)
  }
}

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(process.env.PORT, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
    start();
  });
});
