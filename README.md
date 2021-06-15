<img src="https://github.com/KimYC1223/Public-Institutions-AD-Web/blob/main/ReadmeImg/intro.png?raw=true" width="50%">

# Public-Institutions-AD-Web

**NodeJS기반의 공공기관 광고 현황 조회 대시보드**

✍️ Author : Kim-Youngchan (KimYC1223)

Public Institutions AD status dashboard based on NodeJS web server

Access Link : http://www.kek9580.com/

<a href="mailto:kau_esc@naver.com"><img src="https://img.shields.io/badge/Contact-kau_esc@naver.com-blue?logo=gmail&logoColor=white"></a>
<a href="https://github.com/FluidTrack/FluidTrackApplication/blob/master/LICENSE"><img src="https://img.shields.io/github/license/FluidTrack/FluidTrackApplication"></a>


## Development Environment

| Environment          | Version                                                                         |
| -------------------- | ------------------------------------------------------------------------------- |
| OS                   | <img src="https://img.shields.io/badge/Ubuntu-18.04.5 LTS-orange?logo=ubuntu&logoColor=white" align="left"> |
| MySQL                | <img src="https://img.shields.io/badge/Version-1.8.0_152-orange" align="left">  |
| NodeJS               | <img src="https://img.shields.io/badge/Version-12.18.0-orange" align="left">    |
| NPM                  | <img src="https://img.shields.io/badge/Version-6.14.8-orange" align="left">     |



## Database architecture

```
+-----------+--------------+------+-----+---------+----------------+
| Field     | Type         | Null | Key | Default | Extra          |
+-----------+--------------+------+-----+---------+----------------+
| log_id    | int(11)      | NO   | PRI | NULL    | auto_increment |
| type      | char(14)     | YES  |     | NULL    |                |
| mediaName | char(20)     | YES  |     | NULL    |                |
| hostName  | char(200)    | YES  |     | NULL    |                |
| years     | int(11)      | YES  |     | NULL    |                |
| timestamp | date         | YES  |     | NULL    |                |
| subject   | char(200)    | YES  |     | NULL    |                |
| cost      | decimal(8,2) | YES  |     | NULL    |                |
| num       | int(11)      | YES  |     | NULL    |                |
+-----------+--------------+------+-----+---------+----------------+
```

## Environment setting & Server install

Install nodejs with npm. (windows : [https://nodejs.org/ko/download/](https://nodejs.org/ko/download/))

```
sudo apt-get update
sudo apt-get install nodejs
node --version
npm --version
```

clone this repo

```
sudo git clone git@github.com:KimYC1223/Public-Institutions-AD-Web
cd Public-Institutions-AD-Web
```

and install node pakgke

```
sudo npm install
```

To keep the server online at all times, install the [PM2](https://pm2.keymetrics.io/) package.

```
sudo npm install pm2 -g
```

Turn on the server using pm2.

```
cd WebSrc
sudo pm2 start server.js
```

> 　
> **📌 Note** : PM2 command could be learned from [this site](https://owldev.netlify.app/js/pm2-cmd/) (Korean)
> 　


## Mysql server install

Install mysql server.

```
sudo apt-get update
sudo apt-get install mysql-server
```

Set database password.

```
sudo mysql -u root -p
SELECT user,plugin,host FROM mysql.user;
```

If  root authentication method is 'auth_socket', try this :

```
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'FLUID TRACK 데이터베이스 비밀번호';
FLUSH PRIVILEGES;
exit;
```

To change the database character set to'utf-8',

```
whereis mysql
cd /etc/mysql
sudo vi my.cnf
```

Then paste the following at the end of the file and save it.

```
[mysql]
default-character-set = utf8

[client]
default-character-set = utf8

[mysqld]
character-set-server = utf8
collation-server = utf8_general_ci
init_connect='SET NAMES utf8'
```

Then restart the mysql server. (```sudo service mysql restart```)

## DB init & Data Update 

Type the this SQL command  :

```SQL
create database LOG_DATA;
use LOG_DATA;

CREATE TABLE logs ( 
  log_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,   
  type CHAR(14),
  mediaName CHAR(20),
  hostName CHAR(200),
  years INT,
  timestamp DATE,
  subject CHAR(200),
  cost DECIMAL(8,2),
  num INT
);
```

You need to write the database password in ```dbpw.txt``` to give the NodeJS server permission to access the database.

```
cd resApi
vim dbpw.txt   // write database password
```

And if you want to initialize to database, just run ```databaseUpdate.js```.

```
sudo node databaseUpdate.js
```

<br><br>
