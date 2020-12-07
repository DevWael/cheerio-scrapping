const cheerio = require('cheerio');
const axios = require('axios');
const util = require('util');
const setTimeoutPromise = util.promisify(setTimeout);
const { writeFileSync } = require('fs');

const data = [];

(async () => {
    for (var i = 1; i <= 43; i++) {
        const url = 'https://www.amazon.sa/-/ar/Mobile-Phones/b/?ie=UTF8&node=16966419031&page=' + i;
        

        // const $ = cheerio.load(html);
        // $('#mainResults .s-result-list li').each(function (index, element) {
        //     data.push(
        //         $(element).find('.a-link-normal').attr('href')
        //     );
        // });

        await setTimeoutPromise(5000).then(async (value) => {
            const { data: html } = await axios.get(url);
            const $ = cheerio.load(html);
            $('#mainResults .s-result-list li').each(function (index, element) {
                data.push(
                    $(element).find('.a-link-normal').attr('href')
                );
            });
            console.log('COMPLETED', i);
        });

        
    }

    writeFileSync('./mobiles_ss.json', JSON.stringify(data));
})();
