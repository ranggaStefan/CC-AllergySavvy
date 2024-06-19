const axios = require('axios');
const csv = require('csv-parser');

// const stream = require('stream');

const loadCsvData = async (url) => {
    const results = [];
    
    const response = await axios.get(url, {
        method: 'get',
        url: url,
        responseType: 'stream'
    });

    return new Promise((resolve, reject) => {
        response.data
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                resolve(results);
    
            })
            .on('error', (error) => {
                reject(error);
            });
    });
};

const loadIngredientsCsvData = async (url) => {
    const results = [];
    
    const response = await axios.get(url, {
        method: 'get',
        url: url,
        responseType: 'stream'
    });

    return new Promise((resolve, reject) => {
        response.data
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                resolve(results);
    
            })
            .on('error', (error) => {
                reject(error);
            });
    });
};

module.exports = { loadCsvData, loadIngredientsCsvData }
