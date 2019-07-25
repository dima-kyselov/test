const request = require('request');
const moment = require('moment');


const getCurrencyByDay = (date) => {
    return new Promise((resolve, reject) => {
        const url = `https://api.privatbank.ua/p24api/exchange_rates?json&date=${date}`;
        request(url, (error, response, body) => {
            if (error) {
                console.error('error:', error);
                return reject('Connection error');
            }
            return resolve(JSON.parse(body));
        });
    });
};

exports.getCurrency7Days = async (req, res) => {
    const response = [];
    try {
        let currentDate = moment();
        for (i = 0; i < 7; i++) {
            let data = await getCurrencyByDay(currentDate.format('DD.MM.YYYY'));
            response.push(data);
            currentDate = currentDate.subtract(1, 'd');
        }
        res.status(200).send({ status: 200, response: response });
    } catch (error) {
        res.status(400).send({ status: 400, response: 'Connection error or user was not found' });
    }
};