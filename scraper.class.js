class Scraper {
  ads = [];
  
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getNextPageUrl($) {
    const nextPage = $('[data-testid="pagination-step-forwards"]');
    if(nextPage.hasClass('pagination-item__disabled')) return null;
  
    const currentPage = $('.pagination-item__active a');
    const currentPageUrl = currentPage.attr('href');
    const currentPageNumber = parseInt(currentPage.text());
    
    let nextPageUrl = undefined;
    
    if(currentPageUrl.includes('page=')) {
      nextPageUrl = currentPageUrl.replace(`page=${currentPageNumber}`, `page=${currentPageNumber + 1}`);
    } else {
      nextPageUrl = `${currentPageUrl}&page=${currentPageNumber + 1}`;
    }
  
    return new URL(this.baseUrl).origin + nextPageUrl;
  }

  async fetchAdItems($) {
    const listItems = $('article[data-testid="listing-ad"]');
    listItems.each(async (i, el) => {
      const id = $(el).attr('id');
      const url = $(el).find('[data-testid="ad-title"] a').attr('href').trim() || undefined;
      const ad = { id, url };
      if(!this.ads.some(item => item.id === ad.id)) this.ads.push(ad);
    });
  }

  adItems() {
    return this.ads;
  }

  getTotalAdsCount() {
    return this.ads.length;
  }

  async scrapeTruckItem($) {
    const id = $('span#ad_id').first().text().trim();
    const title = $('.offer-title').first().text().trim();
    const priceCurrency = $('.offer-price__currency').first().text();
    $('.offer-price__currency').remove();
    const priceNumber = $('.offer-price__number').first().text().trim();
    const price = priceNumber + ' ' + priceCurrency;
    const registrationDate = $('#parameters span:contains("Pierwsza rejestracja")').next().text().trim() || undefined;
    const productionDate = $('#parameters span:contains("Rok produkcji")').next().text().trim() || undefined;
    const mileage = $('#parameters span:contains("Przebieg")').next().text().trim() || undefined;
    const power = $('#parameters span:contains("Moc")').next().text().trim() || undefined;

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
}

module.exports = Scraper;