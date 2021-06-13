var mysql      = require('mysql')
let queryString = require('querystring')
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'xxxx',
  port     : 3306,
  database : 'LOG_DATA'
});

let dateParse = (timestamp) => {
  let year = timestamp.getFullYear(); // 년도
  let month = timestamp.getMonth() + 1;  // 월
  let date = timestamp.getDate();  // 날짜
  let hours = timestamp.getHours(); // 시
  let minutes = timestamp.getMinutes();  // 분
  let seconds = timestamp.getSeconds();  // 초

  return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`
}


connection.connect();
module.exports = (function() {
  return{
    //=====================================================================================================================================
    /*
        +---------------+--------------+------+-----+---------+----------------+
        | Field         | Type         | Null | Key | Default | Extra          |
        +---------------+--------------+------+-----+---------+----------------+
        | id            | int(11)      | NO   | PRI | NULL    | auto_increment |
        | type          | char(14)     | YES  |     | NULL    |                |
        | mediaName     | char(20)     | YES  |     | NULL    |                |
        | hostName      | char(200)    | YES  |     | NULL    |                |
        | years         | int(11)      | YES  |     | NULL    |                |
        | timestamp     | date         | YES  |     | NULL    |                |
        | subject       | char(200)    | YES  |     | NULL    |                |
        | cost          | decimal(5,2) | YES  |     | NULL    |                |
        | num           | int(11)      | YES  |     | NULL    |                |
        +---------------+--------------+------+-----+---------+----------------+
    */
    //=====================================================================================================================================
    //  ▶ read_logs
    //=====================================================================================================================================
    read_logs: function (req,res) {
      let name = req.query.name
      let queryString = `SELECT * FROM logs WHERE hostName = "${name}";`
      connection.query(queryString, function(error,rows, fields) {
        res.writeHead(200,{'Content-Type':'text/plain;charset=utf-8'})
        if(rows.length == 0) {
          res.write('null')
          res.end();
          return;
        }
        try{
          let str = `{\n\t"logs" : [\n`
          for(var i = 0; i < rows.length; i++) {
            str +='{\n'
            str += `\t"log_id" : ${rows[i].log_id},\n`
            str += `\t"type" : "${rows[i].type}",\n`
            str += `\t"mediaName" : "${rows[i].mediaName}",\n`
            str += `\t"hostName" : "${rows[i].hostName}",\n`
            str += `\t"years" : ${rows[i].years},\n`
            str += `\t"timestamp" : "${rows[i].timestamp}",\n`
            str += `\t"subject" : "${rows[i].subject}",\n`
            str += `\t"cost" : ${rows[i].cost},\n`
            str += `\t"num" : ${rows[i].num}\n`
            if( i != (rows.length-1))
              str += ", "
          }
          str += '\n\t]\n}'
          res.write(str)
        } catch (e) {res.write('null')}
        res.end();        
      });
      return;
    }
}});