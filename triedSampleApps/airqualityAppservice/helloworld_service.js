var pkgInfo = require('./package.json');
var Service = require('webos-service');
var service = new Service(pkgInfo.name);
var greeting = "Hello, World!";
var mysql = require('mysql');
// var https = require('https');

// a method that always returns the same value
service.register("hello", function(message) {
	console.log("In hello callback");
	message.respond({
		returnValue: true,
		message: greeting
	});
});


service.register("cliendIdforlogin", function (message) {

	console.log("In login client id callback");
	var ss;
	var con = mysql.createConnection({
		host: "projects.fldec.com",
		port: 3306,
		user: "projectiot",
		password: "Fldec$*22",
		database: "userdatabase"
	});
	
	try {
		con.connect(function (error) {
			if (!error) {
				console.log("mysql connected")
			} else {
				console.log("mysql connection lost");
				message.respond({
					returnValue: false,
					data: error
				});
			}

			con.query("SELECT Client_ID FROM userdetails GROUP BY Client_ID", function (err, result, fields) {
				if (!err) {
					message.respond({
						returnValue: true,
						data: result
					});
				}
				else {
					console.log("mysql connection lost");
					message.respond({
						returnValue: false,
						data: err
					});
				}
			});
		});

	}
	catch (err) {
		message.respond({
			returnValue: false,
			data: err
		});
	}
	//finally {
	//	con.destroy();
	//}
});

service.register("loginwithclientidandpassword", function (message) {
	console.log("In login with password");

	var clientId = message.payload.clientId;
	var password = message.payload.password;

	var connection = mysql.createConnection({
		host: "projects.fldec.com",
		port: 3306,
		user: "projectiot",
		password: "Fldec$*22",
		database: "userdatabase"
	});

	try {
		connection.connect(function (error) {
			if (!error) {
				console.log("mysql connected");
			} else {
				console.log("mysql connection lost");
				message.respond({
					returnValue: false,
					data: error
				});
			}
			var sqlQuery = "SELECT Count(*) as LoginCount FROM userdetails WHERE Client_ID ='" + clientId + "' AND Password ='" + password + "'";
			connection.query(sqlQuery, function (err, result, fields) {
				if (!err) {
					message.respond({
						returnValue: true,
						data: result
					});
				}
				else {
					console.log("mysql connection lost");
					message.respond({
						returnValue: false,
						data: err
					});
				}
			});
			//connection.destroy();
		});
	}
	catch (err) {
		message.respond({
			returnValue: false,
			data: err
		});
	}
	//finally {
	//	connection.destroy();
	//}
});


service.register("buildingnamebyclientid", function (message) {
	console.log("In login with password");

	var clientId = message.payload.clientId;

	var con = mysql.createConnection({
		host: "projects.fldec.com",
		port: 3306,
		user: "projectiot",
		password: "Fldec$*22",
		database: "userdatabase"
	});

	try {
		con.connect(function (error) {
			if (!error) {
				console.log("mysql connected")
			} else {
				console.log("mysql connection lost");
				message.respond({
					returnValue: false,
					data: error
				});
			}
			var sqlQuery = "SELECT Building_Name FROM Lobby_Table WHERE Client_ID='" + clientId + "'";
			con.query(sqlQuery, function (err, result, fields) {
				if (!err) {
					message.respond({
						returnValue: true,
						data: result
					});
				}
				else {
					console.log("mysql connection lost");
					message.respond({
						returnValue: false,
						data: err
					});
				}
			});
			//con.destroy();
		});
	}
	catch (err) {
		message.respond({
			returnValue: false,
			data: err
		});
	}
	//finally {
	//	con.destroy();
	//}
});


service.register("deviceidbybuildingname", function (message) {
	console.log("In login with password");

	var clientId = message.payload.clientId;
	var buildingName = message.payload.buildingId;

	var con = mysql.createConnection({
		host: "projects.fldec.com",
		port: 3306,
		user: "projectiot",
		password: "Fldec$*22",
		database: "userdatabase"
	});

	try {
		con.connect(function (error) {
			if (!error) {
				console.log("mysql connected")
			} else {
				console.log("mysql connection lost");
				message.respond({
					returnValue: false,
					data: error
				});
			}
			var sqlQuery = "SELECT Device_ID FROM Lobby_Table WHERE Client_ID='" + clientId + "' AND Building_Name='" + buildingName + "'";
			con.query(sqlQuery, function (err, result, fields) {
				if (!err) {
					message.respond({
						returnValue: true,
						data: result
					});
				}
				else {
					console.log("mysql connection lost");
					message.respond({
						returnValue: false,
						data: err
					});
				}
			});
			//con.destroy();
		});
	}
	catch (err) {
		message.respond({
			returnValue: false,
			data: err
		});
	}
	//finally {
	//	con.destroy();
	//}
});


service.register("sensordatabyclientidanddeviceid", function (message) {
	console.log("In login with password");

	var clientId = message.payload.clientId;
	var deviceId = message.payload.deviceId;

	var con = mysql.createConnection({
		host: "projects.fldec.com",
		port: 3306,
		user: "projectiot",
		password: "Fldec$*22",
		database: "userdatabase"
	});

	try {
		con.connect(function (error) {
			if (!error) {
				console.log("mysql connected")
			} else {
				console.log("mysql connection lost");
				message.respond({
					returnValue: false,
					data: error
				});
			}
			var sqlQuery = "SELECT DATE,TIME,Client_ID , Device_ID, AQI, PM10, PM2_5 FROM SensorData1 WHERE DATE = DATE_FORMAT(CURDATE(), '%d-%m-%Y') AND TIME >= SUBTIME(CURTIME(), '0:1:0.000000') AND Client_ID = '"+ clientId +"' and Device_ID = '" + deviceId + "' ORDER BY TIME DESC;";
			con.query(sqlQuery, function (err, result, fields) {
				if (!err) {
					message.respond({
						returnValue: true,
						data: result
					});
				}
				else {
					console.log("mysql connection lost");
					message.respond({
						returnValue: false,
						data: err
					});
				}
			});
			//con.destroy();
		});
	}
	catch (err) {
		message.respond({
			returnValue: false,
			data: err
		});
	}
	//finally {
	//	con.destroy();
	//}
});

service.register("nearbystationforoutdoor", function (message) {
	console.log("In login with password");

	var clientId = message.payload.clientId;
	var buildingId = message.payload.buildingId;

	var con = mysql.createConnection({
		host: "projects.fldec.com",
		port: 3306,
		user: "projectiot",
		password: "Fldec$*22",
		database: "userdatabase"
	});

	try {
		con.connect(function (error) {
			if (!error) {
				console.log("mysql connected")
			} else {
				console.log("mysql connection lost");
				message.respond({
					returnValue: false,
					data: error
				});
			}
			var sqlQuery = "SELECT Nearby_Station FROM Lobby_Table WHERE Client_ID='" + clientId + "' AND Building_Name='" + buildingId + "'";
			con.query(sqlQuery, function (err, result, fields) {
				if (!err) {
					message.respond({
						returnValue: true,
						data: result
					});
				}
				else {
					console.log("mysql connection lost");
					message.respond({
						returnValue: false,
						data: err
					});
				}
			});
			//con.destroy();
		});
	}
	catch (err) {
		message.respond({
			returnValue: false,
			data: err
		});
	}
	//finally {
	//	con.destroy();
	//}
});

// service.register("sensordataforoutdoor", function (message) {
// 	var nearByStation = message.payload.nearByStation;
// 	var token = message.payload.token;
// 	var url = "https://api.waqi.info/feed/" + nearByStation + "/?token=" + token;

// 	let request = https.get(url, (res) => {
// 		if (res.statusCode != 200) {
// 			message.respond({
// 				returnValue: false,
// 				data: res
// 			});
// 		}

// 		let data = '';

// 		res.on('data', (chunk) => {
// 			data += chunk;
// 		});

// 		res.on('end', () => {
// 			message.respond({
// 				returnValue: true,
// 				data: data
// 			});
// 		});

// 		request.on('error', (err) => {
// 			message.respond({
// 				returnValue: false,
// 				data: err
// 			});
// 		});
// 	});
// });

// set some state in the service
service.register("/config/setGreeting", function(message) {
	console.log("In setGreeting callback");
	if (message.payload.greeting) {
		greeting = message.payload.greeting;
	} else {
		message.respond({
			returnValue: false,
			errorText: "argument 'greeting' is required",
			errorCode: 1
		});
	}
	message.respond({
		returnValue: true,
		greeting: greeting
	});
});
