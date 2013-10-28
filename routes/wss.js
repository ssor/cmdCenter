

/**
 * 特性：
 * 支持ws和http，两者融合在一起
 * 进入的消息放到统一的消息堆栈中
 * 核心在于命令的消费:http方式提交的同时,提出消费类别;ws方式连接时提供消费类别
 * {msgType: 'pull|push|reg', content: '[cmds]'}
 */

var cmd = require('./cmd');
var WebSocketServer = require('ws').Server;
var wss;
var clients = [];

exports.startWssServer = function(httpServer){
  wss = new WebSocketServer({server : httpServer});

  wss.on('connection', function(ws){

  ws.cmdRegList = new Array();  
  clients.push(ws);

    ws.on('open', function(){
    });

    ws.on('message', function(msg){

      console.log('message => '+ msg);
      var json_cmd  = JSON.parse(msg);
      if(json_cmd.msgType == null) return;

      if(json_cmd.msgType == 'pull'){
        var jsonReturn = cmd.getcmds(json_cmd.name);
        ws.send(JSON.stringify(jsonReturn));

      }

      if(json_cmd.msgType == 'push'){
        var jsonReturn = cmd.newcmd(json_cmd);
        ws.send(JSON.stringify(jsonReturn));

      }

      if(json_cmd.msgType == 'reg'){
        ws.cmdRegList.push(json_cmd.name);
        var jsonReturn = cmd.getcmds(json_cmd);
        ws.send(JSON.stringify(jsonReturn));
      }

    });

    ws.on('close', function(){
      var index = clients.indexOf(ws);
      clients.splice(index, 1);
      console.log('close =>');
    });
    
  });
};

//查找该ws是否订阅了该名称的命令,如果订阅则将命令发送出去
exports.wss_broadcast = function(cmdName, json_data) {
    console.log('wss_broadcast => ' + cmdName);
    console.dir(json_data);
    var bConsumed = false;
    for(var i in clients){
        var client = clients[i];
        console.log('reg list => ');
        console.dir(client.cmdRegList);
        var bFinded = false;
        for(var key in client.cmdRegList){
          if(client.cmdRegList[key] == cmdName){
            bFinded = true; break;
          }
        }
        if(bFinded == true){
          bConsumed = true;
          client.send(JSON.stringify(json_data));
        }
    }
    return bConsumed;
};


