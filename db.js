const mysql= require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'dazer.sana',
    database: 'crud_app',
  
  });
  db.connect((err) => {
    if (err) {
      console.error('MySQL connection error:', err);
    } else {
      console.log('Connected to MySQL database');
    }
  });
  
  module.exports = db;