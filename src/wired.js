
import Lain from "lain";
import {Catbus, Bus, Stream} from "catbus";

var Wired = {
    scope: null
};

var WiredScope = function(scope){
    this.scope = scope;
};

WiredScope.prototype = Wired;

Wired.at = function(scope){
    return new WiredScope(scope);
};

Wired.on =  function(target, eventName, useCapture) {
    var bus = Catbus.fromEvent(target, eventName, useCapture);
    bus.scope = this.scope;
    return bus;
};

Wired.watch = function(elements){



};

Wired._createDataStream = function(el){

    // todo assert has scope
    // todo error msg not found

    var scope = this.scope;
    var data = scope.find(el.name, el.dimension);
    var stream = new Stream();

    stream.name = el.alias || el.name;

    if(!data && !el.optional)
        throw new Error('data not found msg');

    if(data)
        data.follow(stream, el.topic);

    return stream;

};

function LainElement(name, topic, dimension, alias, optional) {

    this.name = name;
    this.topic = topic || null;
    this.dimension = dimension || null;
    this.alias = alias || null;
    this.optional = !!optional;

}

function toLainElement(d){

    if(typeof d === 'object'){
        return new LainElement(d.name, d.topic, d.dimension, d.alias);
    } else if (typeof d === 'string'){
        return new LainElement(d);
    }

}

function toLainElementArray (data){

    var i, d, len, name, names;
    var result = [];

    if(Array.isArray(data)){
        len = data.length;
        for(i = 0; i < len; i++){
            d = data[i];
            result.push(toLainElement(d));
        }
    } else if (typeof data === 'string') {
        if(data.indexOf(',') === -1){
            name = data.trim();
            if(name)
                result.push(new LainElement(name));
        } else {
            names = data.split(',');
            len = names.length;
            for(i = 0; i < len; i++){
                d = data[i];
                name = d.trim();
                if(name)
                    result.push(new LainElement(name));
            }
        }
    }

    return result;

}

Bus.prototype.watch = function(data){



};

export {Wired};

