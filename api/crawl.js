// const axios = require('axios');
// const cheerio = require('cheerio');
// const puppeteer = require('puppeteer');
import axios from 'axios';
import cheerio from 'cheerio';
import puppeteer from 'puppeteer';

const getColesSearch = async (search) => {
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
        
        return info;
}

const getWooliesSearch = async (search) => {
    const info = [];
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
        ignoreHTTPSErrors: true
    });

    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto('https://www.woolworths.com.au/');
    
    const searchBar = '#wx-headerSearch';
    await page.waitForSelector(searchBar);

    await page.$eval(searchBar, (el, search) => el.value = search, search);
    await page.click('.iconAct-Search')


    const pageSelector = 'div.paging-section > a:nth-last-child(2)';
    try {
        await page.waitForSelector(pageSelector, {timeout: 10000});
    } catch (e) {
        console.log(e);
        return;
    }

    const noPages = await page.evaluate(pageSelector => {
        return document.querySelector(pageSelector).textContent;  
        }, pageSelector);

    const url = await page.url();

    for (let x = 1; x <= noPages; ++x) {
        await page.goto(url+'&pageNumber='+x);
        console.log(url+'&pageNumber='+x);
        const dataSelector = 'div.shelfProductTile-information'
        try {
            await page.waitForSelector(dataSelector);
        } catch (e) {
            console.log(e);
            continue;
        }

        const data = await page.evaluate((dataSelector) => {
            return [...document.querySelectorAll(dataSelector)].map(product => {
                try {
                    return {
                        title: product?.querySelector('.shelfProductTile-descriptionLink').textContent,
                        price: Number(product?.querySelector('.price-dollars').textContent) + +((0.01*product?.querySelector('.price-cents').textContent).toFixed(2))
                    };
                } catch (e) {
                    console.log(e);
                }
                
            });
        }, dataSelector);
        
        info.push.apply(info, data);
    }

    await browser.close();
    return info;
}



// I don't know why but I cannot for the life of me find out why this doesn't work. Either axios is getting the wrong html or my css selector for cheerio is incorrect (how??)
// noPages will not display through console.log(), or debugging.
// const getWooliesSearch = async (search) => {
//     try {
//         const info = [];
//         const { data } = await axios.get('https://www.woolworths.com.au/shop/search/products?searchTerm='+search);
//         const $ = cheerio.load(data);
//         const noPages = $('div.paging-section > a:nth-last-child(2)').text();
//         for (let x = 1; x <= noPages; ++x) {
//             console.log('https://www.woolworths.com.au/shop/search/products?searchTerm='+search+'&pageNumber='+x);
//             const { data } = await axios.get('https://www.woolworths.com.au/shop/search/products?searchTerm='+search+'&pageNumber='+x);
//             const $ = cheerio.load(data);
//             const productCollection = $('div.shelfProductTile-information');
//             productCollection.each((index, el) => {
//                 const product = {title: '', price: ''};  
//                 product.title = $(el).find('.shelfProductTile-descriptionLink').text();
//                 product.price = Number($(el).find('.price-dollars').first().text()) + +((0.01*$(el).find('.price-cents').first().text()).toFixed(2));
//                 info.push(product);
//             });
//         }
    
//     fs.writeFile('src/frontend/data/woolworths.json', JSON.stringify(info, null, 2), (error) => {
//     if (error) {
//         console.log(error) 
//         return
//     }})
//     return info;
//     } catch (error) {
//         throw error;
//     }
// }
    

// searchTerm = 'apples';

// getColesSearch(searchTerm);
// getWooliesSearch(searchTerm);

export default {getColesSearch, getWooliesSearch};