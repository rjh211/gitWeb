<script>
  import { Bar } from 'vue-chartjs'

const horizonalLinePlugin = {
  id: 'horizontalLine',
  afterDraw: function(chartInstance) {

    var yValue;
    var yScale = chartInstance.scales["y-axis-0"];
    var canvas = chartInstance.chart;
    var ctx = canvas.ctx;
    var index;
    var line;
    var style;

    if (chartInstance.options.horizontalLine) {

      for (index = 0; index < chartInstance.options.horizontalLine.length; index++) {
        line = chartInstance.options.horizontalLine[index];

        if (!line.style) {
          style = "#080808";
        } else {
          style = line.style;
        }

        if (line.y) {
          yValue = yScale.getPixelForValue(line.y);
        } else {
          yValue = 0;
        }
        ctx.lineWidth = 3;

        if (yValue) {
          window.chart = chartInstance;
          ctx.beginPath();
          ctx.moveTo(0, yValue);
          ctx.lineTo(canvas.width, yValue);
          ctx.strokeStyle = style;
          ctx.stroke();
        }

        if (line.text) {
          ctx.fillStyle = style;
          ctx.fillText(line.text, 0, yValue + ctx.lineWidth);
        }
      }
      return;
    }
  }
}

  export default {
    components:'line-chart',
    extends: Bar,
    beforeMount(){
      this.addPlugin(horizonalLinePlugin)
    },
    props:{
      Graph_Information : []
    },
    data () {
      return {
        datacollection: {
          labels: this.Graph_Information[0],
          datasets: [
            this.Graph_Information[1]
          ]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }],
            xAxes: [ {
              gridLines: {
                display: false
              }
            }]
          },
          legend: {
            display: true
          },
          responsive: true,
          maintainAspectRatio: false
        }
      }
    },
  mounted () {
    this.renderChart({
      labels: this.Graph_Information[0],
      datasets: this.Graph_Information[1]
    }, {
      responsive: true, 
      maintainAspectRatio: false,
      scales: {
        xAxes: [{
          stacked: true,          //stacked bar chart option
          categoryPercentage: 0.5,
          barPercentage: 1
        }],
        yAxes: [{
          stacked: true
        }]
      }
    })
  }
  }
</script>