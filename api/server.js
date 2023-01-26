// const express = require('express');
// const crawl = require('./crawl.js');
import express from 'express';
import crawl from './crawl.js';
import bodyParser from 'body-parser';

const app = express(), port = 3080;

let products = [];

app.use(bodyParser.json());


app.get('/api/products', (req, res) => {
    console.log('api/products called');
    res.json(products);
});

app.post('/api/product', (req, res) => {
    const product = req.body.query;
    crawler(product);
    res.json('products updated');
});

app.get('/', (req, res) => {
    res.send('GET Request Recieved');
})

app.listen(port, () => {    
    console.log(`Listening on port::${port}`);  
});

const crawler = async (product) => {
    const coles = await crawl.getColesSearch(product);
    const woolworths = await crawl.getWooliesSearch(product);
    products = [...coles, ...woolworths];
}

