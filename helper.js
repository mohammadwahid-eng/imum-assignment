const baseUrl = 'https://www.otomoto.pl';

const getNextPageUrl = (pagination) => {
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

  return baseUrl + nextPageUrl;
}

const addItems = () => {
  return {
    url,
    id
  }
}

const getTotalAdsCount = () => {
  return 0;
}

const scrapeTruckItem = (item) => {
  const id = item.attr('id');
  const title = item.find(['[data-testid="ad-title"]']);
  console.log(title.html())
  return;
  // const id = 1;
  
  const price = 10;
  const registrationDate = '123';
  const productionDate = '4536';
  const mileage = 1;
  const power = 122;

  return {
    id,
    title,
    price,
    registrationDate,
    productionDate,
    mileage,
    power
  }
}

module.exports = {
  baseUrl,
  getNextPageUrl,
  addItems,
  getTotalAdsCount,
  scrapeTruckItem,
}