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
  database: 'comformal',
  port : 5432
}


const client = new pg.Client(config);
ConnectDB();

function r2c(arr) {
  var arrC = [], // next get the longest sub-array length
      x = Math.max.apply(Math, arr.map(function (e) {return e.length;})),
      y = arr.length,
      i, j;
  for (i = 0; i < x; ++i) {   // this is the loop "down"
      arrC[i] = [];
      for (j = 0; j < y; ++j) // and this is the loop "across"
          if (i in arr[j])
              arrC[i].push(arr[j][i]);
  }
  return arrC;
}

function ConnectDB(){
    client.connect(err=>{
        if(err) throw err;
        else console.log('Connect newcomformaldb!');
    })
}

module.exports = router;


router.post('/Model_Information', (req, response, next)=>{
    const date = req.body.Dateinform          //Date-Picker 값
    let search_start = date[0]
    let search_end = date[1]
    let search_date_Query = 'Select * from public.model_information'
    
    search_start = search_start.split('T')[0]
    search_end = search_end.split('T')[0]
    search_date_Query = search_date_Query + ` where renewal_date>='${search_start}' and renewal_date <= '${search_end}'`;

    client.query(search_date_Query).then(res=>{
        client.query('SELECT * FROM public.model_information where false').then(res_column=>{
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
                  if(typeof(value) == 'object'){    //value가 좌표 형식 일때
                      value = `{ x: ${value.x}, y: ${value.y}}`
                    }
                  if(j===0){JsonRow.push(`${value}`)}
                  else{JsonRow.push(value);}
                }
                JsonData.push(JsonRow);
            }
            JsonData = r2c(JsonData);
            response.send(JsonData);
        })
    })
});

router.post('/Product_Information', (req, response, next)=>{
  const date = req.body.Dateinform          //Date-Picker 값
  let search_start = date[0]
  let search_end = date[1]
  let search_date_Query = 'Select * from public.production_model'
  
  search_start = search_start.split('T')[0]
  search_end = search_end.split('T')[0]
  search_date_Query = search_date_Query + ` where inspection_start>='${search_start}' and inspection_start <= '${search_end}'`;
  client.query(search_date_Query).then(res=>{
      client.query('SELECT * FROM public.production_model where false').then(res_column=>{
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
          JsonData = r2c(JsonData);
          response.send(JsonData);
      })
  })
});


router.post('/Week_Stacked_Graph_Information',(req,response)=>{
  const date = req.body.Dateinform          //Date-Picker 값
  let search_start = date[0].split('T')[0]
  let search_end = date[1].split('T')[0]
  let strQuery = `Select is_inspection_good, is_redecision_good, inspection_start from public.production_model where inspection_start>='${search_start}' and inspection_start <= '${search_end}' order by inspection_start asc`
  client.query(strQuery).then(res=>{
    const Rows = res.rows

    let Input_Data = [];

    let Compare_Date = Rows[0].inspection_start.split(' ')[0];
    
    let Green_Result = 0;
    let Yellow_Result = 0;
    let Red_Result = 0;
    
    let sendArray = [['Date','Green','Yellow','Red']]
    for(var i = 0;i <Rows.length;i++)
    {
      let Inspection_Date = Rows[i].inspection_start.split(' ')[0];
      if(Inspection_Date == Compare_Date) {
        if(Rows[i].is_inspection_good == true)  Green_Result++;
        else{
          if(Rows[i].is_redecision_good == true) Yellow_Result++;
          else  Red_Result++;
        }
      } else{
        Input_Data.push(Compare_Date, Green_Result, Yellow_Result, Red_Result);
        Compare_Date = Inspection_Date;
        sendArray.push(Input_Data);
        Input_Data = [];

        Green_Result = 0;
        Yellow_Result = 0;
        Red_Result = 0;
        if(Rows[i].is_inspection_good == true)  Green_Result++;
        else{
          if(Rows[i].is_redecision_good == true) Yellow_Result++;
          else  Red_Result++;
        }
      } 
      if(i ==Rows.length-1){
        Input_Data.push(Compare_Date, Green_Result, Yellow_Result, Red_Result);
        Compare_Date = Inspection_Date;
        sendArray.push(Input_Data);
      }
    }
    console.log(sendArray)
    response.send(sendArray);
  })

})


router.post('/Week_Column_Graph_Information',(req,response)=>{
  const date = req.body.Dateinform          //Date-Picker 값
  let search_start = date[0].split('T')[0]
  let search_end = date[1].split('T')[0]
  const StrQuery = `select model_name, inspection_start, is_inspection_good from public.production_model where inspection_start>='${search_start}' and inspection_start <= '${search_end}' order by inspection_start asc`
  let dateData = [];
  let modelData = [];
  let isGoodData = [];

  client.query(StrQuery).then(res=>{
    const Rows = res.rows;
    for(var i =0 ;i<Rows.length;i++){
      dateData.push(Rows[i].inspection_start.split(' ')[0]);
      modelData.push(Rows[i].model_name);
      isGoodData.push(Rows[i].is_inspection_good);
    }

    let singleDate = dateData.reduce((a,b)=>{
      if(a.indexOf(b)<0)  a.push(b);
      return a;
    },[]);
    let singleModel = modelData.reduce((a,b)=>{
      if(a.indexOf(b)<0)  a.push(b);
      return a;
    },[]);    
    
    var x_array = new Array();
    var y_array = new Array();
    var z_array = new Array();
    for(var i =0 ;i<singleModel.length;i++)
    {
      if(i==0) x_array.push('Date')
      x_array.push(singleModel[i]);
    }
    for(var j = 0;j<singleDate.length;j++){
      y_array.push(singleDate[j])
    }
    for(var i =0 ;i<singleModel.length;i++){
      for(var j = 0;j<singleDate.length;j++){
        let modelName = singleModel[i];
        let inspectionStart = singleDate[j];
        let countQuery = `select count(is_inspection_good) from (select is_inspection_good from public.production_model where model_name = '${modelName}' and split_part(inspection_start,' ',1) ='${inspectionStart}') as foo where is_inspection_good = 't'` 
        client.query(countQuery).then(resp=>{
          const Rows = resp.rows;
          z_array.push(Rows[0].count)
        })
      }
    }
    setTimeout(() => {
      var sendArray = [];
      sendArray.push(x_array);
      // for(var i = 0;i<y_array.length;i++){
      //   sendArray.push([y_array[i],z_array[i*z_array.length] * 1,z_array[i*z_array.length+1]*1])
      // }
      for(var i = 0;i<y_array.length;i++)
      {
        let temp_array = [y_array[i]];
        for(var j =0; j<x_array.length-1;j++)
        {
          temp_array.push(z_array[j*y_array.length+i]*1)
        }
        sendArray.push(temp_array)
      }
      response.send(sendArray)

    }, 100);
  })

})


router.post('/Thickness_Information', (req, response, next)=>{
  let search_date_Query = 'Select * from public.thickness_measurement'
  //search_date_Query = search_date_Query + ` where renewal_date>='${search_start}' and renewal_date <= '${search_end}'`;

  client.query(search_date_Query).then(res=>{
      client.query('SELECT * FROM public.thickness_measurement where false').then(res_column=>{
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
                if(typeof(value) == 'object'){    //value가 좌표 형식 일때
                  if(value==null)
                  {
                    value = '';
                  }
                  else value = `{ x: ${value.x}, y: ${value.y}}`
                }
                if(j===0){JsonRow.push(`${value}`)}
                else{JsonRow.push(value);}
              }
              JsonData.push(JsonRow);
          }
          JsonData = r2c(JsonData);
          response.send(JsonData);
      })
  })
});


router.post('/ModelList_Information', (req, response, next)=>{
  const date = req.body.Dateinform          //Date-Picker 값
  let search_start = date[0].split('T')[0]
  let search_end = date[1].split('T')[0]
  let search_ModelList_Query = `Select distinct model_name from public.production_model where inspection_start>='${search_start}' and inspection_start <= '${search_end}'`
  
  client.query(search_ModelList_Query).then(res=>{
    const ModelList=[];
    for(var i =0 ;i<res.rows.length;i++) ModelList.push(res.rows[i].model_name)
    response.send(ModelList)
  })
});

// router.post('/MonthlyCount_Information', (req, response, next)=>{   //month - modelname
//   const searchMonth = req.body.Dateinform.split('-')[0]+'-'+req.body.Dateinform.split('-')[1]
//   const search_ModelList_Query = `Select distinct model_name, left(inspection_start,7) from public.production_model where left(inspection_start,7)='${searchMonth}' order by model_name asc`
//   let sendArray=[]
//   asyncQuery(search_ModelList_Query);

//    async function asyncQuery(sql){
//     const res1 = await QueryExec(sql);
//     const query = await makequery(res1);
//     const res2 = await QueryExec(query);

//     let ModelArray=['Month']
//     let DataArray=[`${res1[0].left}`]
//     for(var prop in res1)
//     {
//       ModelArray.push(res1[prop].model_name)
//       DataArray.push(eval('res2[0].count'+prop))
//     }
//     sendArray.push(ModelArray)
//     sendArray.push(DataArray)
//     console.log(sendArray)
//     response.send(sendArray);
//    }
// });


router.post('/Monthly_day_Count_Information', (req, response, next)=>{   //day(1~30) - true count 
  const searchMonth = req.body.Dateinform.split('-')[0]+'-'+req.body.Dateinform.split('-')[1]
  const search_ModelList_Query = `Select distinct model_name from public.production_model where left(inspection_start,7)='${searchMonth}' order by model_name asc`
  const search_date_query = `select distinct split_part(split_part(inspection_start,'-',3),' ',1) date from public.production_model where left(inspection_start,7)='${searchMonth}' order by date asc`
  
  asyncQuery(search_ModelList_Query, search_date_query)

  async function asyncQuery(modelListSql, dateSql){
    Promise.all([QueryExec(modelListSql),QueryExec(dateSql)]).then(values=>{
      const [res_modelList, res_dateList] = values;
      const countArray = [];
      for(var prop_model in res_modelList){
        for(var prop_date in res_dateList){
          const countQuery = (`select count(is_inspection_good) from public.production_model where split_part(split_part(inspection_start,'-',3),' ',1) in('${res_dateList[prop_date].date}') and model_name='${res_modelList[prop_model].model_name}' and is_inspection_good='t'`)
          client.query(countQuery).then(res=>{
            countArray.push(res.rows)
          })
        }
      }
      setTimeout(() => {
        let send_Array = ['date']
        for(var prop_modelList in res_modelList){
          send_Array.push(res_modelList[prop_modelList].model_name);
        }
        for(var prop_dateList in res_dateList){
          let temp_array = [];
          for(var prop_modelList in res_modelList){
            temp_array.push(countArray[(prop_modelList*res_dateList.length)*1+(prop_dateList)*1][0].count)
          }
          send_Array.push(temp_array)
        }
        response.send(send_Array)
      }, 100);
    })
  }

});


router.post('/Daily_Stacked_Graph_Information', (req, response, next)=>{   //model - 불량type별 개수 
  const searchMonth = req.body.Dateinform.split('-')[0]+'-'+req.body.Dateinform.split('-')[1]

  const search_date_query = `SELECT A.model_name,
  (SELECT count(model_name) from public.production_model where is_inspection_good='t' and split_part(split_part(inspection_start,'-',3),' ',1) = '17' and model_name=A.model_name) Good,
  (SELECT count(model_name) from public.production_model where is_inspection_good='f' and is_redecision_good = 't' and split_part(split_part(inspection_start,'-',3),' ',1) = '17' and model_name=A.model_name) Confirm,
  (SELECT count(model_name) from public.production_model where is_inspection_good='f' and is_redecision_good = 'f' and split_part(split_part(inspection_start,'-',3),' ',1) = '17' and model_name=A.model_name) NG
  FROM (SELECT DISTINCT model_name from public.production_model) A
  ORDER BY model_name ASC`
  
  QueryExec(search_date_query).then(result=>{
    let temp_array = ['model','Good','Confirm','NG']
    for(var prop_result in result)  temp_array.push([result[prop_result].model_name, result[prop_result].good, result[prop_result].confirm,result[prop_result].ng])

    response.send(temp_array)
  });
});

router.post('/Top10_Pie_Information', (req, response, next)=>{   //model - 불량type별 개수 
  const searchMonth = req.body.Dateinform.split('-')[0]+'-'+req.body.Dateinform.split('-')[1]

  const search_date_query = `SELECT A.model_name,
  (SELECT count(model_name) from public.production_model where is_inspection_good='t' and split_part(split_part(inspection_start,'-',3),' ',1) >= '1' and split_part(split_part(inspection_start,'-',3),' ',1) <= '30' and model_name=A.model_name) Count
  FROM (SELECT DISTINCT model_name from public.production_model) A
  ORDER BY Count DESC
  LIMIT 10`
  
  QueryExec(search_date_query).then(result=>{
    let temp_array = ['model','count']
    for(var prop_result in result)  temp_array.push(result[prop_result])
    
    response.send(temp_array)
  });
});


router.post('/Top10_Table_Information', (req, response, next)=>{   //model - 불량type별 개수 
  const searchMonth = req.body.Dateinform.split('-')[0]+'-'+req.body.Dateinform.split('-')[1]

  const search_date_query = `SELECT A.model_name,
  (SELECT count(model_name) from public.production_model where is_inspection_good='t' and split_part(split_part(inspection_start,'-',3),' ',1) = '1' and model_name=A.model_name) Good,
  (SELECT count(model_name) from public.production_model where is_inspection_good='f' and is_redecision_good = 't' and split_part(split_part(inspection_start,'-',3),' ',1) = '17' and model_name=A.model_name) Confirm,
  (SELECT count(model_name) from public.production_model where is_inspection_good='f' and is_redecision_good = 'f' and split_part(split_part(inspection_start,'-',3),' ',1) = '17' and model_name=A.model_name) NG
  FROM (SELECT DISTINCT model_name from public.production_model) A
  ORDER BY model_name ASC
  LIMIT 10`
  
  QueryExec(search_date_query).then(result=>{
    let temp_array = ['model','Good','Confirm','NG']
    for(var prop_result in result)  temp_array.push(result[prop_result])

    response.send(temp_array)
  });
});

const QueryExec = sql => new Promise ((resolve, reject)=>{
  client.query(sql).then(res=>{
    let temp_array = []
    
    for(var prop in res.rows)
    {
      temp_array.push(res.rows[prop])
    }
    resolve(temp_array)
  })
});

const makequery = res =>new Promise ((resolve, reject)=>{
  let queryArray = 'select'
  for(var prop in res)
  {
    queryArray += `(select count(is_inspection_good) from public.production_model where model_name='${res[prop].model_name}' and left(inspection_start,7) in('${res[prop].left}') and is_inspection_good='t') count${prop}`;
    if(prop != res.length-1) queryArray+=','
  }
   resolve(queryArray)
})