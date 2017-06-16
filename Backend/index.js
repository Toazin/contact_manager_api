//Config
require('dotenv').config()

var app = require('./server/server.js');

app.listen(process.env.PORT, function () {
    console.log("Listening from: " + process.env.PORT);
})
