<template>
    <div id="comformal">
        <Primarysearch :Model_Information = Model_Data :Production_Information = Product_Data :Thickness_Information = Thickness_Data  
        @Search-event="sendDateMsg" 
        @Product-event="sendProductMsg" 
        @Graph-event="sendGraphMsg"
        @Column-event="sendColumnMsg"
        @Thickness-event="sendThicknessMsg"
        @ModelList-event="sendModelListMsg"
        @MonthlyDefectCount-event="sendMonthCountMsg"
        @MonthlydayCount-event="sendMonthlydayCountMsg"
        />

        <ComboBox :modellist = ModelList_Data></ComboBox>

        <h3>일별 불량 차트</h3>
        <GoogleStackedBarChart :msg = Graph_Data></GoogleStackedBarChart>
        <h3>모델별 차트</h3>
        <GoogleStackedBarChart :msg = Column_Data></GoogleStackedBarChart>
        <h3>월별 불량 차트</h3>
        <GoogleStackedBarChart :msg = MonthlyCount_Data></GoogleStackedBarChart>
        <h3>월별 정상 개수</h3>
        <GoogleStackedBarChart :msg = MonthlydayCount_Data></GoogleStackedBarChart>
        
        <!-- <BarChart :Graph_Information = Graph_Data></BarChart> -->
    </div>
</template>

<script>
import BarChart from '../components/New_Chartjs_BarChart.vue'
import Primarysearch from '@/components/New_Comformal_Primarysearch.vue'
import GoogleStackedBarChart from '@/components/New_GChart_StackedBarChart.vue'
import ComboBox from '@/components/New_Comformal_ComboBox.vue'
export default {
    data(){
        return{
            Model_Data:[],
            Product_Data:[],
            Graph_Data:[],
            Column_Data:[],
            Thickness_Data:[],
            ModelList_Data:[],
            MonthlyCount_Data:[],
            MonthlydayCount_Data : []
        }
    },
    components:{
        Primarysearch,
        BarChart,
        GoogleStackedBarChart,
        ComboBox
    },
    methods:{
        sendDateMsg(range){
            this.$http.post('/newComformal/Model_Information',{Dateinform:range})
            .then(req=>{
                this.Model_Data=req;
            })
        },
        sendProductMsg(range){
            this.$http.post('/newComformal/Product_Information',{Dateinform:range})
            .then(req=>{
                this.Product_Data=req;
            })
        },
        sendGraphMsg(range){
            this.$http.post('/newComformal/Week_Stacked_Graph_Information',{Dateinform:range})
            .then(req=>{
                this.Graph_Data = req;
            })
        },
        sendColumnMsg(range){
            this.$http.post('/newComformal/Week_Column_Graph_Information',{Dateinform:range})
            .then(req=>{
                this.Column_Data = req;
            })
        },
        sendThicknessMsg(){
            this.$http.post('/newComformal/Thickness_Information')
            .then(req=>{
                this.Thickness_Data=req;
            })
        },
        sendModelListMsg(range){
            this.$http.post('newComformal/ModelList_Information',{Dateinform:range})
            .then(req=>{
                this.ModelList_Data=req.data;
            })
        },
        sendMonthCountMsg(month_range){
            this.$http.post('newComformal/MonthlyCount_Information',{Dateinform:month_range})
            .then(req=>{
                this.MonthlyCount_Data = req.data;
            })
        },
        sendMonthlydayCountMsg(month_range){
            this.$$http.post('Monthly_day_Count_Information',{Dateinform:month_range})
            .then(req=>{
                this.MonthlydayCount_Data = req.data
                console.log(req.data)
            })
        }
    }
}
</script>