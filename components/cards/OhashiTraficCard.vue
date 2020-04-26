<template>
  <v-col cols="12" md="6" class="DataCard">
    <ohashi-trafic-bar-chart
      :title="$t('琵琶湖大橋通行台数')"
      :title-id="'ohashi-trafic'"
      :chart-id="'ohashi-trafic-bar-chart'"
      :chart-data="ohashiGraph"
      :chart-option="ohashiGraphOption"
      :date="ohashiGraph.date"
    />
  </v-col>
</template>

<i18n src="./OhashiTrafic.i18n.json"></i18n>

<script>
import Data from '@/data/data.json'
import OhashiTraficBarChart from '@/components/OhashiTraficBarChart.vue'

export default {
  components: {
    OhashiTraficBarChart
  },
  data() {
    // TODO: ダミーデータ
    const ohashiGraph = {
      datasets: [
        {
          label: '3/1',
          data: [3500, 3000]
        },
        {
          label: '3/2',
          data: [3500, 3000]
        },
        {
          label: '3/3',
          data: [3510, 3020]
        },
        {
          label: '3/4',
          data: [3430, 2890]
        },
        {
          label: '3/5',
          data: [3680, 2990]
        },
        {
          label: '3/6',
          data: [3900, 2240]
        },
        {
          label: '3/7',
          data: [3200, 2260]
        },
        {
          label: '3/8',
          data: [4513, 2360]
        },
        {
          label: '3/9',
          data: [3300, 2460]
        },
        {
          label: '3/10',
          data: [3500, 3000]
        },
        {
          label: '3/11',
          data: [3500, 3000]
        },
        {
          label: '3/12',
          data: [3500, 3000]
        },
        {
          label: '3/13',
          data: [3510, 3020]
        },
        {
          label: '3/14',
          data: [3430, 2890]
        },
        {
          label: '3/15',
          data: [3680, 2990]
        },
        {
          label: '3/16',
          data: [3900, 2240]
        },
        {
          label: '3/17',
          data: [3200, 2260]
        },
        {
          label: '3/18',
          data: [4513, 2360]
        },
        {
          label: '3/19',
          data: [3300, 2460]
        },
        {
          label: '3/20',
          data: [3500, 3000]
        },
        {
          label: '3/21',
          data: [3500, 3000]
        },
        {
          label: '3/22',
          data: [3500, 3000]
        },
        {
          label: '3/23',
          data: [3510, 3020]
        },
        {
          label: '3/24',
          data: [3430, 2890]
        },
        {
          label: '3/25',
          data: [3680, 2790]
        },
        {
          label: '3/26',
          data: [3900, 2240]
        },
        {
          label: '3/27',
          data: [3200, 1260]
        },
        {
          label: '3/28',
          data: [4513, 1360]
        },
        {
          label: '3/29',
          data: [3300, 1460]
        },
        {
          label: '3/30',
          data: [3300, 1060]
        },
        {
          label: '4/1',
          data: [4513, 960]
        },
        {
          label: '4/2',
          data: [3300, 900]
        }
      ],
      labels: ['2019年', '2020年'],
      base_period: '昨年',
      date: '2020/04/02'
    }
    // ohashiGraph ツールチップ title文字列
    // this.$t を使うため ohashiGraphOption の外側へ
    const ohashiGraphTooltipTitle = (tooltipItems, _) => {
      const label = tooltipItems[0].label
      return this.$t('日付: {duration}', {
        // duration = label = '2月10日~14日' | '2月17日~21日' | '2月25日~28日'
        duration: this.$t(label)
      })
    }
    // ohashiGraph ツールチップ label文字列
    // this.$t を使うため ohashiGraphOption の外側へ
    const ohashiGraphTooltipLabel = (tooltipItem, data) => {
      if (tooltipItem.datasetIndex === 0) {
        const currentData = data.datasets[0]
        return this.$t('{duration}の通行台数: {trafic}台', {
          duration: this.$t(ohashiGraph.base_period),
          trafic: currentData.data[tooltipItem.index]
        })
      } else {
        const currentData = data.datasets[1]
        const pastData = data.datasets[0]
        const percentage = Math.round(
          (100 * currentData.data[tooltipItem.index]) /
            pastData.data[tooltipItem.index]
        )
        return this.$t('{duration}の通行台数との相対値: {percentage}%', {
          duration: this.$t(ohashiGraph.base_period),
          percentage
        })
      }
    }

    const data = {
      Data,
      ohashiGraph,
      ohashiGraphOption: {
        responsive: true,
        legend: {
          display: true,
          onHover: e => {
            e.currentTarget.style.cursor = 'pointer'
          },
          onLeave: e => {
            e.currentTarget.style.cursor = 'default'
          },
          labels: {
            boxWidth: 20
          }
        },
        scales: {
          xAxes: [
            {
              stacked: false,
              gridLines: {
                display: false
              },
              ticks: {
                fontSize: 9,
                maxTicksLimit: 20,
                fontColor: '#808080',
                maxRotation: 0,
                minRotation: 0,
                callback: label => {
                  return label.split('/')[1]
                }
              }
            },
            {
              id: 'month',
              stacked: true,
              gridLines: {
                drawOnChartArea: false,
                drawTicks: true,
                drawBorder: false,
                tickMarkLength: 10
              },
              ticks: {
                fontSize: 11,
                fontColor: '#808080',
                padding: 3,
                fontStyle: 'bold',
                gridLines: {
                  display: true
                },
                callback: label => {
                  const monthStringArry = [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec'
                  ]
                  const month = monthStringArry.indexOf(label.split(' ')[0]) + 1
                  return month + '月'
                }
              },
              type: 'time',
              time: {
                unit: 'month'
              }
            }
          ],
          yAxes: [
            {
              stacked: false,
              gridLines: {
                display: true
              },
              ticks: {
                suggestedMin: 0,
                fontSize: 12,
                maxTicksLimit: 10,
                fontColor: '#808080',
                callback(value) {
                  return value.toFixed(0)
                }
              }
            }
          ]
        },
        tooltips: {
          displayColors: false,
          callbacks: {
            title: ohashiGraphTooltipTitle,
            label: ohashiGraphTooltipLabel
          }
        }
      }
    }
    return data
  }
}
</script>
