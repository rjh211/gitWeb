var express = require('express');
const pg = require('pg');
const bodyParser = require('body-parser');

var router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended : true}));


const config = {
  host:'localhost',
  user: 'postgres',
  password: 'masterkey',
  database: 'vueexpress',
  port : 5432
}

const client = new pg.Client(config);
ConnectDB();

router.post('/', (req, res, next)=>{
  res.render('index', {title: 'Express'});
});

router.post('/test', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/Show', (req, response)=>{
    const temp = req.body.dateRange;
    console.log(temp)
    const start_date_year = (temp[0].split('T')[0].split('-')[0]);
    const end_date_year = (temp[1].split('T')[0].split('-')[0]);
    

    console.log(start_date_year);
    console.log(end_date_year);
});

router.post('/Parse', (req, response)=>{
  const temp = req.body.dateRange;
  const start_date_year = (temp[0].split('T')[0].split('-')[0]);
  const end_date_year = (temp[1].split('T')[0].split('-')[0]);
  
  const query = `SELECT * FROM users.testtable2 where year >= ${start_date_year} and year <= ${end_date_year}`;
  client.query(query).then(res=>{
    client.query('SELECT * FROM users.testtable2 where false').then(res_column=>{
      const Rows = res.rows;
      let JsonData = [];
      let JsonName = [];
      for(var j = 0  ; j<res_column.fields.length;j++)
      {
        JsonName.push(res_column.fields[j].name)
      }
      JsonData.push(JsonName);

      for(var i =0 ;i<Rows.length;i++)
      {
        let JsonRow = [];
        for( var j =0 ;j<res_column.fields.length;j++)
        {
          let value = eval('Rows[i].' + res_column.fields[j].name);
          if(j===0){JsonRow.push(`${value}`)}
          else{JsonRow.push(value);}
        }
        JsonData.push(JsonRow);
      }
      response.send(JsonData);
    })
  })
});

router.post('/Lotlist',(req, response)=>{
  const temp = req.body.dateRange;
  const start_date_year = (temp[0]);
  const end_date_year = (temp[1]);

  let Json_Data = [];
  let Json_SaveDate = [];
  let Json_Num = [];
  const query = `SELECT * FROM users.lotlist where savedate >= '${start_date_year}' and savedate <= '${end_date_year}'`;
  client.query(query).then(res=>{
    const Rows = res.rows
    Rows.map(row=>{
      
      let splitdate = row.savedate.toLocaleString();
      splitdate = splitdate.split(' ')[0]
      Json_SaveDate.push(`${splitdate}  ${row.lotnum}`);
      //Json_Num.push(row.lotnum);
    })
    //Json_Data.push(Json_SaveDate);
    //Json_Data.push(Json_Num);
    response.send(Json_SaveDate);
  })

})

router.post('/Getlot',(req, response)=>{
  const temp = req.body.Lotnum;
  const parse_data = temp.split(' ')[2]

  const query = `SELECT * FROM users.${parse_data}`

  client.query(query).then(res=>{
    client.query(query + ' where false').then(res_column=>{
      const Rows = res.rows;
      let JsonData = [];
      let JsonName = [];
      for(var j = 0  ; j<res_column.fields.length;j++)
      {
        JsonName.push(res_column.fields[j].name)
      }
      JsonData.push(JsonName);

      for(var i =0 ;i<Rows.length;i++)
      {
        let JsonRow = [];
        for( var j =0 ;j<res_column.fields.length;j++)
        {
          let value = eval('Rows[i].' + res_column.fields[j].name);
          if(j===0){JsonRow.push(`${value}`)}
          else{JsonRow.push(value);}
        }
        JsonData.push(JsonRow);
      }
      console.log(JsonData)
      response.send(JsonData);
    })
  })
})

function ConnectDB(){
  client.connect(err=>{
      if(err) throw err;
      else console.log('Connect vueexpress!');
  })
}
module.exports = router;