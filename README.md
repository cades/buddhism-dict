# 佛教哲學大辭典 for Mac

使用[SGI御書檢索網](http://cht.sgilibrary.org/index.php)的資料產生 Mac 字典. 最新的字典檔可從[這裡下載](https://dl.dropboxusercontent.com/u/23400714/%E4%BD%9B%E6%95%99%E5%93%B2%E5%AD%B8%E5%A4%A7%E8%BE%AD%E5%85%B8.dictionary.zip).

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

