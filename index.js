'use strict';

var chalk       = require('chalk');
var assign      = require('object-assign');
var repeating   = require('repeating');
var stringWidth = require('string-width');
var camelCase   = require('camelcase');
var presets     = require('boxup-preset');
var breakStr    = require('break-string');


var NL      = '\n';
var SPACE   = ' ';
var COLUMNS = process.stdout.columns;

module.exports = function (text, options) {

  options = assign({
    margin: 0,
    padding: 0,
    borderStyle: 'single',
    dimBorder: false
  }, options);

  if (options.borderColor && !chalk[options.borderColor]) {
    throw new TypeError(' Invalid borderColor: ' + options.borderColor);
  }

  if (options.backgroundColor) {
    options.backgroundColor = camelCase('bg', options.backgroundColor);
  }

  if (options.backgroundColor && !chalk[options.backgroundColor]) {
    throw new TypeError('Invalid backgroundColor: ' + options.backgroundColo);
  }

  function colorizeBorder(x) {
    var ret = options.borderColor ? chalk[options.borderColor](x) : x;
    return options.dimBorder ? chalk.dim(ret) : ret;
  }

  function colorizeContent(x) {
    return options.backgroundColor ? chalk[options.backgroundColor](x) : x;
  }


  var chars   = presets.getBorderChars(options.borderStyle, options.borderChars);
  var margin  = parseBoxModel(options.margin);
  var padding = parseBoxModel(options.padding);

  var boxWidth  = getBoxWidth(options.width, text, margin, padding);
  var bareWidth = boxWidth - 2; // without border
  var contentWidth = bareWidth - padding.left - padding.right;

  var marginLeft   = repeating(SPACE, alignBox(options.boxAlign, boxWidth, margin));
  var marginTop    = repeating(NL, margin.top);
  var marginBottom = repeating(NL, margin.bottom);
  var topChars     = repeating(chars.top || chars.horizontal, bareWidth);
  var bottomChars  = repeating(chars.bottom || chars.horizontal, bareWidth);
  var leftChar     = colorizeBorder(chars.left || chars.vertical);
  var rightChar    = colorizeBorder(chars.right || chars.vertical);

  var topBar    = marginTop + marginLeft + colorizeBorder(chars.topLeft + topChars + chars.topRight);
  var bottomBar = marginLeft + colorizeBorder(chars.bottomLeft + bottomChars + chars.bottomRight) + marginBottom;


  var lines = text.split(NL);

  padEmptyLine(lines, padding.top, true);
  padEmptyLine(lines, padding.bottom, false);

  var middle = lines.map(function (line) {

    var lineWidth = stringWidth(line);

    if (lineWidth > contentWidth) {
      return breakStr(line, contentWidth).map(function (block) {

        var content = colorizeContent(alignContent(options.textAlign, block, stringWidth(block), bareWidth, padding));
        return marginLeft + leftChar + content + rightChar;

      }).join(NL);
    }

    var content = colorizeContent(alignContent(options.textAlign, line, lineWidth, bareWidth, padding));
    return marginLeft + leftChar + content + rightChar;

  }).join(NL);


  // roll up
  return topBar + NL + middle + NL + bottomBar;
};


// helpers
// -------

function hasOwn(obj, key) {
  return {}.hasOwnProperty.call(obj, key);
}

function isString(val) {
  return typeof val === 'string';
}

function isNumber(val) {
  return typeof val === 'number';
}

function toInt(val) {

  val = parseInt(val, 10);

  if (isNaN(val) || !isFinite(val)) {
    return 0;
  }

  return val || 0;
}

function toFloat(val) {
  val = parseFloat(val);

  if (isNaN(val) || !isFinite(val)) {
    return 0;
  }

  return val || 0;
}

function parseBoxModel(detail) {

  var result = null;

  if (isNumber(detail)) {
    result = {
      top: detail,
      right: detail * 3,
      bottom: detail,
      left: detail * 3
    };
  } else if (Array.isArray(detail)) {
    result = {
      top: detail[0],
      right: detail[1],
      bottom: detail[2],
      left: detail[3]
    };
  } else {
    result = assign({
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }, detail);
  }

  for (var key in result) {
    if (hasOwn(result, key) && !isNumber(result[key])) {
      result[key] = toInt(result[key]);
    }
  }

  return result;
}

function getBoxWidth(width, text, margin, padding) {

  width = width || 0;

  if (isString(width) && width[width.length - 1] === '%') {
    width = toFloat(width.substr(0, width.length - 1));
    if (width) {
      width = width <= 1 ? width : width % 1;
      width = width * COLUMNS;
    }
  }

  width = isNumber(width) ? width : toInt(width);

  var maxWidth = COLUMNS - margin.left - margin.right;
  if (maxWidth < 3) {
    throw new TypeError('Box is too small to display, please adjust the `margin` option');
  }

  if (!width) {
    var maxContentWidth = Math.max.apply(null, text.split(NL).map(function (x) {
      return stringWidth(x);
    }));

    // content + padding + border
    width = maxContentWidth + padding.left + padding.right + 2;
  }

  if (width) {
    width = Math.min(width, maxWidth);
  }

  if (width < 3) {
    throw new TypeError('Box is too small to display, please adjust the `width` option');
  }

  return width;
}

function padEmptyLine(lines, count, isTop) {

  var method = isTop ? 'unshift' : 'push';

  while (count > 0) {
    lines[method]('');
    count -= 1;
  }
}

function alignBox(align, boxWidth, margin) {

  var marginLeft;

  if (align === 'right') {
    marginLeft = COLUMNS - boxWidth - margin.right;
  } else if (align === 'center') {
    var legacy  = COLUMNS - boxWidth - margin.right - margin.left;
    var legacyL = Math[margin.left > margin.right ? 'floor' : 'ceil'](legacy / 2);
    marginLeft  = legacyL + margin.left;
  } else {
    marginLeft = margin.left;
  }

  return marginLeft;
}

function alignContent(align, content, contentWidth, width, padding) {
  if (align === 'center') {
    var legacy  = width - padding.left - padding.right - contentWidth;
    var legacyL = Math[padding.left > padding.right ? 'floor' : 'ceil'](legacy / 2);
    var leagcyR = legacy - legacyL;

    return repeating(SPACE, legacyL + padding.right) + content + repeating(SPACE, leagcyR + padding.right);

  } else if (align === 'right') {
    return repeating(SPACE, width - contentWidth - padding.right) + content + repeating(SPACE, padding.right);
  } else {
    return repeating(SPACE, padding.left) + content + repeating(SPACE, width - contentWidth - padding.left);
  }
}
