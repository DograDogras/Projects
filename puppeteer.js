const express = require('express');
const puppeteer = require('puppeteer');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const url = 'https://www.mercadolivre.com.br/p/MLB16086123';

app.get('/product', async (req, res) => {
    try {
        const browser = await puppeteer.launch({headless: true});
        const page = await browser.newPage();
        await page.goto(url);

        const name = await page.$eval('.ui-pdp-title', element => element.textContent.trim());
        const price = await page.$eval('.andes-money-amount', element => element.textContent.trim());
        const description = await page.$eval('.ui-pdp-description__content', element => element.textContent.trim());

        const productData = {
            Name: name,
            Price: price,
            Description: description
        };

        res = json(productData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
