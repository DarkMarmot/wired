var assert = require('assert');
var Wired = require('../wired.js').Wired;
const EventEmitter = require('events');

var e = new EventEmitter();
var scope = 'bunny';
var place = Wired.at(scope);
var k = place.on(e, 'moo').run(function(msg){ console.log('boo');});
e.emit('moo', 'cow');

console.log(place);
