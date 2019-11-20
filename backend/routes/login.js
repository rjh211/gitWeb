var express = require('express');
var router = express.Router();
const pg = require('pg');
const Crypto = require('crypto');
const bodyParser = require('body-parser');

const config = {
  host:'localhost',
  user:'postgres',
  password:'masterkey',
  database:'login_inform',
  port : 5432
};

const client = new pg.Client(config);
ConnectDB();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function(req, response, next) {
  let id = req.body.Id;
  let pw = req.body.Pw;

  const query = 'SELECT * FROM users.test';
  client.query(query).then(res => {
      const Rows = res.rows;
      setTimeout(() => {
          Rows.map(row=>{
              if(id === row.id)
              {
                Crypto.randomBytes(64, (err, buf)=>{                //Crypto PW 암호화
                    Crypto.pbkdf2(pw, row.salt, row.repeat, 64, 'sha512', (err, key)=>{
                        let incode_pw = key.toString('base64');
                        if(incode_pw === row.pw){
                            response.send(true);/////////////////////////////////////////////////////////////////////////////////////////////Gchart로
                        } 
                    })
                })
              }
          })
      }, 100);
  }).catch(err => {
      response.send(err);
  })
});

router.post('/signup', function(req, response, next) {
  let id = req.body.Id;
  let pw = req.body.Pw;

  let is_duple = false;

  const query = 'SELECT * FROM users.test';           //Query 작성
  client.query(query).then(res => {                   //Query 실행
      const Rows = res.rows;
      Rows.map(row => {
          if (is_duple === false) {             //중복 조건
              if (id === row.id) {
                  is_duple = true;
              }
          }
      })
      setTimeout(() => { }, 10);
      if(is_duple){
        response.send('The Same ID Aleady Exist.');
        return;
      } 
      else{
          setTimeout(() => {
            const random_var = generateRandom(90000,110000);
            let salt = "";
            
            Crypto.randomBytes(64, (err, buf)=>{
                salt = buf.toString('base64');
                Crypto.pbkdf2(pw, salt, random_var,64,'sha512',(err,key)=>{
                    let Crypto_pw = (key.toString('base64'));
                    
                    const query = `INSERT INTO users.test (id, pw, repeat, salt) VALUES('${id}', '${Crypto_pw}', ${random_var},'${salt}');`;
                    client.query(query).then(() => {
                        console.log('Login Data created Successfully');
                    }).catch(err => console.log(err));
                });
            });
          }, 100,response.send('Create Data Success'));//////////////////////////////////////////////////////////////////////////Login 화면으로
      }  
  }).catch(err => {
      console.log(err);
  })
});

var generateRandom = function (min, max){               //create random variable
  return Math.floor(Math.random()*(max-min+1))+min;
}

function ConnectDB(){
  client.connect(err=>{
      if(err) throw err;
      else console.log('Connect login_inform!');
  })
}

module.exports = router;




  