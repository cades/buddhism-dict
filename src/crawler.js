var fs = require('fs'),
    util = require('util'),
    Lazy = require('lazy.js'),
    request = require('request'),
    cheerio = require('cheerio'),
    url_template = 'http://cht.sgilibrary.org/ResultDetail.php?BookArticle=1&pageNo=%s&showNum=50&searchType=3';

function inc (x) { return x + 1; }

function downloadPage(pageNum) {
  var url = util.format(url_template, pageNum);
  request({url: url}, function(e, r, html){
    var $ = cheerio.load(html),
        title = $('body table tr td table:nth-child(3) tr:nth-child(1) .txt_title').text(),
        text  = $('body table tr td table:nth-child(3) tr:nth-child(2) .txt').text(),
        pageJson = {page: pageNum, title: title, text: text};

    // 一頁一頁寫入檔案.
    fs.writeFile('./gen/pages/' + pageNum + '.json', JSON.stringify(pageJson), function(err){
      if (err)
        console.log("Page " + pageNum + " fails to write to file.");
      else if (pageNum === 1716)
        console.log("1716 pages downloaded.");
    });

  });
}

// 從第 1 頁抓到 1716 頁
Lazy.range(1716).map(inc).toArray().map(downloadPage);
