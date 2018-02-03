#!/usr/bin/env node

var program = require('commander')
var version = require('../package.json').version
require('dotenv').config()

program
  .version(version)
  .option('-H, --host <host>', 'specify the host [0.0.0.0]', '0.0.0.0')
  .option('-p, --port <port>', 'specify the port [8080]', '8080')
  .parse(process.argv)

if (program.host) process.env.HOST = program.host
if (program.port) process.env.PORT = program.port

var env = process.env.NODE_ENV || 'development'
var host = process.env.HOST || '0.0.0.0'
var host = process.env.PORT || '8080'


var app = (env === 'development') 
  ? require('babel-register') && require('../src')
  : require('../dist')

app.listen(program.port, program.host, ~~program.backlog)
console.log('Listening on %s:%s', program.host, program.port)