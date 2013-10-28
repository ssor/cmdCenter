

/*
* 最外层: {status:'success', cmds:[主体内容]}
* 可以根据status判定是否需要主体内容
*
* Command 的 para 参数,各个不同的需求可以自行定义
*/
var wssModule = require('./wss');

var commandList = new Array();
var strForSay = '';


Date.prototype.format = function(format)  
{  
	/* 
	* format="yyyy-MM-dd hh:mm:ss"; 
	*/  
	var o = {  
	"M+" : this.getMonth() + 1,  
	"d+" : this.getDate(),  
	"h+" : this.getHours(),  
	"m+" : this.getMinutes(),  
	"s+" : this.getSeconds(),  
	"q+" : Math.floor((this.getMonth() + 3) / 3),  
	"S" : this.getMilliseconds()  
	}  
	if (/(y+)/.test(format))  
	{  
		format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4  
	- RegExp.$1.length));  
	}  
	  
	for (var k in o)  
	{  
		if (new RegExp("(" + k + ")").test(format))  
	{  
		format = format.replace(RegExp.$1, RegExp.$1.length == 1  
		? o[k]  
		: ("00" + o[k]).substr(("" + o[k]).length));  
	}  
	}  
	return format;  
}  

function Command(_name, _para){
	this.name = _name;
	this.para = _para;
	// this.msgType = '';
	var time = new Date();  
	this.timeStamp = time.format('yyyy-MM-dd hh:mm:ss');
}

exports.newcmd = function(_json_cmd){
	// console.dir(_json_cmd);
	var newcmd = new Command(_json_cmd.name, _json_cmd.para);
    console.log('newcmd =>');
    console.dir(newcmd);

	var cmds2send = getCmdListByName(newcmd.name);
	cmds2send.push(newcmd);
	
    var bConsumed = wssModule.wss_broadcast(newcmd.name
    				, {status:'success', cmds:JSON.stringify(cmds2send)});

    if(bConsumed == false){
    	console.log('do not consumed by wss , add to list');
	    commandList.push(newcmd);
    }else{
    	console.log('consumed by wss , clear all ' + newcmd.name + ' command');
    	clearCmdByName(newcmd.name);
    }
    return {status:'success'};	
};

exports.getcmds  = function(_json_cmd){
	var cmds2send = getCmdListByName(_json_cmd.name);
	clearCmdByName(_json_cmd.name);
    return {status:'success', cmds:JSON.stringify(cmds2send)};
};

exports.say = function(_hello){
	if(_hello == null){
		console.log(strForSay);
	}else{
		console.log(_hello);
		strForSay = _hello;
	}
};

function getCmdListByName(_name){
	console.log('getCmdListByName => ' + _name);
	console.dir(commandList);
	var arrayWithSpecifiedName = new Array();
	for (var i = 0; i < commandList.length; i++) {
		var _cmd = commandList[i];
		if(_cmd.name == _name){
			arrayWithSpecifiedName.push(_cmd);
		}
	};
	return arrayWithSpecifiedName;
}
function clearCmdByName(_name){
	var newCmdArray = new Array();
	for(var key in commandList){
		if(commandList[key].name != _name){
			newCmdArray.push(commandList[key]);
		}
	}
	commandList = newCmdArray;
}


