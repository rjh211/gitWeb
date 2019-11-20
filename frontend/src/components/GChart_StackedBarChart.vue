<template>
  <div id="app">
    <GChart
      type="ColumnChart"
      :data="this.data"
      :options="chartOptions"
      :settings="{ packages: ['corechart', 'table', 'map'] }"
    />
    <button @click="updateData">Click to change data</button>  
    <input type="checkbox" @click="showGra">
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
      chartDataHeader: ['Year', 'Sales', 'Expenses', 'Profit'],
      chartDataRows: [
        ['2014', 1, 1, 1],
        ['2015', 1, 1, 1],
        ['2016', 1, 1, 1],
        ['2017', 1, 1, 1]
      ],
      data :[
        ['Year', 'Sales', 'Expenses', 'Profit'],
        ['2014', 1, 1, 1],
        ['2015', 1, 1, 1],
        ['2016', 1, 1, 1],
        ['2017', 1, 1, 1]],
      updatedChartData: [],
      setCell:{
        color:'red'
      },
      chartOptions: {
        chart: {
          title: 'Company Performance',
          subtitle: 'Sales, Expenses, and Profit: 2014-2017',
        },
        series:{
          0:{color:'red'},
          1:{color:'yellow'},
          2:{color:'blue'}
        },
      }
    }
  },
  computed: {
    chartData () {
      return [ this.chartDataHeader, ...this.updatedChartData ]
    }
  },
  methods: {
    updateData () {
      this.updatedChartData = this.chartDataRows
        .map(row => {
          return row.map((item, index) => {
            if (index !== 0) {
              const max = item + 1000
              const min = 0
              return Math.floor(Math.random() * (max - min)) + min
            }
            return item
          })
        })
    },
    showGra(){
      console.log("test")
    }
  },
  created () {
    this.updateData()
  }
};
</script>
