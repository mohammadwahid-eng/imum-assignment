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

  return nextPageUrl;
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

const scrapeTruckItem = () => {
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
  getNextPageUrl,
  addItems,
  getTotalAdsCount,
  scrapeTruckItem,
}