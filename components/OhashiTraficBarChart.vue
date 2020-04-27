<template>
  <data-view :title="title" :title-id="titleId" :date="date">
    <template v-slot:button>
      <data-selector-2 v-model="dataKind" :target-id="chartId" />
    </template>
    <bar
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
  </data-view>
</template>

<i18n src="./OhashiTraficBarChart.i18n.json"></i18n>

<style lang="scss">
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

// const determineColor = (yearIndex, year, month, date) => {
//   const day = moment()
//     .year(year)
//     .month(month - 1)
//     .date(date)
//     .day()
//   // 日曜日 day = 0
//   // 土曜日 day = 6
//   // console.log(
//   //   moment()
//   //     .year(year)
//   //     .month(month - 1)
//   //     .date(date)
//   //     .format('YYYY-MM-DD ddd')
//   // )
//   const colors = {
//     sunday: ['#f0c0e2', '#f030b9'],
//     satuarday: ['#c0e2f0', '#30b9f0'],
//     weekday: ['#d9d9d9', '#8f8f8f']
//   }
//   const dayKey = day === 0 ? 'sunday' : day === 6 ? 'sunday' : 'satuarday'
//   return colors[dayKey][yearIndex]
// }

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
        return {
          lText: '',
          sText: '',
          unit: ''
        }
      } else {
        const { datasets } = this.chartData[this.dataKind]
        const lastData = datasets[datasets.length - 1]

        return {
          lText: lastData.data[0],
          sText: lastData.label,
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
              backgroundColor: ({ dataIndex, datasetIndex }) => {
                console.log(dataIndex, datasetIndex)
                return '#121212'
                // const year = labels[dataIndex]
                // const [month, date] = dataset.label
                //   .split('/')
                //   .map(x => parseInt(x, 10))
                // return determineColor(datasetIndex, year, month, date)
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
