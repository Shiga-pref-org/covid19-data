const fs = require('fs')
const moment = require('moment-timezone')
const getCSV = require('./getCSV.js')
const data = {} // Final product

moment.tz.setDefault('Asia/Tokyo')

// Generate /data/data.json.
const attrCSVUrl =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vQkSimAq6YKVyhqHy7wyEvL6-TeGmiNntRhP3iK5041mD900GYcjUKylMZIAJEIZzew9pCGfQ1AA-Ge/pub?gid=1551840287&single=true&output=csv'
const attrPromise = new Promise(resolve => {
  getCSV(attrCSVUrl).then(res => {
    res.forEach(e => {
      const arr = e['リリース日'].split('/')
      e['リリース日'] =
        arr[0] +
        '-' +
        ('00' + arr[1]).slice(-2) +
        '-' +
        ('00' + arr[2]).slice(-2) +
        'T08:00:00.000Z'
      delete e['']
    }) // Format each date

    const patients = {} // patients section
    patients.data = res
    patients.date = moment().format('YYYY\\/MM\\/DD HH:mm') // Update date

    data.patients = patients
    resolve()
  })
})

const countCSVUrl =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vQkSimAq6YKVyhqHy7wyEvL6-TeGmiNntRhP3iK5041mD900GYcjUKylMZIAJEIZzew9pCGfQ1AA-Ge/pub?gid=1767213847&single=true&output=csv'
const countPromise = new Promise(resolve => {
  getCSV(countCSVUrl).then(res => {
    let i = 0
    for (i = 0; i < res.length; i++) {
      if (res[i]['小計'] === '') {
        break
      }
    }

    res.splice(i, res.length - 1)

    res.forEach(e => {
      const arr = e['日付'].split('/')
      e['日付'] =
        arr[0] +
        '-' +
        ('00' + arr[1]).slice(-2) +
        '-' +
        ('00' + arr[2]).slice(-2) +
        'T08:00:00.000Z'

      e['小計'] = Number(e['小計']) // 型を変えておかないと+演算子が連結と解釈される
    })

    const patientsSummary = {}
    patientsSummary.data = res
    patientsSummary.date = moment().format('YYYY\\/MM\\/DD HH:mm')

    data.patients_summary = patientsSummary
    resolve()
  })
})

const counsultsCSVUrl =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vQkSimAq6YKVyhqHy7wyEvL6-TeGmiNntRhP3iK5041mD900GYcjUKylMZIAJEIZzew9pCGfQ1AA-Ge/pub?gid=274992458&single=true&output=csv'
const consultsPromise = new Promise(resolve => {
  getCSV(counsultsCSVUrl).then(res => {
    let i = 0
    for (i = 0; i < res.length; i++) {
      if (res[i]['小計'] === '') {
        break
      }
    }

    res.splice(i, res.length - 1)

    res.forEach(e => {
      const arr = e['日付'].split('/')
      e['日付'] =
        arr[0] +
        '-' +
        ('00' + arr[1]).slice(-2) +
        '-' +
        ('00' + arr[2]).slice(-2)

      e['小計'] = Number(e['小計']) // 型を変えておかないと+演算子が連結と解釈される
    })

    const consults = {}
    consults.data = res
    consults.date = moment(res[res.length - 1]['日付']).format('YYYY\\/MM\\/DD')

    data.consults = consults
    resolve()
  })
})

const testsCSVUrl =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vQkSimAq6YKVyhqHy7wyEvL6-TeGmiNntRhP3iK5041mD900GYcjUKylMZIAJEIZzew9pCGfQ1AA-Ge/pub?gid=1665332061&single=true&output=csv'
const testsPromise = new Promise(resolve => {
  getCSV(testsCSVUrl).then(res => {
    let i = 0
    for (i = 0; i < res.length; i++) {
      if (res[i]['小計'] === '') {
        break
      }
    }

    res.splice(i, res.length - 1)

    res.forEach(e => {
      const arr = e['日付'].split('/')
      e['日付'] =
        arr[0] +
        '-' +
        ('00' + arr[1]).slice(-2) +
        '-' +
        ('00' + arr[2]).slice(-2)

      e['小計'] = Number(e['小計']) // 型を変えておかないと+演算子が連結と解釈される
    })

    const tests = {}
    tests.data = res
    tests.date = moment(res[res.length - 1]['日付']).format('YYYY\\/MM\\/DD')

    data.tests = tests
    resolve()
  })
})
const querentsCSVUrl =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vQkSimAq6YKVyhqHy7wyEvL6-TeGmiNntRhP3iK5041mD900GYcjUKylMZIAJEIZzew9pCGfQ1AA-Ge/pub?gid=469162705&single=true&output=csv'
const querentsPromise = new Promise(resolve => {
  getCSV(querentsCSVUrl).then(res => {
    let i = 0
    for (i = 0; i < res.length; i++) {
      if (res[i]['本庁'] === '') {
        break
      }
    }

    res.splice(i, res.length - 1)

    res.forEach(e => {
      const arr = e['日付'].split('/')
      e['日付'] =
        arr[0] +
        '-' +
        ('00' + arr[1]).slice(-2) +
        '-' +
        ('00' + arr[2]).slice(-2)

      const filelds = [
        '大津保健所',
        '草津保健所',
        '甲賀保健所',
        '東近江保健所',
        '彦根保健所',
        '長浜保健所',
        '高島保健所',
        '本庁'
      ]
      let sum = 0
      filelds.forEach(f => {
        e[f] = Number(e[f]) // 型を変えておかないと+演算子が連結と解釈される
        sum += e[f]
      })

      e['小計'] = sum
    })

    const querents = {}
    querents.data = res
    querents.date = moment(res[res.length - 1]['日付']).format('YYYY\\/MM\\/DD')
    data.querents = querents
    resolve()
  })
})

const generalQuerentsCSVUrl =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vQkSimAq6YKVyhqHy7wyEvL6-TeGmiNntRhP3iK5041mD900GYcjUKylMZIAJEIZzew9pCGfQ1AA-Ge/pub?gid=514731663&single=true&output=csv'
const generalQuerentsPromise = new Promise(resolve => {
  getCSV(generalQuerentsCSVUrl).then(res => {
    let i = 0
    for (i = 0; i < res.length; i++) {
      if (res[i]['本庁'] === '') {
        break
      }
    }

    res.splice(i, res.length - 1)

    res.forEach(e => {
      const arr = e['日付'].split('/')
      e['日付'] =
        arr[0] +
        '-' +
        ('00' + arr[1]).slice(-2) +
        '-' +
        ('00' + arr[2]).slice(-2)

      const filelds = [
        '大津保健所',
        '草津保健所',
        '甲賀保健所',
        '東近江保健所',
        '彦根保健所',
        '長浜保健所',
        '高島保健所',
        '本庁'
      ]
      let sum = 0
      filelds.forEach(f => {
        e[f] = Number(e[f]) // 型を変えておかないと+演算子が連結と解釈される
        sum += e[f]
      })

      e['小計'] = sum
    })

    const generalQuerents = {}
    generalQuerents.data = res
    generalQuerents.date = moment(res[res.length - 1]['日付']).format(
      'YYYY\\/MM\\/DD'
    )
    data.generalQuerents = generalQuerents
    resolve()
  })
})

const othersUrl =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vQkSimAq6YKVyhqHy7wyEvL6-TeGmiNntRhP3iK5041mD900GYcjUKylMZIAJEIZzew9pCGfQ1AA-Ge/pub?gid=735284232&single=true&output=csv'

const othersPromise = new Promise(resolve => {
  getCSV(othersUrl).then(res => {
    const line = {}

    res.forEach(item => {
      switch (item.type) {
        case 'line_friends':
          line.value = item.value
          break
        case 'line_friends_date':
          line.date = item.value
          break
      }
    })
    data.lineFriends = line
    resolve()
  })
})

const ohashiUrl =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vQkSimAq6YKVyhqHy7wyEvL6-TeGmiNntRhP3iK5041mD900GYcjUKylMZIAJEIZzew9pCGfQ1AA-Ge/pub?gid=1888109747&single=true&output=csv'

const ohashiPromise = new Promise(resolve => {
  getCSV(ohashiUrl).then(items => {
    const transitionData = []

    const years = Object.keys(items[0])
      .map(year => parseInt(year, 10))
      .filter(year => !Number.isNaN(year))

    years.sort()

    // Atomic に分解
    for (const item of items) {
      const monthdate = item['日付']
      years.forEach(year => {
        const value = parseInt(item[year], 10)
        if (Number.isNaN(value)) {
        } else {
          const [month, date] = monthdate
            .split('/')
            .map(flagment => parseInt(flagment, 10))
          const dateObject = moment()
            .year(year)
            .month(month - 1)
            .date(date)
          const day = dateObject.format('ddd')
          const dayNumber = dateObject.day()

          const nthDayOfTheYear = dateObject.dayOfYear()
          transitionData.push({
            value,
            year,
            month,
            date,
            day,
            dayNumber,
            nthDay: Math.floor((nthDayOfTheYear - 1) / 7) + 1,
            nthDayOfTheYear
          })
        }
      })
    }

    // 移動平均の計算
    const averageData = []
    for (let index = 0; index < transitionData.length; index++) {
      if (index < 6) {
        continue
      } else {
        const start = transitionData[index - 6]
        const end = transitionData[index]
        averageData.push({
          year: end.year,
          month: end.month,
          date: end.date,
          nthDayOfTheYear: end.nthDayOfTheYear,
          start: `${start.year}/${start.month}/${start.date}`,
          end: `${end.year}/${end.month}/${end.date}`,
          value:
            (transitionData[index - 6].value +
              transitionData[index - 5].value +
              transitionData[index - 4].value +
              transitionData[index - 3].value +
              transitionData[index - 2].value +
              transitionData[index - 1].value +
              transitionData[index].value) /
            7
        })
      }
    }

    // 移動平均をnthDayOfTheYear で突き合わせて整理
    const averageYearMap = averageData.reduce((prev, item) => {
      const { year, nthDayOfTheYear } = item
      try {
        prev[nthDayOfTheYear][year] = item
      } catch (error) {
        prev[nthDayOfTheYear] = {
          [year]: item
        }
      }
      return prev
    }, {})

    const averageDatasets = Object.keys(averageYearMap)
      .map(nthDayOfTheYear => {
        const mapData = averageYearMap[nthDayOfTheYear]
        if (Object.keys(mapData).length !== years.length) {
          return false
        } else {
          const data = []
          let label = ''
          for (const year of years) {
            const item = mapData[year]
            data.push(item.value)
            label = item.end
          }
          return { data, label }
        }
      })
      .filter(x => !!x)

    // データを年ごとに突き合わせて整理
    // transitionData = transitionData.reduce((prev, item) => {
    //   const key = item.dayNumber + item.nthDay
    //   if (prev[key]) {
    //     prev[key].data.push(item)
    //   } else {
    //     prev[key] = {
    //       label:
    //     }
    //   }
    //   return prev
    // }, {})

    // averageData = averageData.reduce((prev, item) => {
    //   if (prev[item.year]) {
    //     prev[item.year].push(item)
    //   } else {
    //     prev[item.year] = [item]
    //   }
    //   return prev
    // }, {})

    data.ohashi = {
      transition: {
        datasets: transitionData,
        labels: years
      },
      averages: {
        datasets: averageDatasets,
        labels: years
      }
    }
    resolve()
  })
})

Promise.all([
  countPromise,
  attrPromise,
  consultsPromise,
  testsPromise,
  querentsPromise,
  generalQuerentsPromise,
  ohashiPromise,
  othersPromise
]).then(() => {
  data.lastUpdate = moment().format('YYYY\\/MM\\/DD HH:mm')
  fs.writeFileSync('./data/data.json', JSON.stringify(data, null, 2))
})

// Generate /data/news.json.
const news = {}
const newsCSVUrl =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vQkSimAq6YKVyhqHy7wyEvL6-TeGmiNntRhP3iK5041mD900GYcjUKylMZIAJEIZzew9pCGfQ1AA-Ge/pub?gid=444294091&single=true&output=csv'
new Promise(resolve => {
  getCSV(newsCSVUrl).then(res => {
    news.newsItems = res
    resolve()
  })
}).then(() => {
  fs.writeFileSync('./data/news.json', JSON.stringify(news, null, 2))
})
