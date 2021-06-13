module.exports = function (app) {
    let mysqlScript = require('./mysqlScript.js')
    let fs = require('fs')

    app.set('view engine', 'ejs');
    app.engine('html', require('ejs').renderFile);

    app.get('/', (req,res) => {
      res.render(__dirname+'/HTML/index.html')
    })

    /*
    app.get('/check', (req,res) => {
      let pw = req.query.pw
      fs.readFile(__dirname+'/data.txt','utf8',(err,data) => {
        if(data == pw) { res.write(`1`)}
        else res.write(`0`)
        res.end()
      })
    })
    */

    app.get('/dataPage', (req,res) => {
      res.render(__dirname+'/HTML/userTable.html')
    })

    app.get('/read_logs', (req,res) => { mysqlScript.read_users(req,res) })
  }
