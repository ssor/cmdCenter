require("should");
xml2js = require('xml2js');

function repeat(options) {  
    options = options || {};  
    for (var opt in (repeat.defaultOptions || {})) {  
        if (!(opt in options)) {  
            options[opt] = repeat.defaultOptions[opt];  
        }  
    }  
    for (var index = 0; index < options.times; ++index) {  
        console.log(options.rant);  
    }  
}  
repeat.defaultOptions = { times: 2, rant : 'IE6 must die!' };  




// eS1100 Soil Moisture Sensor v1
var eS1100_Soil_Temperature_Sensor_Xml = "Packet><?xml version=\"1.0\" ?><MotePacket><PacketName>Soil Temperature Sensor</PacketName><NodeId>4.000000</NodeId><Port>2.000000</Port><ParsedDataElement><Name>amType</Name><ConvertedValue>11</ConvertedValue><ConvertedValueType>uint8</ConvertedValueType></ParsedDataElement><ParsedDataElement><Name>group</Name><ConvertedValue>83</ConvertedValue><ConvertedValueType>uint8</ConvertedValueType></ParsedDataElement><ParsedDataElement><Name>nodeId</Name><SpecialType>nodeid</SpecialType><ConvertedValue>32778</ConvertedValue><ConvertedValueType>uint16</ConvertedValueType></ParsedDataElement><ParsedDataElement><Name>socketId</Name><ConvertedValue>52</ConvertedValue><ConvertedValueType>uint8</ConvertedValueType></ParsedDataElement><ParsedDataElement><Name>boardId</Name><SpecialType>sensorboardid</SpecialType><ConvertedValue>188</ConvertedValue><ConvertedValueType>uint8</ConvertedValueType></ParsedDataElement><ParsedDataElement><Name>packetId</Name><ConvertedValue>0</ConvertedValue><ConvertedValueType>uint8</ConvertedValueType></ParsedDataElement><ParsedDataElement><Name>temp</Name><ConvertedValue>24.062500</ConvertedValue><ConvertedValueType>float</ConvertedValueType></ParsedDataElement><internal><nodeId>32778.000000</nodeId><sensorDeviceParentNodeId>4.000000</sensorDeviceParentNodeId><sensorDeviceSubAddress>2.000000</sensorDeviceSubAddress><sensorDeviceSensorId>188.000000</sensorDeviceSensorId><sensorTable>eS1500_sensor_results</sensorTable></internal></MotePacket>";
var eS1100_Soil_Moisture_Sensor_xml = "<?xml version=\"1.0\" ?><MotePacket><PacketName>eS1100 Soil Moisture Sensor v1</PacketName><NodeId>4.000000</NodeId><Port>1.000000</Port><ParsedDataElement><Name>amType</Name><ConvertedValue>11</ConvertedValue><ConvertedValueType>uint8</ConvertedValueType></ParsedDataElement><ParsedDataElement><Name>group</Name><ConvertedValue>83</ConvertedValue><ConvertedValueType>uint8</ConvertedValueType></ParsedDataElement><ParsedDataElement><Name>nodeId</Name><SpecialType>nodeid</SpecialType><ConvertedValue>32777</ConvertedValue><ConvertedValueType>uint16</ConvertedValueType></ParsedDataElement><ParsedDataElement><Name>socketId</Name><ConvertedValue>52</ConvertedValue><ConvertedValueType>uint8</ConvertedValueType></ParsedDataElement><ParsedDataElement><Name>boardId</Name><SpecialType>sensorboardid</SpecialType><ConvertedValue>23</ConvertedValue><ConvertedValueType>uint8</ConvertedValueType></ParsedDataElement><ParsedDataElement><Name>packetId</Name><ConvertedValue>0</ConvertedValue><ConvertedValueType>uint8</ConvertedValueType></ParsedDataElement><ParsedDataElement><Name>soilMoisture</Name><ConvertedValue>0.338956</ConvertedValue><ConvertedValueType>float</ConvertedValueType></ParsedDataElement><internal><nodeId>32777.000000</nodeId><sensorDeviceParentNodeId>4.000000</sensorDeviceParentNodeId><sensorDeviceSubAddress>1.000000</sensorDeviceSubAddress><sensorDeviceSensorId>23.000000</sensorDeviceSensorId><sensorTable>eS1100_sensor_results</sensorTable></internal></MotePacket>";
var ES1201AmbientTemperatureAndHumiditySensor_xml = "<?xml version=\"1.0\" ?><MotePacket><PacketName>eS1201 Ambient Temperature and Humidity Sensor</PacketName><NodeId>6.000000</NodeId><Port>4.000000</Port><ParsedDataElement><Name>amType</Name><ConvertedValue>11</ConvertedValue><ConvertedValueType>uint8</ConvertedValueType></ParsedDataElement><ParsedDataElement><Name>group</Name><ConvertedValue>83</ConvertedValue><ConvertedValueType>uint8</ConvertedValueType></ParsedDataElement><ParsedDataElement><Name>nodeId</Name><SpecialType>nodeid</SpecialType><ConvertedValue>32775</ConvertedValue><ConvertedValueType>uint16</ConvertedValueType></ParsedDataElement><ParsedDataElement><Name>socketId</Name><ConvertedValue>52</ConvertedValue><ConvertedValueType>uint8</ConvertedValueType></ParsedDataElement><ParsedDataElement><Name>boardId</Name><SpecialType>sensorboardid</SpecialType><ConvertedValue>17</ConvertedValue><ConvertedValueType>uint8</ConvertedValueType></ParsedDataElement><ParsedDataElement><Name>packetId</Name><ConvertedValue>0</ConvertedValue><ConvertedValueType>uint8</ConvertedValueType></ParsedDataElement><ParsedDataElement><Name>temperature</Name><ConvertedValue>31.830000</ConvertedValue><ConvertedValueType>float</ConvertedValueType></ParsedDataElement><ParsedDataElement><Name>humidity</Name><ConvertedValue>43.816799</ConvertedValue><ConvertedValueType>float</ConvertedValueType></ParsedDataElement><ParsedDataElement><Name>dewPoint</Name><ConvertedValue>17.977972</ConvertedValue><ConvertedValueType>float</ConvertedValueType></ParsedDataElement><internal><nodeId>32775.000000</nodeId><sensorDeviceParentNodeId>6.000000</sensorDeviceParentNodeId><sensorDeviceSubAddress>4.000000</sensorDeviceSubAddress><sensorDeviceSensorId>17.000000</sensorDeviceSensorId><sensorTable>eS1201_sensor_results</sensorTable></internal></MotePacket>";
var ET22_Weather_Sensor_xml = "<?xml version=\"1.0\" ?><MotePacket><PacketName>ET22 Weather Sensor</PacketName><NodeId>7.000000</NodeId><Port>4.000000</Port><ParsedDataElement><Name>amType</Name><ConvertedValue>11</ConvertedValue><ConvertedValueType>uint8</ConvertedValueType></ParsedDataElement><ParsedDataElement><Name>group</Name><ConvertedValue>83</ConvertedValue><ConvertedValueType>uint8</ConvertedValueType></ParsedDataElement><ParsedDataElement><Name>nodeId</Name><SpecialType>nodeid</SpecialType><ConvertedValue>32770</ConvertedValue><ConvertedValueType>uint16</ConvertedValueType></ParsedDataElement><ParsedDataElement><Name>socketId</Name><ConvertedValue>52</ConvertedValue><ConvertedValueType>uint8</ConvertedValueType></ParsedDataElement><ParsedDataElement><Name>boardId</Name><SpecialType>sensorboardid</SpecialType><ConvertedValue>22</ConvertedValue><ConvertedValueType>uint8</ConvertedValueType></ParsedDataElement><ParsedDataElement><Name>packetId</Name><ConvertedValue>0</ConvertedValue><ConvertedValueType>uint8</ConvertedValueType></ParsedDataElement><ParsedDataElement><Name>WindLastCnt</Name><ConvertedValue>2</ConvertedValue><ConvertedValueType>uint16</ConvertedValueType></ParsedDataElement><ParsedDataElement><Name>WindMaxCnt</Name><ConvertedValue>4</ConvertedValue><ConvertedValueType>uint16</ConvertedValueType></ParsedDataElement><ParsedDataElement><Name>WindSampleCnt</Name><ConvertedValue>565</ConvertedValue><ConvertedValueType>uint16</ConvertedValueType></ParsedDataElement><ParsedDataElement><Name>DirLastCnt</Name><ConvertedValue>799</ConvertedValue><ConvertedValueType>uint16</ConvertedValueType></ParsedDataElement><ParsedDataElement><Name>DirSampleCnt</Name><ConvertedValue>730</ConvertedValue><ConvertedValueType>uint16</ConvertedValueType></ParsedDataElement><ParsedDataElement><Name>RainSampleCnt</Name><ConvertedValue>0</ConvertedValue><ConvertedValueType>uint16</ConvertedValueType></ParsedDataElement><ParsedDataElement><Name>RainTotalCnt</Name><ConvertedValue>1300</ConvertedValue><ConvertedValueType>uint16</ConvertedValueType></ParsedDataElement><ParsedDataElement><Name>TimerCnt</Name><ConvertedValue>489</ConvertedValue><ConvertedValueType>uint16</ConvertedValueType></ParsedDataElement><ParsedDataElement><Name>TempCnt</Name><ConvertedValue>6316</ConvertedValue><ConvertedValueType>uint16</ConvertedValueType></ParsedDataElement><ParsedDataElement><Name>HumidityCnt</Name><ConvertedValue>1940</ConvertedValue><ConvertedValueType>uint16</ConvertedValueType></ParsedDataElement><ParsedDataElement><Name>SolarCnt</Name><ConvertedValue>279</ConvertedValue><ConvertedValueType>uint16</ConvertedValueType></ParsedDataElement><ParsedDataElement><Name>UVCnt</Name><ConvertedValue>1023</ConvertedValue><ConvertedValueType>uint16</ConvertedValueType></ParsedDataElement><ParsedDataElement><Name>AdcRefCnt</Name><ConvertedValue>391</ConvertedValue><ConvertedValueType>uint16</ConvertedValueType></ParsedDataElement><ParsedDataElement><Name>BPCnt</Name><ConvertedValue>10104</ConvertedValue><ConvertedValueType>uint16</ConvertedValueType></ParsedDataElement><ParsedDataElement><Name>TempIntCnt</Name><ConvertedValue>275</ConvertedValue><ConvertedValueType>uint16</ConvertedValueType></ParsedDataElement><ParsedDataElement><Name>WindLast</Name><ConvertedValue>3.621024</ConvertedValue><ConvertedValueType>float</ConvertedValueType></ParsedDataElement><ParsedDataElement><Name>WindMax</Name><ConvertedValue>7.242048</ConvertedValue><ConvertedValueType>float</ConvertedValueType></ParsedDataElement><ParsedDataElement><Name>WindAvg</Name><ConvertedValue>2.091900</ConvertedValue><ConvertedValueType>float</ConvertedValueType></ParsedDataElement><ParsedDataElement><Name>WindDir</Name><ConvertedValue>281.173035</ConvertedValue><ConvertedValueType>float</ConvertedValueType></ParsedDataElement><ParsedDataElement><Name>WindDirAvg</Name><ConvertedValue>256.891510</ConvertedValue><ConvertedValueType>float</ConvertedValueType></ParsedDataElement><ParsedDataElement><Name>Rain</Name><ConvertedValue>0.000000</ConvertedValue><ConvertedValueType>float</ConvertedValueType></ParsedDataElement><ParsedDataElement><Name>RainRate</Name><ConvertedValue>0.000000</ConvertedValue><ConvertedValueType>float</ConvertedValueType></ParsedDataElement><ParsedDataElement><Name>RainTotal</Name><ConvertedValue>33.020000</ConvertedValue><ConvertedValueType>float</ConvertedValueType></ParsedDataElement><ParsedDataElement><Name>Temp</Name><ConvertedValue>23.410000</ConvertedValue><ConvertedValueType>float</ConvertedValueType></ParsedDataElement><ParsedDataElement><Name>Humidity</Name><ConvertedValue>64.031921</ConvertedValue><ConvertedValueType>float</ConvertedValueType></ParsedDataElement><ParsedDataElement><Name>Solar</Name><ConvertedValue>523.416077</ConvertedValue><ConvertedValueType>float</ConvertedValueType></ParsedDataElement><ParsedDataElement><Name>BP</Name><ConvertedValue>1010.400024</ConvertedValue><ConvertedValueType>float</ConvertedValueType></ParsedDataElement><ParsedDataElement><Name>TempInt</Name><ConvertedValue>27.500000</ConvertedValue><ConvertedValueType>float</ConvertedValueType></ParsedDataElement><ParsedDataElement><Name>DewPoint</Name><ConvertedValue>16.210352</ConvertedValue><ConvertedValueType>float</ConvertedValueType></ParsedDataElement><internal><nodeId>32770.000000</nodeId><sensorDeviceParentNodeId>7.000000</sensorDeviceParentNodeId><sensorDeviceSubAddress>4.000000</sensorDeviceSubAddress><sensorDeviceSensorId>22.000000</sensorDeviceSensorId><sensorTable>eS2000_sensor_results</sensorTable></internal></MotePacket>";
var totalSensor_xml = eS1100_Soil_Temperature_Sensor_Xml + eS1100_Soil_Moisture_Sensor_xml + ES1201AmbientTemperatureAndHumiditySensor_xml+ ET22_Weather_Sensor_xml;

var parserList = new Array();
parserList['Soil Temperature Sensor'] = ParseNodeXml_SoilTemperatureSensor;
parserList['eS1100 Soil Moisture Sensor v1'] = ParseNodeXml_SoilMoistureSensor;
parserList['eS1201 Ambient Temperature and Humidity Sensor'] = ParseNodeXml_eS1201AmbientTemperatureAndHumiditySensor;
parserList['ET22 Weather Sensor'] = ParseNodeXml_ET22WeatherSensor;

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
Node.prototype.update = function(node){
	var bUpdated = false;
	if(this.nodeId != node.nodeId) return;
	for(var p in node){
		// console.log('this:' + p + ' => ' + this[p]);
		// console.log('node:' + p + ' => ' + node[p]);
		if(!this.hasOwnProperty(p)){
			// console.log(p + '  updated  to ' + node[p]);
			this[p] = node[p];
		}else{
			if(p == 'nodeId') continue;
			if(this[p] != node[p]){
				// console.log(p + '  updated from ' + this[p] + ' to ' + node[p]);
				this[p] = node[p];
				bUpdated = true;
			}
		}
	}
	return bUpdated;
}
function updateNode(node){
	if(node == null) return;
	if(nodeList[node.nodeId] != null){
		
	}else{
		nodeList[node.nodeId] = node;
	}
}

function ParseNodeXml(xml,callback){
	var parser = new xml2js.Parser();
	 parser.parseString(xml, function (err, result) {
	 	// console.dir(err);
	 	if(err != null){
	 		return null;
	 	}
	 	var packetName = result.MotePacket.PacketName[0];
        // console.dir(result);
        // console.dir(result.MotePacket.PacketName[0]);
        // console.log('MotePacket->ParsedDataElement');
        // console.dir(result.MotePacket.ParsedDataElement);
	 	// callback(result.MotePacket.PacketName[0], result.MotePacket.ParsedDataElement);
	 	// 查找解析函数，返回Node给接收函数
	 	parserList[packetName](packetName, result.MotePacket.ParsedDataElement, function(node){
	 		callback(packetName, node);
	 	});
    });
	// return null;	
}
function ParseNodeXml_ET22WeatherSensor(packetName, elements, callback){
    // ParseNodeXml(xml, function(packetName, elements){
	    // console.dir(elements);
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



describe('demo test => ', function(){
	it('named para test =>', function(){
		// console.log('弹出两个与IE6有关的对话框');
		// repeat(); //   
		// console.log('弹出3个与IE6有关的对话框');
		// repeat({ times: 3 }); //   
		// console.log('弹出两个与Flash有关的对话框');
		// repeat({ times: 2, rant: 'Flash must die!' });
		var strs=[];
		 strs['str1'] = 'str1'; 			
		 strs['str2'] = 'str2';
		console.log('str1 => ' + strs['str1']); 			
		(strs['str3'] == null).should.be.true; 			
		console.log('str3 => ' + strs['str3']);
	});
	it("Node =>", function(){
		var node = new Node();
		// node = new Node({nodeId:'id001'});
		// console.dir(node);
		// (node.nodeId == 'id001').should.be.true;
		node = new Node({nodeId:'id001', temperature:23, humidity:33});
		// console.dir(node);
		// ((node.nodeId == 'id001') && (node.temperature == 23)).should.be.true;
		node.update({nodeId:'id002', temperature:43, humidity:53});
		(node.temperature == 23).should.be.true;

		var b = node.update({nodeId:'id001', temperature:23, humidity:33});
		(false == b).should.be.true;

		b = node.update({nodeId:'id001', temperature:43, humidity:33});
		(true == b).should.be.true;
		(node.temperature == 43).should.be.true;
		(node.humidity == 33).should.be.true;

	});
	it("String => ", function(){
		var data = '111111</MotePacket>22222222222222</MotePacket>4444';
		var index = data.lastIndexOf('</MotePacket>');
		// console.log('lastIndex => '+ index);
		(index == 33).should.be.true;
		var sub = data.substring(0, index+13);
		// console.log('substring =>');
		// console.log(sub);
	});
	if('', function(){
		var p = parserList['111'];
		(p == null).should.be.true;
	});	
});


describe('RawData Parse => ', function(){
	
	it('', function(){
		var sensors = totalSensor_xml.match(/\<MotePacket\>[\<\w\> \.\/]+\<\/MotePacket\>/g);
		(sensors.length == 4).should.be.true;

		// console.log('match result =>')
		// console.dir(sensors);
		for (var i = 0; i < sensors.length; i++) {
			var s = sensors[i];
			ParseNodeXml(s, function(packetName, node){
				if(packetName == 'Soil Temperature Sensor'){
					(null == node).should.be.false;
					(node.nodeId == '32778').should.be.true;
					(node.soilTemperature == '24.062500').should.be.true;
				}
				if(packetName == 'eS1100 Soil Moisture Sensor v1'){
					(null == node).should.be.false;
					(node.nodeId == '32777').should.be.true;
					(node.soilMoisture == '0.338956').should.be.true;					
				}
				if(packetName == 'eS1201 Ambient Temperature and Humidity Sensor'){
					(null == node).should.be.false;
					(node.nodeId == '32775').should.be.true;
					(node.temperature == '31.830000').should.be.true;
					(node.humidity == '43.816799').should.be.true;					
				}
				if(packetName == 'ET22 Weather Sensor'){
					(null == node).should.be.false;
					(node.nodeId == '32770').should.be.true;
					(node.Solar == '523.416077').should.be.true;
					(node.WindMax == '7.242048').should.be.true;
					(node.WindAvg == '2.091900').should.be.true;
					(node.WindDirAvg == '256.891510').should.be.true;
					(node.RainRate == '0.000000').should.be.true;
					(node.BP == '1010.400024').should.be.true;
					(node.temperature == '23.410000').should.be.true;
					(node.humidity == '64.031921').should.be.true;					
				}												
			});
		};
	});

	// it('SoilTemperatureSensor => ', function(){
	// 	ParseNodeXml_SoilTemperatureSensor(eS1100_Soil_Temperature_Sensor_Xml, function(node){
	// 		(null == node).should.be.false;
	// 		(node.nodeId == '32778').should.be.true;
	// 		(node.soilTemperature == '24.062500').should.be.true;
	// 	});
	// });

	// it('Soil Moisture Sensor =>', function(){
	// 	ParseNodeXml_SoilMoistureSensor(eS1100_Soil_Moisture_Sensor_xml, function(node){
	// 		(null == node).should.be.false;
	// 		(node.nodeId == '32777').should.be.true;
	// 		(node.soilMoisture == '0.338956').should.be.true;
	// 	});
	// });

	// it('TestES1201AmbientTemperatureAndHumiditySensor =>', function(){
	// 	ParseNodeXml_eS1201AmbientTemperatureAndHumiditySensor(ES1201AmbientTemperatureAndHumiditySensor_xml, function(node){
	// 		(null == node).should.be.false;
	// 		(node.nodeId == '32775').should.be.true;
	// 		(node.temperature == '31.830000').should.be.true;
	// 		(node.humidity == '43.816799').should.be.true;
	// 	});
	// });

	// it('TestParseNodeXml_ET22WeatherSensor => ', function(){
	// 	ParseNodeXml_ET22WeatherSensor(ET22_Weather_Sensor_xml, function(node){
	// 		(null == node).should.be.false;
	// 		(node.nodeId == '32770').should.be.true;
	// 		(node.Solar == '523.416077').should.be.true;
	// 		(node.WindMax == '7.242048').should.be.true;
	// 		(node.WindAvg == '2.091900').should.be.true;
	// 		(node.WindDirAvg == '256.891510').should.be.true;
	// 		(node.RainRate == '0.000000').should.be.true;
	// 		(node.BP == '1010.400024').should.be.true;
	// 		(node.temperature == '23.410000').should.be.true;
	// 		(node.humidity == '64.031921').should.be.true;

	// 	});
	// });

});


