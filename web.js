const express     = require('express')
const packageInfo = require('./package.json')
const bodyParser  = require('body-parser')
const app = express()
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.json({ version: packageInfo.version })
});

const server = app.listen(process.env.PORT, ((process.env.NODE_ENV == "development") ? "127.0.0.1" : "0.0.0.0") , () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Web server started at http://%s:%s', host, port);
});

module.exports = bot => {
  app.post(`/${bot.token}`, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
  });
};
