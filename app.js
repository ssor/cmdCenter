

/**
 * 特性：
 * 支持ws和http，两者融合在一起
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var cmd = require('./routes/cmd');
var wssModule = require('./routes/wss');

var app = express();
var server = http.createServer(app);
wssModule.startWssServer(server);

// all environments
app.set('port', process.env.PORT || 3003);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(function(req, res, next) {
    var data = '';
    req.setEncoding('utf8');
    req.on('data', function(chunk) { 
        data += chunk;
        console.log(data);
    });
    req.on('end', function() {
        req.rawBody = data;
    });
    next();
});
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.wsTest);
app.post('/newcmd', routes.newcmd);
app.post('/getcmds', routes.getcmds);
// app.get('/wsTest', routes.wsTest);

// app.get('/users', user.list);
// cmd.say('I am in App saying');

server.listen(app.get('port'), function(){
  console.log('Command Center listening on port ' + app.get('port'));
});
