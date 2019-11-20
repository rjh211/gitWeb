<template>
    <div id = "linechart">
        <h1>GChart LineChart</h1>
        <GChart 
            type="LineChart"
            :data="msg.data"
            :options="chartOptions"
        />
    </div>
</template>

<script>
export default {
        data(){
        return {
            // Array will be automatically processed with visualization.arrayToDataTable function
            chartOptions: {
                chart: {
                title: 'Company Performance',
                subtitle: 'Sales, Expenses, and Profit: 2014-2017',
                }
            }
        }
    },
    props : {
        msg : []
    }
}
</script>

<style>
    #linechart{
        text-align: center;
        margin-left: 10px;
        border: 1px solid; float: right; width: 66%; height: 30%;
    }
</style>