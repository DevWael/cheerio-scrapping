const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

var title, release, rating;
var json = {
    title: "",
    release: "",
    rating: "",
};

var url;

const app = express();
app.listen(5000, function () {
    // console.log('welcome');
});

app.get('/scrape', (req, res) => {
    url = 'https://www.imdb.com/title/tt0107290';
    request(url, function (error, response, html) {
        var $ = cheerio.load(html);
        //console.log(html);
        $('.title_wrapper').filter(function () {
            var data = $(this);
            title = data.children().first().text();
            json.title = title.trim();
        });

        $('#titleYear').filter(function () {
            var data = $(this);
            release = data.children().first().text();
            json.release = release;
        });

        $('.ratingValue strong').filter(function () {
            var data = $(this);
            rating = data.children().first().text();
            json.rating = rating;
        });

        //write the json file

        fs.writeFile('result.json',JSON.stringify(json,null,4),function (error){
            console.log('success');
        })

        res.send('success');

    });
});
