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
  database: 'comformaldb',
  port : 5432
}


router.post('/Search_Production_Matter', (req, response, next)=>{
    const date = req.body.Dateinform          //Date-Picker 값
    let search_start = date[0]
    let search_end = date[1]
    let serialnum = req.body.SerialNum
    let modelname = req.body.ModelName
    let reviewnum = req.body.ReviewNum
    let is_default = req.body.Is_Default      //검색조건
    let search_date_Query = 'Select * from public.production_matter'
    
    if(serialnum!==''){serialnum = ` and serial = '${serialnum}'`}
    if(modelname!==''){modelname = ` and model = '${modelname}'`}
    if(reviewnum!==''){reviewnum = ` and review >= '${reviewnum}'`}
    if(is_default!==''){is_default = ` and defect = ${is_default}`}
    
    search_start = search_start.split('T')[0]
    search_end = search_end.split('T')[0]
    search_date_Query = search_date_Query + ` where inspect_time>='${search_start}' and inspect_time <= '${search_end}'${serialnum}${modelname}${reviewnum}${is_default}`;

    client.query(search_date_Query).then(res=>{
        client.query('SELECT * FROM public.production_matter where false').then(res_column=>{
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

router.post('/Search_Thickness_Measurement',(req, response, next)=>{
  const Search_Measurement_Query = `Select * from public.thickness_measurement where id >= '${req.body.MeasurementData[0]}' and  id <= '${req.body.MeasurementData[0]+1}' order by split_part(inspection_start,' ',1) desc`
  let Send_Data = []
  let Send_Table_Data = []
  let Send_Graph_Data =[]
  let Measure_Table_Data = ['id']
  let DefectData = ['is_defect']
  let Measure_Graph_Data = Measure_Table_Data
  let value_Data = ['value']

  client.query(Search_Measurement_Query).then(res_measure=>{
    const Rows = res_measure.rows;
    Rows.map(row=>{
      Measure_Table_Data.push(row.id)
      value_Data.push(row.value)
      DefectData.push(false);
    })

    if(req.body.MeasurementData[3]==true)
    {
      const Search_Defect_Query = `select * from public.defect_list where id >= '${req.body.MeasurementData[0]}' and  id <= '${req.body.MeasurementData[0]+1}' order by split_part(inspection_start,' ',1) desc`
      client.query(Search_Defect_Query).then(res_Defect=>{
        const Rows = res_Defect.rows;
        Rows.map(row=>{
          DefectData[(row.id.split('_')[1] * 1) + 1] = true;
        })
        Send_Table_Data.push(Measure_Table_Data)
        Send_Table_Data.push(DefectData)
        Send_Table_Data = r2c(Send_Table_Data)
        console.log(Send_Table_Data)

        Send_Graph_Data.push(Measure_Graph_Data)
        Send_Graph_Data.push(value_Data)
        Send_Graph_Data = r2c(Send_Graph_Data)

        Send_Data.push(Send_Table_Data)
        Send_Data.push(Send_Graph_Data)

        response.send(Send_Data)
      })
    }
    else{
      Send_Table_Data.push(Measure_Table_Data)
      Send_Table_Data.push(DefectData)
      Send_Table_Data = r2c(Send_Table_Data)

      Send_Graph_Data.push(Measure_Graph_Data)
      Send_Graph_Data.push(value_Data)
      Send_Graph_Data = r2c(Send_Graph_Data)

      Send_Data.push(Send_Table_Data)
      Send_Data.push(Send_Graph_Data)

      response.send(Send_Data)
    }
  })
})

router.post('/Search_Defect_Data',(req,response,next)=>{
  let Defect_Data=[]
  let Search_Defect_Query = ''
  if(req.body.DefectData[1]){Search_Defect_Query = `Select * from public.defect_list where id = '${req.body.DefectData[0]}' order by inspection_start asc`}
  else{Search_Defect_Query = `Select * from public.thickness_measurement where id = '${req.body.DefectData[0]}' order by inspection_start asc`}
  client.query(Search_Defect_Query).then(res=>{
    const Rows = res.rows
    Rows.map(row=>{
      let position = `(${row.position_x},${row.position_y},${row.position_width},${row.position_height})`

      Defect_Data.push(row.module)
      Defect_Data.push(row.target)
      Defect_Data.push(row.probe)
      Defect_Data.push(row.defectname)
      Defect_Data.push(position)
      Defect_Data.push(row.size)
      Defect_Data.push(row.review)
      Defect_Data.push(req.body.DefectData[1])
    })
    response.send(Defect_Data)
  })
  
})

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
        else console.log('Connect comformaldb!');
    })
}
  
module.exports = router;