var mysql = require('mysql');

// Your password has expired. To log in you must change it using a client that supports expired passwordsㅡ
// ALTER USER `root`@`localhost` IDENTIFIED BY '새로운 비밀번호', `root`@`localhost` PASSWORD EXPIRE NEVER;
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234'
});

connection.connect();

connection.query('create database test', function (err) {
    if (err) {
        throw err;
    }
});

connection.query('use test');

connection.query('create table rank( score INT, id VARCHAR(50) );');

connection.query("insert into rank values(100, 'testId');");

connection.query("SELECT scroe FROM rank", function (err, result, fields) {
    if (err) throw err; 
    console.log(result);
});
connection.end(); // END