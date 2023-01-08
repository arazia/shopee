const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');

const getColesSearch = async (search) => {
    try {
        const info = [];
        const { data } = await axios.get('https://www.coles.com.au/search?q='+search);
        const $ = cheerio.load(data);
        const noPages = $('.coles-targeting-PaginationPaginationUl li:nth-last-child(2) > a').text();
        for (let x = 1; x <= noPages; ++x) {
            console.log('https://www.coles.com.au/search?q='+search+'&page='+x);
            const { data } = await axios.get('https://www.coles.com.au/search?q='+search+'&page='+x);
            const $ = cheerio.load(data);
            const productCollection = $('section[data-testid="product-tile"]');
            productCollection.each((index, element) => {
                const product = {title: '', price: ''};  
                product.title = $(element).find('.product__title').text();
                product.price = $(element).find('.price__value').first().text();
                info.push(product);
            });
        }
        
        fs.writeFile('src/frontend/data/coles.json', JSON.stringify(info, null, 2), (error) => {
        if (error) {
            console.log(error) 
            return
        }})
        return info;
    } catch (error) {
        throw error;
    }
}

const getWooliesSearch = async (search) => {
    try {
        const info = [];
    const { data } = await axios.get('https://www.coles.com.au/search?q='+search);
    const $ = cheerio.load(data);
    const noPages = $('div.paging-section > a:nth-last-child(2)').text();

    for (let x = 1; x <= noPages; ++x) {
        console.log('https://www.woolworths.com.au/shop/search/products?searchTerm='+search+'&pageNumber='+x);
        const { data } = await axios.get('https://www.coles.com.au/search?q='+search+'&pageNumber='+x);
        const $ = cheerio.load(data);
        const productCollection = $('div.shelfProductTile-information');
        productCollection.each((index, el) => {
            const product = {title: '', price: ''};  
            product.title = $(el).find('.shelfProductTile-descriptionLink').text();
            product.price = Number($(el).find('.price-dollars').first().text()) + +((0.01*$(el).find('.price-cents').first().text()).toFixed(2));
            info.push(product);
        });
    }
    
    fs.writeFile('src/frontend/data/woolworths.json', JSON.stringify(info, null, 2), (error) => {
    if (error) {
        console.log(error) 
        return
    }})
    return info;
    } catch (error) {
        throw error;
    }
}
    

searchTerm = 'apples';

getColesSearch(searchTerm);
getWooliesSearch(searchTerm);

