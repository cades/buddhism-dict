yushu-crawler
=============

[中文御書](http://cht.sgilibrary.org/index.php) crawler

使用原網站「頁數檢索」的功能, 將 1716 頁的御書一頁一頁轉成 json 格式.

# 使用方式

請先確認有安裝[nodejs](http://nodejs.org/).

`
npm install
node crawler.js
`

等到 script 跑完, 所有資料就會放在 pages/ 目錄下.

# json 格式

```
{
  "page": <integer>,
  "title": <string>,
  "text": <string>
}
```

