#!/usr/bin/env node

var program = require('commander')
, nodeigniter = require('../');

program.version(nodeigniter.version);

program.command('create')
.description('-> create Nodeigniter app')
.action(function() {
	nodeigniter.cli.create(program.args.shift() || '.');
});