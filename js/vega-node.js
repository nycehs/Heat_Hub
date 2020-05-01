'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var vegaUtil = require('vega-util');

var vegaDataflow = require('vega-dataflow');

var tx = require('vega-transforms');

var vtx = require('vega-view-transforms');

var encode = require('vega-encode');

var geo = require('vega-geo');

var force = require('vega-force');

var tree = require('vega-hierarchy');

var reg = require('vega-regression');

var voronoi = require('vega-voronoi');

var wordcloud = require('vega-wordcloud');

var xf = require('vega-crossfilter');

var vegaStatistics = require('vega-statistics');

var vegaTime = require('vega-time');

var vegaLoader = require('vega-loader');

var vegaScenegraph = require('vega-scenegraph');

var vegaScale = require('vega-scale');

var vegaProjection = require('vega-projection');

var vegaView = require('vega-view');

var vegaFunctions = require('vega-functions');

var vegaParser = require('vega-parser');

var vegaRuntime = require('vega-runtime');

var version = "5.10.1"; // -- Transforms -----

vegaUtil.extend(vegaDataflow.transforms, tx, vtx, encode, geo, force, tree, reg, voronoi, wordcloud, xf);
Object.keys(vegaUtil).forEach(function (k) {
  if (k !== 'default') Object.defineProperty(exports, k, {
    enumerable: true,
    get: function get() {
      return vegaUtil[k];
    }
  });
});
Object.keys(vegaStatistics).forEach(function (k) {
  if (k !== 'default') Object.defineProperty(exports, k, {
    enumerable: true,
    get: function get() {
      return vegaStatistics[k];
    }
  });
});
Object.keys(vegaTime).forEach(function (k) {
  if (k !== 'default') Object.defineProperty(exports, k, {
    enumerable: true,
    get: function get() {
      return vegaTime[k];
    }
  });
});
Object.keys(vegaLoader).forEach(function (k) {
  if (k !== 'default') Object.defineProperty(exports, k, {
    enumerable: true,
    get: function get() {
      return vegaLoader[k];
    }
  });
});
Object.keys(vegaScenegraph).forEach(function (k) {
  if (k !== 'default') Object.defineProperty(exports, k, {
    enumerable: true,
    get: function get() {
      return vegaScenegraph[k];
    }
  });
});
Object.defineProperty(exports, 'Dataflow', {
  enumerable: true,
  get: function get() {
    return vegaDataflow.Dataflow;
  }
});
Object.defineProperty(exports, 'EventStream', {
  enumerable: true,
  get: function get() {
    return vegaDataflow.EventStream;
  }
});
Object.defineProperty(exports, 'MultiPulse', {
  enumerable: true,
  get: function get() {
    return vegaDataflow.MultiPulse;
  }
});
Object.defineProperty(exports, 'Operator', {
  enumerable: true,
  get: function get() {
    return vegaDataflow.Operator;
  }
});
Object.defineProperty(exports, 'Parameters', {
  enumerable: true,
  get: function get() {
    return vegaDataflow.Parameters;
  }
});
Object.defineProperty(exports, 'Pulse', {
  enumerable: true,
  get: function get() {
    return vegaDataflow.Pulse;
  }
});
Object.defineProperty(exports, 'Transform', {
  enumerable: true,
  get: function get() {
    return vegaDataflow.Transform;
  }
});
Object.defineProperty(exports, 'changeset', {
  enumerable: true,
  get: function get() {
    return vegaDataflow.changeset;
  }
});
Object.defineProperty(exports, 'definition', {
  enumerable: true,
  get: function get() {
    return vegaDataflow.definition;
  }
});
Object.defineProperty(exports, 'ingest', {
  enumerable: true,
  get: function get() {
    return vegaDataflow.ingest;
  }
});
Object.defineProperty(exports, 'isTuple', {
  enumerable: true,
  get: function get() {
    return vegaDataflow.isTuple;
  }
});
Object.defineProperty(exports, 'transform', {
  enumerable: true,
  get: function get() {
    return vegaDataflow.transform;
  }
});
Object.defineProperty(exports, 'transforms', {
  enumerable: true,
  get: function get() {
    return vegaDataflow.transforms;
  }
});
Object.defineProperty(exports, 'tupleid', {
  enumerable: true,
  get: function get() {
    return vegaDataflow.tupleid;
  }
});
Object.defineProperty(exports, 'interpolate', {
  enumerable: true,
  get: function get() {
    return vegaScale.interpolate;
  }
});
Object.defineProperty(exports, 'interpolateColors', {
  enumerable: true,
  get: function get() {
    return vegaScale.interpolateColors;
  }
});
Object.defineProperty(exports, 'interpolateRange', {
  enumerable: true,
  get: function get() {
    return vegaScale.interpolateRange;
  }
});
Object.defineProperty(exports, 'quantizeInterpolator', {
  enumerable: true,
  get: function get() {
    return vegaScale.quantizeInterpolator;
  }
});
Object.defineProperty(exports, 'scale', {
  enumerable: true,
  get: function get() {
    return vegaScale.scale;
  }
});
Object.defineProperty(exports, 'scheme', {
  enumerable: true,
  get: function get() {
    return vegaScale.scheme;
  }
});
Object.defineProperty(exports, 'projection', {
  enumerable: true,
  get: function get() {
    return vegaProjection.projection;
  }
});
Object.defineProperty(exports, 'View', {
  enumerable: true,
  get: function get() {
    return vegaView.View;
  }
});
Object.defineProperty(exports, 'expressionFunction', {
  enumerable: true,
  get: function get() {
    return vegaFunctions.expressionFunction;
  }
});
Object.defineProperty(exports, 'formatLocale', {
  enumerable: true,
  get: function get() {
    return vegaFunctions.formatLocale;
  }
});
Object.defineProperty(exports, 'timeFormatLocale', {
  enumerable: true,
  get: function get() {
    return vegaFunctions.timeFormatLocale;
  }
});
Object.defineProperty(exports, 'parse', {
  enumerable: true,
  get: function get() {
    return vegaParser.parse;
  }
});
Object.defineProperty(exports, 'runtime', {
  enumerable: true,
  get: function get() {
    return vegaRuntime.parse;
  }
});
Object.defineProperty(exports, 'runtimeContext', {
  enumerable: true,
  get: function get() {
    return vegaRuntime.context;
  }
});
exports.version = version;