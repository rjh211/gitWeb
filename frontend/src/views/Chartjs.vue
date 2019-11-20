<template>
  <section class="container">
    <h1>Stacked Bar Chart</h1>
      <div class="column">
        <h3>vue-chart.js</h3>
        <BarChart></BarChart>
      </div>
      
      <div class="column">
        <h3>vue-googlechart</h3>
        <GoogleBarchart></GoogleBarchart>
      </div>
  </section>
</template>

<script>
  import BarChart from '../components/Chartjs_BarChart.vue'
  import GoogleBarchart from '../components/GChart_StackedBarChart.vue'
  export default {
    name: 'VueChartJS',
    components: {
      BarChart,
      GoogleBarchart
    },
    data () {
      return {
        datacollection: null
      }
    },
    created () {
      this.fillData()
    },
    methods: {
      fillData () {
        this.datacollection = {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets: [
            {
              label: 'Data One',
              backgroundColor: '#f87979',
              // Data for the x-axis of the chart
              data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
            }
          ]
        }
      },
      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      }
    }
  }
</script>