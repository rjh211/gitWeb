<template>
    <div id="table">
        <h1>GChart Table</h1>
        <p id >
            <GChart
                type="Table"
                :data="msg.data"
                :options="chartOptions"
                :resizeDebounce="500"
            />        
        </p>
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
    #table{
        text-align: center;
        margin-left: 10px;
        border: 1px solid; float: right; width: 66%; height: 30%;
    }
</style>