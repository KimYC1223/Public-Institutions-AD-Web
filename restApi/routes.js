module.exports = function (app) {
    let mysqlScript = require('./mysqlScript.js')
    let fs = require('fs')

    app.set('view engine', 'ejs');
    app.engine('html', require('ejs').renderFile);

    app.get('/', (req,res) => {
      res.render(__dirname+'/HTML/index.html')
    })

    app.get('/dataPage', (req,res) => {
      res.render(__dirname+'/HTML/DataQuery.html')
    })

    app.get('/IllegalPlatform', (req,res) => {
      res.render(__dirname+'/HTML/IllegalPlatform.html')
    })

    app.get('/read_logs', (req,res) => { mysqlScript.read_logs(req,res) })
    app.get('/read_group_info', (req,res) => { 
      fs.readFile(__dirname+'/group_utf.json','utf8',(err,data) => {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        if(err) { res.write(`null`)}
        else res.write(data)
        res.end()
      })
    })
  }
