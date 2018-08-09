const express = require('express');
const packageInfo = require('./package.json');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({ version: packageInfo.version });
});

<<<<<<< HEAD
const server = app.listen(process.env.PORT, "127.0.0.1", () => {
=======
const server = app.listen(process.env.PORT, "0.0.0.0", () => {
>>>>>>> df7274a7bddc869ba9c1821cdc07a30688612e01
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
