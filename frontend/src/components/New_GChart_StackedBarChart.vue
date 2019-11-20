<template>
  <div id="app">
    <GChart
      type="ColumnChart"
      :data="msg.data"
      :options="chartOptions"
    />
  </div>
</template>

<script>
import { GChart } from "vue-google-charts";
export default {
  name: "App",
  components: {
    GChart
  },
  data () {
    return {
      chartOptions: {
        chart: {
          title: 'Company Performance',
          subtitle: 'Sales, Expenses, and Profit: 2014-2017'
        },
        isStacked: true,
        series:{
          0:{color:'green'},
          1:{color:'yellow'},
          2:{color:'red'}
        }
      }
    }
  },
  props : {
      msg : []
  }
};
</script>
