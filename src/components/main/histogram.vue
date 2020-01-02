<template>
  <div>
    <div class="histogram">
      <div class="histogram-header">
        <div class="histogram-title">收费情况</div>
      </div>
      <div id="myChart"
           style="width: 90%;height:400px;"></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  mounted () {
    this.drwaLine()
  },
  methods: {
    drwaLine () {
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      let option = {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '金额（元）',
            type: 'bar',
            barWidth: '60%',
            data: [0, 3000, 5000, 7000, 9000, 12000, 15000, 6000, 1, 155, 6000, 11]
          }
        ]
      }
      myChart.setOption(option)
    }
  },
}
</script>

<style lang="scss">
.histogram {
  width: 97%;
  margin-top: 20px;
  margin-left: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
  text-align: center;
  background-color: #fff;
  .histogram-header {
    height: 40px;
    text-align: left;
    border-bottom: 1px solid #ccc;
    .histogram-title {
      font-size: 18px;
      font-weight: 700;
      height: 100%;
      line-height: 40px;
      margin: 10px 0 0 10px;
    }
  }
}
</style>
