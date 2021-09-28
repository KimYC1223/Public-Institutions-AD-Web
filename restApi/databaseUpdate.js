const fs = require('fs')

console.log("Data load start...");
const dataBuffer = fs.readFileSync('./data_utf.json')
console.log("Data load as byte...");

const dataJSON = dataBuffer.toString()
console.log("Byte -> String format change complete...");


const data= JSON.parse(dataJSON)
console.log("JSON parsing complete...")

const DataBasePassWord = fs.readFileSync('./dbpw.txt')
const dbpw = DataBasePassWord.toString();

console.log(`dbpw : ${dbpw}`);

var mysql      = require('mysql')
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : dbpw,
  port     : 3306,
  database : 'LOG_DATA' 
});

connection.connect();
for(let i = 0; i < data.length; i++) {

    let queryString = 'INSERT INTO logs (type,mediaName,hostName,years,timestamp,subject,cost,num)'
              + `VALUES ("${data[i].type}","${data[i].mediaName}","${data[i].hostName}",`
              + `${data[i].years},"${data[i].timestamp}","${data[i].subject}",${data[i].cost},${data[i].num});`

    connection.query(queryString, function(error,rows, fields) {
        if(error) {console.log(error);}
        
    })
      
}

console.log("Done..!");