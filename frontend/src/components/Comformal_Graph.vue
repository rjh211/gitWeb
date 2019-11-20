<template>
    <div id = "Value_Graph">
        <h1>Value Graph</h1>
        <GChart 
            type="LineChart"
            :data="Graph"
            :options="chartOptions"
        />
    </div>
</template>

<script>
export default {
        data(){
        return {
            chartOptions: {
                chart: {
                title: 'Value Graph',
                }
            },
        }
    },
    props : {
        Graph : []
    }
}
</script>

<style>
    #google-visualization-errors-0 {
    display:none;
    }
</style>