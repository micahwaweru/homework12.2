const mysql = require('mysql2');
//require('dotenv').config();

const db = new mysql.createConnection(
    {  
      host: 'localhost',
      user: 'root',
      password:'nevergonnatakeme',
      database:'staff_db',
      port: 3306


    }
);

module.exports=db;