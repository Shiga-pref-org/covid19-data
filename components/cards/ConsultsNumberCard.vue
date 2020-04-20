<template>
  <v-col cols="12" md="6" class="DataCard">
    <time-bar-chart
      :title="$t('帰国者・接触者専門外来受診件数')"
      :title-id="'number-of-consultation'"
      :chart-id="'time-bar-chart-number-of-consulation'"
      :chart-data="consultsGraph"
      :date="Data.consults.date"
      :unit="$t('件')"
    />
  </v-col>
</template>

<i18n>
{
  "ja": {
    "帰国者・接触者専門外来受診件数": "帰国者・接触者専門外来受診件数",
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
    // 受診数グラフ
    const consultsGraph = formatGraph(Data.consults.data)

    const data = {
      Data,
      consultsGraph
    }
    return data
  }
}
</script>
