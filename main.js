//підключаємо модуль http
const http = require('http');
const { XMLParser, XMLBuilder} = require("fast-xml-parser");
const fs = require('fs');
//створюємо об'єкт сервера
const server = http.createServer((req, res) => {
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

res.writeHead(200, { 'Content-Type': 'application/xml' });
//завершуємо відповідь
res.end(xmlContent);

});

server.listen(8080, () => {
  console.log('Server has been started at 8080 port');
});
