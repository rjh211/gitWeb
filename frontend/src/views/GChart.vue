<template>
  <div class="app">
    <Datepicker :msg = LotData @Date-evnet = "sendDateMsg" @SendLotNum="getLotData" />
    <p class = "about">
      <GoogleTable :msg = PostgreData />
      <GoogleLineChart :msg = PostgreData />
    </p>
    <hr>
  </div>
</template>

<script>
import GoogleTable from '@/components/GChart_Table.vue'
import Datepicker from '@/components/GChart_Date.vue'
import GoogleLineChart from '@/components/GChart_LineChart.vue'

//import axios from 'axios'
export default {
  data(){
    return {
      PostgreData:[],
      LotData:[]
    }
  },
    components:{
        GoogleTable,
        Datepicker,
        GoogleLineChart
    },
    methods:{
      sendDateMsg(mesg){
        this.$http.post('/Postgresql/Parse',{
                dateRange : mesg
            })
        this.$http.post('/Postgresql/Lotlist',{
          dateRange : mesg
        }).then(req=>{
          this.LotData = req.data
        })
      },
      getLotData(msg){
        this.$http.post('/Postgresql/Getlot',{
          Lotnum : msg
        }).then(req=>{
          this.PostgreData = req
          console.log(req)
        })
      }
    }
}
</script>