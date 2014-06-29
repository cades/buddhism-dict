var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task('crawl', shell.task([
  'node src/crawler.js',
  'node src/collect-characters.js',
  'node src/generate-dict.js',
  'node src/transform-to-xml.js'
]));

gulp.task('copyXml', shell.task([
  'cp gen/dict.xml "Dictionary Development Kit/project_templates/SGIBuddhismDictionary.xml"'
]));

gulp.task('build', shell.task([
  './clean.sh',
  'make clean',
  'make',
  'make install'
], {cwd: './Dictionary Development Kit/project_templates/'}));
  
gulp.task('install-xml-validator', shell.task([
  'wget https://jing-trang.googlecode.com/files/jing-20091111.zip',
  'unzip jing-20091111.zip',
  'rm jing-20091111.zip'
]));

gulp.task('validate', shell.task([
  'java -jar jing-20091111/bin/jing.jar "Dictionary Development Kit/documents/DictionarySchema/AppleDictionarySchema.rng" ./gen/dict.xml'
]));
