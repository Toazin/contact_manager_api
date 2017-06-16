var app = require('express')();
var api = require('./api/api.js'); //Router!

//Initial Middlewares
require('./middlewares/initialMiddleware.js')(app);

//Main Routes
app.use('/api', api);

//Error Handler
app.use(require('./middlewares/errorHandlerMiddleware.js')());


module.exports = app;
