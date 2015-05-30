var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'HealthyFoodServices' });
});

router.post('/login.php',function(request,response){
	var user = request.body.user;
	var pass = request.body.pass;
	var crypto = request.cryp;
	if(user!= undefined && pass!=undefined){
		var conn = request.db;
		
		var md5 = crypto.createHash('md5').update(pass).digest('hex');
		conn.query("SELECT id AS idUser,nick as nick,nombre as nombre,birth as birth,sexo as sex "
			+"FROM Usuario WHERE nick=? and pass = ?;",
			[user,md5],
			function(error,result){
			if(error){
				response.send('error');
			}else{
				var jsonArray = [result[0]];
				response.json(jsonArray);
			}
		});
		//conn.end();
	}else{
		response.render('index',{title:"vacio"});	
	}
});

module.exports = router;
