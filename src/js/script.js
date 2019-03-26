require('es6-promise').polyfill();
require('formdata-polyfill');
window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    let calc = require('./parts/calc'),
        forms = require('./parts/forms'),
        popup = require('./parts/popup'),
        slider = require('./parts/slider'),
        tabs = require('./parts/tabs'),
        timer = require('./parts/timer');

    calc();
    popup();
    slider();
    tabs();
    timer();
    forms();
});
if ('NodeList' in window && !NodeList.prototype.forEach) {
    console.info('polyfill for IE11');
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}