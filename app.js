const axios = require('axios');
const cheerio = require('cheerio');

const { fetchListItem } = require('./helper');

const initialUrl = 'https://www.otomoto.pl/ciezarowe/uzytkowe/mercedes-benz/q-actros?search%5Bfilter_enum_damaged%5D=0&search%5Border%5D=created_at+%3Adesc';

const ads = [];

function adItems() {
  return ads;
}

function getTotalAdsCount() {
  return ads.length;
}

async function getNextPageUrl(origin, pagination) {
  const nextPage = pagination.find('[data-testid="pagination-step-forwards"]');
  if(nextPage.hasClass('pagination-item__disabled')) return null;

  const currentPage = pagination.find('.pagination-item__active a');
  const currentPageUrl = currentPage.attr('href');
  const currentPageNumber = parseInt(currentPage.text());
  
  let nextPageUrl = undefined;
  
  if(currentPageUrl.includes('page=')) {
    nextPageUrl = currentPageUrl.replace(`page=${currentPageNumber}`, `page=${currentPageNumber + 1}`);
  } else {
    nextPageUrl = `${currentPageUrl}&page=${currentPageNumber + 1}`;
  }

  return origin + nextPageUrl;
}

async function scrapeList(url) {
  try {
    console.log('scraping...')
    const tempUrl = new URL(url);
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const pagination = $('[data-testid="pagination-list"]');
    const nextPage = await getNextPageUrl(tempUrl.origin, pagination);
    const listItems = $('article[data-testid="listing-ad"]');

    listItems.each(async (i, el) => {

      // fetch item id and url
      const ad = await fetchListItem($(el));
      if(!ads.some(item => item.id === ad.id)) {
        ads.push(ad);
      }

    });
    
    if(!nextPage) return false;

    await scrapeList(nextPage);

  } catch(error) {
    console.error(error);
  }
}

scrapeList(initialUrl).then(() => {
  console.log("Unique adItems ID and URL", adItems())
  console.log("Total Ads", getTotalAdsCount())
});