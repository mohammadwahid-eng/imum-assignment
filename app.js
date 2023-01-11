const axios = require('axios');
const cheerio = require('cheerio');
const pretty = require('pretty');

const { baseUrl, getNextPageUrl, scrapeTruckItem } = require('./helper');

const initialUrl = baseUrl + '/ciezarowe/uzytkowe/mercedes-benz/q-actros?search%5Bfilter_enum_damaged%5D=0&search%5Border%5D=created_at+%3Adesc';

const ads = [];

async function scrapeAds(url) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const pagination = $('[data-testid="pagination-list"]');
    const nextPage = getNextPageUrl(pagination);
    
    const listItems = $('article[data-testid="listing-ad"]');
    const item = $(listItems[0]);
    const id = item.attr('id');
    const title = item.find('[data-testid="ad-title"]');
    const price = item.find('[data-testid="financing-widget"]');
    const registrationDate = item.find('[data-testid^="ad-newer-date-"]');
    console.log(id);
    console.log(title.text());
    console.log(price.attr('data-price'));
    console.log(registrationDate.text());
    // listItems.each((i, el) => {
    //   const item = $(el);
    //   const data = scrapeTruckItem(item);
    //   console.log(data);
    // });
    
    if(!nextPage) return false;

    // await scrapeAds(nextPage);
  } catch(error) {
    console.error(error);
  }

  return false;
}

scrapeAds(initialUrl);