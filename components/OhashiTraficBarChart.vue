<template>
  <data-view :title="title" :title-id="titleId" :date="date">
    <template v-slot:button>
      <data-selector-2 v-model="dataKind" :target-id="chartId" />
    </template>
    <line-chart
      :chart-id="chartId"
      :chart-data="displayData"
      :options="chartOption"
      :height="240"
    />
    <template v-slot:infoPanel>
      <data-view-basic-info-panel
        :l-text="displayInfo.lText"
        :s-text="displayInfo.sText"
        :unit="displayInfo.unit"
      />
    </template>

    <ul>
      <li v-if="dataKind == 'transition'" class="ohashi-note">
        {{ $t('日付は2019年を基準にして両年の同じ曜日を表示しています') }}
      </li>
      <li v-if="dataKind == 'average'" class="ohashi-note">
        {{ $t('日付は2020年を基準にして表示しています') }}
      </li>
      <li v-if="dataKind == 'average'" class="ohashi-note">
        {{ $t('値は過去7日間の通行台数の平均を示します') }}
      </li>
    </ul>
  </data-view>
</template>

<i18n src="./OhashiTraficBarChart.i18n.json"></i18n>

<style lang="scss">
.ohashi-note {
  list-style: none;
  &::before {
    content: '※';
  }
  font-size: 12px;
  color: rgb(128, 128, 128);
}
.OhashiGraph {
  &-Desc {
    margin-top: 10px;
    margin-bottom: 0 !important;
    font-size: 12px;
    color: $gray-3;
  }
}
</style>

<script>
// import moment from 'moment'
import DataView from '@/components/DataView.vue'
import DataSelector2 from '@/components/DataSelector2.vue'
import DataViewBasicInfoPanel from '@/components/DataViewBasicInfoPanel.vue'

export default {
  components: { DataView, DataSelector2, DataViewBasicInfoPanel },
  props: {
    title: {
      type: String,
      required: false,
      default: ''
    },
    titleId: {
      type: String,
      required: false,
      default: ''
    },
    chartId: {
      type: String,
      required: false,
      default: 'metro-bar-chart'
    },
    chartData: {
      type: Object,
      required: false,
      default: () => {}
    },
    chartOption: {
      type: Object,
      required: false,
      default: () => {}
    },
    date: {
      type: String,
      required: true,
      default: ''
    }
  },
  data() {
    return { dataKind: 'transition' }
  },
  computed: {
    displayInfo() {
      if (this.dataKind !== 'transition' && this.dataKind !== 'average') {
        // invalid data case
        return {
          lText: '',
          sText: '',
          unit: ''
        }
      } else {
        const { datasets } = this.chartData[this.dataKind]
        const lastData = datasets[datasets.length - 1]

        return {
          lText: lastData.data[1].toLocaleString(),
          sText: this.$t('{date} 前年の同時期との比較: {percent}%', {
            date: lastData.label,
            percent: Math.round((100 * lastData.data[1]) / lastData.data[0])
          }),
          unit: this.$t('台')
        }
      }
    },

    displayData() {
      if (this.dataKind !== 'transition' && this.dataKind !== 'average') {
        return {
          labels: [],
          datasets: []
        }
      } else {
        const { datasets, labels } = this.chartData[this.dataKind]
        return {
          labels: datasets.map(d => `${d.label}`),
          datasets: labels.map((label, i) => {
            return {
              label,
              data: datasets.map(d => d.data[i]),
              fill: false,
              borderColor: arg => {
                const {
                  // dataIndex,
                  // datasetIndex,
                  dataset: { label: year }
                } = arg
                const weekdayColors = ['#c0e2f0', '#30b9f0']
                return weekdayColors[labels.indexOf(year)]
              },

              backgroundColor: arg => {
                const {
                  // dataIndex,
                  // datasetIndex,
                  dataset: { label: year }
                } = arg
                const weekdayColors = ['#c0e2f0', '#30b9f0']
                return weekdayColors[labels.indexOf(year)]
                // let isWeekend = false
                // try {
                //   const [month, date] = datasets[dataIndex].label
                //     .split('/')
                //     .map(x => parseInt(x, 10))
                //   const day = moment()
                //     .year(year)
                //     .month(month - 1)
                //     .date(date)
                //     // 2019 vs 2020 の曜日のズレ
                //     .add(datasetIndex === 0 ? 0 : -2, 'days')
                //     .day()
                //   isWeekend = day === 0 || day === 6
                // } catch (err) {
                //   // stand for Chart Update
                // }
                // const weekendColors = ['#f0c0e2', '#f030b9']
                // const weekdayColors = ['#c0e2f0', '#30b9f0']

                // if (this.dataKind === 'transition' && isWeekend) {
                //   return weekendColors[labels.indexOf(year)]
                // } else {
                //   return weekdayColors[labels.indexOf(year)]
                // }
              },
              borderWidth: 0
            }
          })
        }
      }
    }
  }
}
</script>
