#don-express

Express helpers for the don.js templating library

    npm install don-express

A contrived example:

###app.js

```javascript
var fs           = require('fs');
var express      = require('express');
var app          = express();

var don          = require('don');
var donExpress   = require('don-express')(app, fs, don, __dirname + '/views');

app.use(donExpress.renderer);

app.get('/', function (req, res) {
    res.locals.title = 'Hello';
    res.locals.text  = 'World';
    res.render('layout', { partials: { content: 'inner' }});
});

app.listen(3000);
```
    
###views/layout.js

```javascript
module.exports = function (data) {
    return ['html',
        ['head',
            ['title', data.title]],
        ['body',  
            ['h1', data.title],
            data.content && data.content(data)]];
};
```

###views/inner.js

```javascript
module.exports = function (data) {
    return ['p', data.text];
};
```
