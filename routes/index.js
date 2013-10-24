
global.commandList = new Array();

function Command(_name, _para){
	this.name = _name;
	this.para = _para;
}

exports.newcmd = function(req, res){
    var rawBody = req.rawBody;
    console.log(rawBody);
    var cmd = JSON.parse(rawBody);
    console.dir(cmd);
    console.log('newcmd =>');
    global.commandList.push(cmd);
    res.send();
    return;	
};

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};
exports.wsTest = function(req, res){
	res.render('wsTest');
};

/*
 * GET home page.
 */
// xml2js = require('xml2js');
// var net = require('net');
// var HOST = '172.16.180.10';
// // var HOST = '127.0.0.1';
// // var PORT = 6969;
// var PORT = 9005;
// var client = new net.Socket();
// var dataTemp = '';

// // var nodeList = new Array();
// // global.nodeList = nodeList;
// global.nodeList= new Array();

// var parserList = new Array();
// parserList['Soil Temperature Sensor'] = ParseNodeXml_SoilTemperatureSensor;
// parserList['eS1100 Soil Moisture Sensor v1'] = ParseNodeXml_SoilMoistureSensor;
// parserList['eS1201 Ambient Temperature and Humidity Sensor'] = ParseNodeXml_eS1201AmbientTemperatureAndHumiditySensor;
// parserList['ET22 Weather Sensor'] = ParseNodeXml_ET22WeatherSensor;
// parserList['default'] = ParseNodeXml_default;


// startTcpClient();
//****************************************************

function startTcpClient(){
	client = new net.Socket();
	client.connect(PORT, HOST, function() {

	    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
	    // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client 
	    // client.write('I am Chuck Norris!');

	});

	// Add a 'data' event handler for the client socket
	// data is what the server sent to this socket
	client.on('data', function(data) {
	    
	    // console.log('DATA: ' + data);
	     // global.wss.broadcast('broadcast => ' + data);
	    // Close the client socket completely
	    // client.destroy();
	    parseRawData(String(data));

		// updateNodeList(new Node({nodeId:'node1', temperature:11}));

	});
	client.on('error', function(error){
	    client.destroy();
		startTcpClient();
	});
	// Add a 'close' event handler for the client socket
	client.on('close', function() {
	    client.destroy();
	    console.log('Connection closed');
	    startTcpClient();
	});	
}


//****************************************************
function parseRawData(data){
	dataTemp += data;
	var index = dataTemp.lastIndexOf('</MotePacket>');
	if(index < 0) return;
	var strToParse = dataTemp.substring(0, index+13);
	dataTemp = dataTemp.substring(index+13);
	// console.log('strToParse => ' +strToParse);
	var sensors = strToParse.match(/\<MotePacket\>[\<\w\>\s\.\/]+\<\/MotePacket\>/g);
	if(sensors == null){
		// console.log('no packet is available !!!');
		return;
	} 
	// console.log('match result =>')
	// console.dir(sensors);
	for (var i = 0; i < sensors.length; i++) {
		var s = sensors[i];
		// console.log(s);
		ParseNodeXml(s, function(packetName, node){
			// console.dir(node);
			updateNodeList(node);
		});

	}	
}


function updateNodeList(node){
	if(node == null) return;

	if(findNode(node) != null){
		var b = findNode(node).update(node);
		if(true == b){
		// todo broadcast
		console.log('node update => ');
		var str = JSON.stringify([node]);
		console.log(str);
		broadcastNodeInfo(str);
		// console.log('********************************');
		// console.log(JSON.stringify(global.nodeList));
		}
	}else{
		global.nodeList.push(node);
		console.log('new node => ');
		var str = JSON.stringify([node]);
		console.log(str);
		broadcastNodeInfo(str);
		// todo broadcast		
		// console.log('********************************');
		// console.log(JSON.stringify(global.nodeList));
		// console.dir(global.nodeList);

	}
}
function broadcastNodeInfo(msg){
	var obj = {name:'nodes', content:msg};
	global.wss.broadcast(JSON.stringify(obj));
}
function findNode(node){
	for(var n in global.nodeList){
		if(global.nodeList[n].nodeId == node.nodeId){
			return global.nodeList[n];
		}
	}
	return null;
}



function Node(options){
	// console.log('Node => ')
    options = options || {};  
    for(var opt in options){
    	if(this.hasOwnProperty(opt)){
    		// console.log('Node has property ' + opt);
    		this[opt] = options[opt];
    		// console.log('Node property change to ' + options[opt]);
    	}else{
    		// console.log('Node has no property ' + opt);
	    	this[opt] = options[opt];
	    	// console.log('Node new property ' + opt + '\'s value is ' + options[opt]);
    	}
    }
}
// Node.prototype.update = function(node){
// 	var bUpdated = false;
// 	if(this.nodeId != node.nodeId) return;
// 	for(var p in node){
// 		// console.log('this:' + p + ' => ' + this[p]);
// 		// console.log('node:' + p + ' => ' + node[p]);
// 		if(!this.hasOwnProperty(p)){
// 			// console.log(p + '  updated  to ' + node[p]);
// 			this[p] = node[p];
// 		}else{
// 			if(p == 'nodeId') continue;
// 			if(this[p] != node[p]){
// 				// console.log(p + '  updated from ' + this[p] + ' to ' + node[p]);
// 				this[p] = node[p];
// 				bUpdated = true;
// 			}
// 		}
// 	}
// 	return bUpdated;
// }
function ParseNodeXml(xml,callback){
	var parser = new xml2js.Parser();
	 parser.parseString(xml, function (err, result) {
	 	if(err != null){
	 		return null;
	 	}
	 	var packetName = result.MotePacket.PacketName[0];
	 	if(parserList[packetName] != null){
		 	// 查找解析函数，返回Node给接收函数
		 	parserList[packetName](packetName, result.MotePacket.ParsedDataElement, function(node){
		 		callback(packetName, node);
		 	});
	 	}else{
	 		parserList['default'](packetName);
	 	}
    });
}
function ParseNodeXml_default(packetName, elements, callback){
		console.log('received packet ' + packetName);
	}
function ParseNodeXml_ET22WeatherSensor(packetName, elements, callback){
	    if(packetName != 'ET22 Weather Sensor') return;
	    if(elements == null) return;
	    var obj = new Object;

	    for (var i = 0; i < elements.length; i++) {
	    	var element = elements[i];
	    	// console.log(element.Name + ' => ' + element.ConvertedValue);
	    	if(element.Name == 'nodeId'){
	    		obj.nodeId = element.ConvertedValue[0];
	    	}
	    	if(element.Name == 'Temp'){
	    		obj.temperature = element.ConvertedValue[0];
	    	}
	    	if(element.Name == 'Humidity'){
	    		obj.humidity = element.ConvertedValue[0];
	    	}	
	    	if(element.Name == 'Solar'){
	    		obj.Solar = element.ConvertedValue[0];
	    	}	
	    	if(element.Name == 'WindAvg'){
	    		obj.WindAvg = element.ConvertedValue[0];
	    	}		
	    	if(element.Name == 'WindMax'){
	    		obj.WindMax = element.ConvertedValue[0];
	    	}	
	    	if(element.Name == 'WindDirAvg'){
	    		obj.WindDirAvg = element.ConvertedValue[0];
	    	}		  
	    	if(element.Name == 'RainRate'){
	    		obj.RainRate = element.ConvertedValue[0];
	    	}	
	    	if(element.Name == 'BP'){
	    		obj.BP = element.ConvertedValue[0];
	    	}		    		    	  		    	    	    	
	    	if(element.Name == 'RainTotal'){
	    		obj.RainTotal = element.ConvertedValue[0];
	    	}		    		    	  		    	    	    	
	    };
	    var node = new Node(obj);
	    // console.dir(node);
	    callback(node);
		// return node;
    // }
    // );			
}
function ParseNodeXml_eS1201AmbientTemperatureAndHumiditySensor(packetName, elements, callback){
    // ParseNodeXml(xml, function(packetName, elements){
	    // console.dir(elements);
	    if(packetName != 'eS1201 Ambient Temperature and Humidity Sensor') return;
	    if(elements == null) return;
	    var obj = new Object;

	    for (var i = 0; i < elements.length; i++) {
	    	var element = elements[i];
	    	// console.log(element.Name + ' => ' + element.ConvertedValue);
	    	if(element.Name == 'nodeId'){
	    		obj.nodeId = element.ConvertedValue[0];
	    	}
	    	if(element.Name == 'temperature'){
	    		obj.temperature = element.ConvertedValue[0];
	    	}
	    	if(element.Name == 'humidity'){
	    		obj.humidity = element.ConvertedValue[0];
	    	}	    	
	    };
	    var node = new Node(obj);
	    // console.dir(node);
	    callback(node);
		// return node;
    // });		
}
function ParseNodeXml_SoilMoistureSensor(packetName, elements, callback){
    // ParseNodeXml(xml, function(packetName, elements){
	    // console.dir(elements);
	    if(packetName != 'eS1100 Soil Moisture Sensor v1') return;
	    if(elements == null) return;
	    var obj = new Object;

	    for (var i = 0; i < elements.length; i++) {
	    	var element = elements[i];
	    	// console.log(element.Name + ' => ' + element.ConvertedValue);
	    	if(element.Name == 'nodeId'){
	    		obj.nodeId = element.ConvertedValue[0];
	    	}
	    	if(element.Name == 'soilMoisture'){
	    		obj.soilMoisture = element.ConvertedValue[0];
	    	}
	    };
	    var node = new Node(obj);
	    // console.dir(node);
	    callback(node);
		// return node;
    // });	
}
function ParseNodeXml_SoilTemperatureSensor(packetName, elements, callback){
    // ParseNodeXml(xml, function(packetName, elements){
	    // console.dir(elements);
	    if(packetName != 'Soil Temperature Sensor') return;
	    if(elements == null) return;
	    var obj = new Object;

	    for (var i = 0; i < elements.length; i++) {
	    	var element = elements[i];
	    	// console.log(element.Name + ' => ' + element.ConvertedValue);
	    	if(element.Name == 'nodeId'){
	    		obj.nodeId = element.ConvertedValue[0];
	    	}
	    	if(element.Name == 'temp'){
	    		obj.soilTemperature = element.ConvertedValue[0];
	    	}
	    };
	    var node = new Node(obj);
	    // console.dir(node);
	    callback(node);
		// return node;
    // });

}

