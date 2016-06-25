var express = require('express');
var request = require('request');
var path = require('path');

var WebpackDevMiddleware = require('webpack-dev-middleware');
var WebpackHotMiddlware = require('webpack-hot-middleware');
var webpack = require('webpack');
var config = require('./webpack.config');
var compiler = webpack(config);



var app = express();

app.use(express.static(__dirname + '/build'));

app.use(WebpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    noInfo: false,
    quite: false,
    stats: {colors: true}
}));

app.use(WebpackHotMiddlware(compiler, {
    log: console.log
}))



app.use('/api', function(req, res) {
    console.log("request coming: " + req.url);
    var url = "http://api.apnavaidya.com/" + req.url;
    req.pipe(request(url)).pipe(res);
});

app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'build/index.html'));
});

app.listen(process.env.PORT || 3000);