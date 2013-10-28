
var cmd = require('./cmd');


exports.newcmd = function(req, res){
    var rawBody = req.rawBody;
    console.log(rawBody);
    var json_cmd = JSON.parse(rawBody);
    var jsonReturn = cmd.newcmd(json_cmd);
    res.send(JSON.stringify(jsonReturn));
    return;	
};

exports.getcmds  = function(req, res){
	var rawBody = req.rawBody;
	var json_cmd = JSON.parse(rawBody);

	var jsonReturn = cmd.getcmds(json_cmd);
    var strJson = JSON.stringify(jsonReturn) 
    res.send(strJson);
    
    return;
};

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};
exports.wsTest = function(req, res){
	res.render('wsTest');
};
function getCmdListByName(_name){
	var arrayWithSpecifiedName = new Array();
	global.commandList.forEach(function(_cmd){
		if(_cmd.name == _name){
			arrayWithSpecifiedName.push(_cmd);
		}
	});
	return arrayWithSpecifiedName;
}


