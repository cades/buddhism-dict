# 佛教哲學大辭典 for Mac

[中文御書](http://cht.sgilibrary.org/index.php) crawler

使用原網站「頁數檢索」的功能, 將 1716 頁的御書一頁一頁轉成 json 格式.

# 使用方式

請先確認有安裝[nodejs](http://nodejs.org/) 與 gulp.

```
# install gulp globly (if not install yet)
npm insatll -g gulp

# install required packages
npm install

# 3-step generate dictionary
gulp crawl
gulp copyXml
gulp build
```

# Commands

`gulp crawl`
把檢索網的辭典內容爬下來, 並轉存成 Didtionary Development Kit 可用的 xml 檔

`gulp copyXml`
把轉好的 dict.xml 複製到 `Dictionary Development Kit/project_templates` 目錄下, 供 build 時使用

`gulp build`
清除快取、重新建置字典檔並安裝.

`gulp install-xml-validator`
下載 xml 驗證工具

`gulp validate`
驗證 xml 檔. 如正確無誤 task 會正常結束; 倘若有問題, task 會失敗.

