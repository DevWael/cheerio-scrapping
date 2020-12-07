const csvWriter = require('csv-write-stream');
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
var csvFilename = "nono.csv";
var json = [];

var url;

// If CSV file does not exist, create it and add the headers

var writer;


if (!fs.existsSync(csvFilename))
    writer = csvWriter({headers: ['URL','Name']});
else
    writer = csvWriter({sendHeaders: false});

for (var i = 1; i <= 43; i++) {
    url = 'https://www.amazon.sa/-/en/Mobile-Phones/b/?ie=UTF8&node=16966419031&page=' + i;
    request(url, function (error, response, html) {
        var $ = cheerio.load(html);
        var total = $('#mainResults .s-result-list li').length;
        $('#mainResults .s-result-list li').each(function (index, element) {
            var url = $(element).find('.a-link-normal').attr('href');
            // fs.appendFile('mobiles_ar.txt', url + "\n", function (err) {
            //     if (err) throw err;
            //     console.log('Saved!');
            // });

            // Append some data to CSV the file
            // console.log(index);
            writer = csvWriter({sendHeaders: false});
            if (url != undefined) {
                writer.pipe(fs.createWriteStream(csvFilename, {flags: 'a'}));
                writer.write({
                    URL: url,
                    Name : 'ahmad'
                });
                writer.end();
            }
        });

    });
}



