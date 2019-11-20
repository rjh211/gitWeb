<template>
    <div class="picker alert alert-Info" role="alert">
        <h1 >검색 날짜</h1>
        <p class = "date">
            <date-picker v-model="range" lang="en" range type="date" format="YYYY-MM-DD" width="200" placeholder = "input date" @change="SendtoParents()" confirm></date-picker>
        </p>
        <hr>

        <h1>Lot Num</h1>
        <p class="list">
            <ul v-for="item in msg" v-bind:key="item">
                <button @click="SendLotnum(item)" type="button" class="list-group-item list-group-item-action" data-toggle="tooltip" data-placement="left" title="Tooltip on left">
                    {{item}}
                </button>
                <br>
            </ul>
        </p>
    </div>
</template>
    


<script>
import DatePicker from 'vue2-datepicker'

export default {
    data(){
        return {
            // Array will be automatically processed with visualization.arrayToDataTable function
            timePickerOptions:{
                start : '00:00',
                step : '00:30',
                end: '23:30'
            },
            range:'',
            items:[ [ "2019-5-6", "2019-5-24", "2019-6-24", "2019-6-30", "2019-7-9", "2019-7-21", "2019-8-1", "2019-8-19", "2019-8-22", "2019-8-28" ], [ "Lot1", "Lot2", "Lot3", "Lot4", "Lot5", "Lot6", "Lot7", "Lot8", "Lot9", "Lot10" ] ]
        }
    },
    components:{
        DatePicker
    },
    methods:{
        SendtoParents(){
            this.$emit('Date-evnet', this.range)
        },
        SendLotnum(num){
            this.$emit('SendLotNum', num)
        }
    },
    props : {
        msg:[],
    }
}
</script>

<style>
    .picker{
        text-align: center;
        margin-left: 10px;
        border: 1px solid; float: left; width: 32%; height: 50%;
    }
    .list{
        text-align: center;
        float: left;
        width: 100%;
        line-height: 0%;
    }

</style>