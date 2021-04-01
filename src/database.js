const mysql = require('mysql');

const connectionConfig = {
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'company'
}

const mysqlConnection = mysql.createConnection( connectionConfig );

mysqlConnection.connect( ( err )=>{
    if(err) return;
    console.log('DB connected !')
});

module.exports = mysqlConnection;