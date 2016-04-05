var boxup = require('../index');

var options = {
  margin: 1,
  padding: 1
};

// fixed width
options.width    = 80;
options.boxAlign = 'right';
console.log(boxup('boxAlign: right, textAlign: left, width: 80, margin: 1, padding: 1\n\n'
  + 'Lorem ipsum dolor sit amet, ridiculus quisquee interdum est sit, telolus posuere suspendisse, enimt tortor convallis. Proin porttitor neque pulvinar suoscipit, rhoncus ipsum urna id, nulla primi, scelerisque sodales lectus molestie morbi sit adipiscing.'
  , options));

options.textAlign = 'center';
options.boxAlign  = 'center';
console.log(boxup('boxAlign: center, textAlign: center, width: 80, margin: 1, padding: 1\n\n'
  + 'Amet fringilla fusce nulla praesent mauris, lectus aliquam nonummy pharetra, orci eleifend turpis phasellus maecenas bibendum. Posuere interdum in, pede proin dolores metus egestas odio. Nulla minus curabitur iaculis, sit ipsum quam feugiat, libero non nulla parturient adipiscing, libero ultricies augue ipsum urna.'
  , options));

options.textAlign = 'right';
options.boxAlign  = 'left';
console.log(boxup('boxAlign: left, textAlign: right, width: 80, margin: 1, padding: 1\n\n'
  + 'Mollis felis quisque amet, amet turpis urna, velit habitasse ipsum, mattis lectus duis atque. Mauris ipsum. Libero donec leo aliquet ut vitae, eros in ac quia a, malesuada accusamus, elit et sit eget non nunc, eu pellentesque eu congue adipiscing nec.'
  , options));
