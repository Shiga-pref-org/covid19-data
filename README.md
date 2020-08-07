# 滋賀県 新型コロナウイルス感染症対策サイト データ

![deploy](https://github.com/Shiga-pref-org/covid19-data/workflows/deploy/badge.svg)

このリポジトリは、[滋賀県 新型コロナウイルス感染症対策サイト](https://stopcovid19.pref.shiga.jp/) のデータを整形し公開するためのリポジトリです。
最新のデータは以下の URL から JSON フォーマットで取得できます。

- 新型コロナウイルス感染症対策に使われるデータ:
  https://raw.githubusercontent.com/Shiga-pref-org/covid19-data/gh-pages/data.json

- 滋賀県からのお知らせへのリンクのデータ:
  https://raw.githubusercontent.com/Shiga-pref-org/covid19-data/gh-pages/news.json
 
## 開発

```shell
$ git clone git@github.com:Shiga-pref-org/covid19-data.git
$ cd covid19-data
$ npm install
$ npm run build
```
