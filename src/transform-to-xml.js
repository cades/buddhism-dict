'use strict';
var fs = require('fs'),
    util = require('util'),
    Lazy = require('lazy.js');

var dictionaryTemplate = '<?xml version="1.0" encoding="UTF-8"?>\n\
<d:dictionary xmlns="http://www.w3.org/1999/xhtml" xmlns:d="http://www.apple.com/DTDs/DictionaryService-1.0.rng">\n\
%s\
</d:dictionary>\n\
';
var entryTemplate = '<d:entry id="<%id%>" d:title="<%title%>">\n\
	<d:index d:value="<%title%>"/>\n\
	<h1><%title%></h1>\n\
	<span><%pronunciation%></span>\n\
	<p><%definition%></p>\n\
</d:entry>\n\
';

function readFileAsJson (filename) {
  return JSON.parse( fs.readFileSync(filename) );
}

function reformat (pair) {
  return {
    title: pair[0],
    pronunciation: pair[1].match(/\[.*?\]/)[0].slice(1, -1),
    definition: pair[1].split(/\[.*?\]/)[1]
  };
}

var indexCnt = 0;
function charCode (c) { return c.charCodeAt(0); }

function toEntry (obj) {
  return entryTemplate
    .replace(/<%id%>/, 'ID_' + Lazy(obj.title).split("").map(charCode).join("_"))
    .replace(/<%title%>/g, obj.title)
    .replace(/<%pronunciation%>/, obj.pronunciation)
    .replace(/<%definition%>/, obj.definition.replace('<', '《').replace('>', '》'));
}

var dictObj = readFileAsJson('./gen/dict.json'),
    pairArray = Lazy(dictObj).toArray(),
    entries = Lazy(pairArray).map(reformat).map(toEntry).join(""),
    dictXml = util.format(dictionaryTemplate, entries);

fs.writeFile('./gen/dict.xml', dictXml, function(err){
  if (err)
    console.log("dict.xml failed to write to file.");
  else
    console.log("dict.xml wrote to file.");
});
