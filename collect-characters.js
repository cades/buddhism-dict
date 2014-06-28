'use strict';

var fs = require('fs'),
    Lazy = require('lazy.js');

function printJson (str) {
  console.log( JSON.stringify(str) );
}
    
function inc (x) { return x + 1; }

function toFileName (x) {
  return './gen/pages/' + x + '.json';
}

function readFileAsJson (filename) {
  return JSON.parse( fs.readFileSync(filename) );
}

function getTitleAndText (json) {
  return json.title + json.text;
}

function explode (str) {
  return str.split("");
}

function punctuation (c) {
  return Lazy('\r\t\n　：；、，。？！「」«¸.﹗﹖『』（）()').contains(c);
}

var array = Lazy.range(1716).toArray();
var res = Lazy(array).map(inc)
  .map(toFileName)
  .map(readFileAsJson)
  .map(getTitleAndText)
  .map(explode)
  .flatten()
  .uniq()
  .reject(punctuation)
  .toArray();

fs.writeFile('./gen/yushu-characters.json', JSON.stringify(res), function(err){
  if (err)
    console.log("Failed to write to file.");
  else
    console.log("characters array generated.");
});
