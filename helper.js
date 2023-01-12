const axios = require('axios');
const cheerio = require('cheerio');

const scrapeTruckItem = async (item) => {
  const id = item.attr('id');
  const titleEl = item.find('[data-testid="ad-title"]');
  const title = titleEl.text().trim() || undefined;
  const url = titleEl.find('a').attr('href').trim() || undefined;
  const price = item.find('[data-testid="financing-widget"]').parent().prev().text().trim() || undefined;  
  const meta = titleEl.siblings('div').children('ul');
  const productionDate = meta.children('li').eq(0).text().trim() || undefined;
  const mileage = meta.children('li').eq(1).text().trim() || undefined;
  const power = meta.children('li').eq(2).text().includes('cm3') ? meta.children('li').eq(2).text().trim(): undefined;

  // registration date is available at detail page
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  const registrationDate = $('span:contains("Pierwsza rejestracja")').next().text().trim() || undefined;

  return {
    id,
    title,
    url,
    price,
    registrationDate,
    productionDate,
    mileage,
    power
  }
}


const fetchListItem = async (item) => {
  console.log('scraping...')
  const id = item.attr('id');
  const url = item.find('[data-testid="ad-title"] a').attr('href').trim() || undefined;
  return { id, url };
}

module.exports = {
  scrapeTruckItem,
  fetchListItem,
}