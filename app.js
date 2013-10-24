

/**
 * 特性：
 * 支持ws和http，两者融合在一起
 * 进入的消息放到统一的消息堆栈中
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();
var server = http.createServer(app);
var WebSocketServer = require('ws').Server;
global.wss = new WebSocketServer({server : server});
var clients = [];
global.wss.broadcast = function(data) {
    for(var i in this.clients)
        this.clients[i].send(data);
};

wss.on('connection', function(ws){
clients.push(ws);

    console.log('connected');
    var obj = {name:'nodes', content:JSON.stringify(global.nodeList)};
    var str = JSON.stringify(obj);
    console.log(str);
    ws.send(str);
    obj = {name:'nodeDes', content:JSON.stringify(nodeDesList)};
    ws.send(JSON.stringify(obj));

  ws.on('open', function(){
    // console.log('connected');
    // var obj = {name:'nodes', content:JSON.stringify(global.nodeList)};
    // var str = JSON.stringify(obj);
    // console.log(str);
    // ws.send(str);
  });
  ws.on('message', function(msg){
    console.log('message => '+ msg);
    // var objMsg  = JSON.parse(msg);
    // if(objMsg.name == 'nodeDes'){

    // }
    // wss.broadcast('broadcast => ' + msg);
  });
  ws.on('close', function(){
    var index = clients.indexOf(ws);
    clients.splice(index, 1);
    console.log('close =>');
  });
  
});
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
// app.get('/wsTest', routes.wsTest);

// app.get('/users', user.list);


server.listen(app.get('port'), function(){
  console.log('Command Center listening on port ' + app.get('port'));
});
