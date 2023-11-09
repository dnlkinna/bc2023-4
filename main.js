const { XMLParser, XMLBuilder} = require("fast-xml-parser");
const fs = require('fs');

const xmlData = fs.readFileSync('data.xml', 'utf8');

const parser = new XMLParser();
var jObj = parser.parse(xmlData);
const exchange = [];

jObj.exchange.currency.forEach(element => {
    exchange.push({
        date: element.exchangedate,
        rate: element.rate
    })
});
const data = {
    data: {
        exchange: exchange
    }
}
const xmlOptions = {
    format: true,
  };
const builder = new XMLBuilder(xmlOptions);
const xmlContent = builder.build(data);
console.log(xmlContent);