//require('!style!css!sass!./main.scss');
require('./main.scss');
var sub = require('./sub');
var app  = document.createElement('div');
app.innerHTML = '<h1>Hello World haha</h1>';
app.appendChild(sub());
document.body.appendChild(app);