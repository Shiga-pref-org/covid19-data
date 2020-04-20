<template>
  <v-col cols="12" md="6" class="DataCard">
    <time-bar-chart
      :title="$t('PCR検査実施件数')"
      :title-id="'number-of-tests'"
      :chart-id="'time-bar-chart-tnumber-of-tests'"
      :chart-data="testsGraph"
      :date="Data.tests.date"
      :unit="$t('件')"
    />
  </v-col>
</template>

<i18n>
{
  "ja": {
    "帰国者・接触者専門外来受診件数": "PCR検査実施件数",
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
    // 検査実施数グラフ
    const testsGraph = formatGraph(Data.tests.data)

    const data = {
      Data,
      testsGraph
    }
    return data
  }
}
</script>
