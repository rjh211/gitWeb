<template>
    <div id="comformal">
        <Primarysearch :Thickness = Production_Data @Search-evnet="sendDateMsg" @MeasurementTable-event="sendMeasurementMsg" />
        <Measurement :Measurement = Measurement_Data @DefectData-event="SendDefectMsg" />
        <Defect :Defect = Defect_Data />
        <Graph :Graph = Graph_Data />
    </div>
</template>

<script>
import Primarysearch from '@/components/Comformal_Primarysearch.vue'
import Defect from '@/components/Comformal_Defect.vue'
import Measurement from '@/components/Comformal_Measurement.vue'
import Graph from '@/components/Comformal_Graph.vue'
export default {
    data(){
        return{
            Production_Data:[],
            Measurement_Data:[],
            Defect_Data:[],
            Graph_Data:[]
        }
    },
    components:{
        Primarysearch,
        Defect,
        Measurement,
        Graph
    },
    methods:{
        sendDateMsg(range,serial,model,primary_reviewnum,is_default){
            this.$http.post('/Search_Production_Matter',{Dateinform:range, SerialNum:serial, ModelName:model, ReviewNum:primary_reviewnum, Is_Default:is_default})
            .then(req=>{
                this.Production_Data=req;
            })
        },
        sendMeasurementMsg(MeasurementData){
            this.$http.post('/Search_Thickness_Measurement',{MeasurementData}).then(req=>{
                this.Measurement_Data=req.data[0];
                this.Graph_Data=req.data[1];
            })
        },
        SendDefectMsg(DefectData){
            this.$http.post('/Search_Defect_Data',{DefectData}).then(req=>{
                this.Defect_Data=req.data;
            })
        }
    }
}
</script>