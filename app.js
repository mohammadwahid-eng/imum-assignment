const axios = require('axios');
const cheerio = require('cheerio');
const pretty = require('pretty');

const { getNextPageUrl } = require('./helper');

const initialUrl = 'https://www.otomoto.pl/ciezarowe/uzytkowe/mercedes-benz/q-actros?search%5Bfilter_enum_damaged%5D=0&search%5Border%5D=created_at+%3Adesc';

async function scrapeData() {
  try {
    const { data } = await axios.get(initialUrl);
    const $ = cheerio.load(data);
    const pagination = $('[data-testid="pagination-list"]');

    console.log(getNextPageUrl(pagination))
    
    // // Select all the list items in plainlist class
    // const listItems = $('.plainlist ul li');
    // // Stores data for all countries
    // const countries = [];
    // // Use .each method to loop through the li we selected
    // listItems.each((idx, el) => {
    //   // Object holding data for each country/jurisdiction
    //   const country = { name: '', iso3: '' };
    //   // Select the text content of a and span elements
    //   // Store the textcontent in the above object
    //   country.name = $(el).children('a').text();
    //   country.iso3 = $(el).children('span').text();
    //   // Populate countries array with country data
    //   countries.push(country);
    // });
    // // Logs countries array to the console
    // console.dir(countries);
    // // Write countries array in countries.json file
    // fs.writeFile('coutries.json', JSON.stringify(countries, null, 2), (err) => {
    //   if (err) {
    //     console.error(err);
    //     return;
    //   }
    //   console.log('Successfully written data to file');
    // });
  } catch (err) {
    console.error(err);
  }
}

scrapeData();