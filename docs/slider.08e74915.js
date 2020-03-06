// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"Nwn9":[function(require,module,exports) {
var data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
var sliderRange = d3.sliderBottom().min(d3.min(data)).max(d3.max(data)).width(1300).tickFormat(d3.format('')).ticks(12).default([5, 7]).fill('#2196f3').on('onchange', function (val) {
  //window.updateData(val)
  console.log(val); //d3.select('p#value-range').text(val.map(d3.format('.2%')).join('-'));
});
var gRange = d3.select('div#slider').append('svg').attr('width', 500).attr('height', 100).append('g').attr('fill', 'red');
gRange.call(sliderRange);
/*
d3.select('p#value-range').text(
    sliderRange
        .value()
        .map(d3.format('.2%'))
        .join('-')
);

var hour = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
var time_select = 16;
var TimeSlider = d3
    .sliderBottom()
    .min(d3.min(hour))
    .max(d3.max(hour))
    .width(1400)
    .tickFormat(d3.format(''))
    .ticks(12)
    .step(1)
    .default(12)
    .on('onchange', val => {
        time_select = val;
        console.log(time_select);
        window.updateData(time_select)
    });
var gTimeStep = d3
    .select('div#slider')
    .append('svg')
    .attr('width', 500)
    .attr('height', 100)
    .append('g')
    .attr('fill', 'red')
    .attr('font-size', '40px');

gTimeStep.call(TimeSlider);
*/
},{}]},{},["Nwn9"], null)
//# sourceMappingURL=https://uw-cse442-wi20.github.io/FP-news-and-search-trends/slider.08e74915.js.map