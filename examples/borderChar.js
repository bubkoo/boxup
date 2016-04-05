var boxup = require('../index');

var options = {
  margin: [2, 0, 2, 8],
  padding: {
    top: 1,
    right: 4,
    bottom: 1,
    left: 4
  },
  dimBorder: true,
  borderStyle: 'single',
  borderChars: {
    topLeft: '1',
    topRight: '2',
    bottomRight: '3',
    bottomLeft: '4'
  }
};


console.log(boxup('Custom corner chars', options));
