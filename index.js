require("dotenv").config();
var bot = require('./bot/bot');
require('./web')(bot);
