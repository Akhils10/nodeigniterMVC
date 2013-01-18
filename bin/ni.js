#!/usr/bin/env node

var program = require('commander')
, nodeigniter = require('../lib/cli/');

program.version(nodeigniter.version);

program.command('create')
.description('-> create Nodeigniter app')
.action(function() {
	nodeigniter.create(program.args.shift() || '.');
});