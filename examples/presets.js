var boxup   = require('../index');
var presets = require('boxup-preset');

var borderColors     = ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white', 'gray'];
var backgroundColors = ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'];

var options = {
  margin: 1,
  padding: 1
};

function randomColor(colors) {
  var length = colors.length;
  var random = Math.floor(Math.random() * length);
  return colors[random];
}

for (var borderStyle in presets.presets) {

  options.borderStyle     = borderStyle;
  options.borderColor     = randomColor(borderColors);
  options.backgroundColor = randomColor(backgroundColors);

  while (options.borderColor === options.backgroundColor) {
    options.backgroundColor = randomColor(backgroundColors);
  }

  console.log(boxup('boxup', options));
}
