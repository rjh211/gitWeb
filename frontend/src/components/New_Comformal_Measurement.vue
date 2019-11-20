<template>
  <div id="measurement">
    <h1>Measurement Table</h1>

    <GChart
    type="Table"
    :data="Measurement"
    :options="chartOptions"
    :events="chartEvents"
    ref="gChart"/>
  </div>
</template>

<script>
export default {
  data(){
    return{
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
          
          this.$emit('DefectData-event', this.Measurement[selection[0].row+1])
        }
      },
      sendMeasurementData:''
    }
  },
  props:{
    Measurement : []
  }
};
</script>

<style>

</style>