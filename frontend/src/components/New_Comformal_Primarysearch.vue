<template>
    <div id = "primary">
        <br>
        <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default">기간별 조회</span>
            <date-picker v-model="range" lang="en" range type="date" format="YYYY-MM-DD" width="30%" placeholder = "input date" @change="SendQuery(is_default)" confirm></date-picker>
            <button type="button" class="btn btn-outline-primary" @click="SendQuery(is_default)">조 회</button>
        </div>

        <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default">월별 조회</span>
            <date-picker v-model="month_range" lang="en" type="month" format="YYYY-MM" width="30%" placeholder = "input date" @change="SendMonthQuery(is_default1)" confirm></date-picker>
            <button type="button" class="btn btn-outline-primary" @click="SendMonthQuery(is_default1)">조 회</button>
        </div>


        <hr>
        <h1>Table</h1>
        <GChart type="Table" :data="Model_Information.data" :options="modelchartOptions" :events="modelchartEvents" ref="gChart"/>
        <GChart type="Table" :data="Production_Information.data" :options="productionchartOptions" :events="productionchartEvents" ref="gChart"/>
        <GChart type="Table" :data="Thickness_Information.data" :options="ThicknesschartOptions" :events="ThicknesschartEvents" ref="gChart"/>
        <hr>
        <hr>
        <h1>Graph</h1>
        
        <hr>
    </div>
</template>
    


<script>
import DatePicker from 'vue2-datepicker'

export default {
    data(){
        return {
            is_default,
            alertmsg,
            range,
            month_range,
            modelchartOptions:{
                chart: {
                    title: 'Model_Information',
                    subtitle: 'Model_Information',
                },
                    width:"100%",
                    height:"auto",
                    cssClassNames:{
                    tableCell:'testfont'
                }
            },
            modelchartEvents:{
                    select: ()=>{
                    const table = this.$refs.gChart.chartObject;
                    const selection = table.getSelection();
                    
                    this.$emit('MeasurementTable-event', this.Model_Information.data[selection[0].row+1])
                }
            },
            productionchartOptions:{
                chart: {
                    title: 'Product_Information',
                    subtitle: 'Product_Information',
                },
                    width:"100%",
                    height:"auto",
                    cssClassNames:{
                    tableCell:'testfont'
                }
            },
            productionchartEvents:{
                    select: ()=>{
                    const table = this.$refs.gChart.chartObject;
                    const selection = table.getSelection();
                    
                    this.$emit('ProductTable-event', this.Production_Information.data[selection[0].row+1])
                }
            },
            ThicknesschartOptions:{
                chart: {
                    title: 'Thickness_Information',
                    subtitle: 'Thickness_Information',
                },
                    width:"100%",
                    height:"auto",
                    cssClassNames:{
                    tableCell:'testfont'
                }
            },
            ThicknesschartEvents:{
                    select: ()=>{
                    const table = this.$refs.gChart.chartObject;
                    const selection = table.getSelection();
                    
                    this.$emit('Thickness-event', this.Thickness_Information.data[selection[0].row+1])
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
                this.$emit('Search-event', this.range)
                this.$emit('Product-event', this.range)
                this.$emit('Thickness-event')
                this.$emit('Graph-event', this.range)
                this.$emit('Column-event', this.range)
                this.$emit('ModelList-event',this.range)
            }
            else{ this.alertmsg = 'Select Date First!' }
        },
        SendMonthQuery(state){
            if(this.month_range !== '')
            {
                this.is_default1=state
                this.$emit('MonthlyDefectCount-event', this.month_range)
                
            }
            else{ this.alertmsg = 'Select Date First!' }
        },
    },
  props:{
    Model_Information : [],
    Production_Information : [],
    Thickness_Information : [],
    Graph_Information : []
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