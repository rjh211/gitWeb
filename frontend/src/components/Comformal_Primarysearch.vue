<template>
    <div id = "primary">
        <h1>Primary Search</h1>
        <h1><span class="badge badge-danger">{{alertmsg}}</span></h1>
        <br>
        <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default">날짜</span>
            <date-picker v-model="range" lang="en" range type="date" format="YYYY-MM-DD" width="30%" placeholder = "input date" @change="SendQuery(is_default)" confirm></date-picker>
        </div>
        <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default">시리얼</span>
            <input type="text" v-model="serial" class="form-control" placeholder="Input Serial Number" @keyup.enter="SendQuery(is_default)">
        </div>
        
        <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default">모델</span>
            <input type="text" v-model="model" class="form-control" placeholder="Input Model Name" @keyup.enter="SendQuery(is_default)">
        </div>
        
        <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default">리뷰 여부</span>
            <input type="text" v-model="primary_reviewnum" class="form-control" placeholder="Input review Num" @keyup.enter="SendQuery(is_default)">
        </div>

        <div class = "input-group-prepend">
            불량 여부 : 
            <button type="button" class="btn btn-outline-primary" @click="SendQuery('true')">True</button>
            <button type="button" class="btn btn-outline-primary" @click="SendQuery('false')">False</button>
            <button type="button" class="btn btn-outline-primary" @click="SendQuery('')">All</button>
        </div>

        <button type="button" class="btn btn-outline-primary" @click="SendQuery(is_default)">조 회</button>

        <hr>
        <h1>생산 사항 Table</h1>
        <GChart
        type="Table"
        :data="Thickness.data"
        :options="chartOptions"
        :events="chartEvents"
        ref="gChart"/>
        
        <hr>
    </div>
</template>
    


<script>
import DatePicker from 'vue2-datepicker'

export default {
    data(){
        return {
            range:'', serial:'', model:'', primary_reviewnum:'', alertmsg:'', is_default:'', 

            chartOptions:{
                chart: {
                    title: 'Thickenss Measurement',
                    subtitle: 'Thickness Measurement',
                },
                    width:"100%",
                    height:"auto",
                    cssClassNames:{
                    tableCell:'testfont'
                }
            },

            chartEvents:{
                    select: ()=>{
                    const table = this.$refs.gChart.chartObject;
                    const selection = table.getSelection();
                    
                    this.$emit('MeasurementTable-event', this.Thickness.data[selection[0].row+1])
                }
            },
        }
    },
    components:{
        DatePicker
    },
    methods:{
        SendQuery(state){
            if(this.range !== '')
            {
                this.is_default=state
                this.$emit('Search-evnet', this.range,this.serial,this.model,this.primary_reviewnum, this.is_default)
            }
            else{ this.alertmsg = 'Select Date First!' }
        },
    },
  props:{
    Thickness : []
  }
}
</script>

<style>
    .input-group-prepend{
        margin-top: 1%
    }
    .testfont{
        font-size: 15px;
        font-style: italic;
    }
</style>