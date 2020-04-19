<template>
  <v-col cols="12" md="6" class="DataCard">
    <time-bar-chart
      :title="$t('一般相談 相談件数')"
      :title-id="'number-of-general-querents'"
      :chart-id="'time-bar-chart-number-of-general-querents'"
      :chart-data="generalQuerentsGraph"
      :date="Data.generalQuerents.date"
      :unit="$t('件')"
    />
  </v-col>
</template>

<i18n>
{
  "ja": {
    "一般相談 相談件数": "一般相談 相談件数",
    "件": "件"
  }
}
</i18n>

<script>
import Data from '@/data/data.json'
import formatGraph from '@/utils/formatGraph'
import TimeBarChart from '@/components/TimeBarChart.vue'

export default {
  components: {
    TimeBarChart
  },
  data() {
    // 一般相談 相談数グラフ
    const generalQuerentsGraph = formatGraph(Data.generalQuerents.data)

    const data = {
      Data,
      generalQuerentsGraph
    }
    return data
  }
}
</script>
