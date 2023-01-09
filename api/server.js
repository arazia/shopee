// const express = require('express');
// const crawl = require('./crawl.js');
import express from 'express';
import crawl from './crawl.js';
import bodyParser from 'body-parser';

const app = express(), port = 3080;

const products = [];

app.use(bodyParser.json());


app.get('/api/products', (req, res) => {
    res.json(products);
});

app.post('/api/product', (req, res) => {
    const product = req.body.product;
    const coles = crawl.getColesSearch(product);
    const woolworths = crawl.getWooliesSearch(product);
    info = [...coles, ...woolworths];
    res.json();
});

app.get('/', (req, res) => {
    res.send('GET Request Recieved');
})

app.listen(port, () => {
    console.log(`Listening on port::${port}`);
});

