const axios = require('axios');
const cheerio = require('cheerio');
const Scraper = require('./scraper.class');

const page = new Scraper('https://www.otomoto.pl/ciezarowe/uzytkowe/mercedes-benz/q-actros?search%5Bfilter_enum_damaged%5D=0&search%5Border%5D=created_at+%3Adesc');

console.log('processing...')

async function scrapAds(url) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const nextPageUrl = await page.getNextPageUrl($);
    await page.fetchAdItems($)
    
    if(nextPageUrl) await scrapAds(nextPageUrl);

  } catch(error) {
    // console.error('scrapAds', error);
  }
  return false;
}

scrapAds(page.baseUrl).then(async () => {
  const items = page.adItems();
  for(const ad of items) {
    try {
      const { data } = await axios.get(ad.url);
      const $ = cheerio.load(data);
      const truck = await page.scrapeTruckItem($);
      console.log(truck);
    } catch(error) {
      // console.error(error)
    }
  }
  console.log('Total ads', page.getTotalAdsCount());
});