var fs = require('fs'),
    util = require('util'),
    Lazy = require('lazy.js'),
    request = require('request'),
    cheerio = require('cheerio'),
    Q = require('q'),
    merge = require('merge'),
    url_template = 'http://cht.sgilibrary.org/Result.php?subject=%s&showNum=10000&searchType=2&searchBookType=2';

function printJson (str) {
  console.log( JSON.stringify(str) );
}

function readFileAsJson (filename) {
  return JSON.parse( fs.readFileSync(filename) );
}

function getPartialDict (c) {
  var deferred = Q.defer();
  var url = util.format(url_template, c);
  request({url: url}, function(e, r, html){
    if (e) deferred.reject(new Error(e));

    function text (i, el){ return $(this).text(); }
    function trimtext(i, el){ return $(this).text().trim(); }

    var $ = cheerio.load(html),
        words = $('.txt_title').map(trimtext).get(),
        definitions = $('td.txt[align="left"]').map(text).get(),
        partialDict = Lazy(words).zip(definitions).map(function(pair){
          var obj = {};
          obj[pair[0]] = pair[1];
          return obj;
        }).reduce(merge);
    deferred.resolve(partialDict);
  });
  return deferred.promise;
}

var charArray = readFileAsJson('./gen/yushu-characters.json');
var promises = Lazy(charArray)
  .map(getPartialDict)
  .toArray()
  ;

Q.all(promises)
.then(function(partialDicts){
  var dict = partialDicts.reduce(merge);
  fs.writeFile('./gen/dict.json', JSON.stringify(dict), function(err){
    if (err)
      console.log("Dict fails to write to file.");
    else
      console.log("Dict wrote to file.");
  });
});
