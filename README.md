# boxup

> Wrap content with a box in the terminal.

[![MIT License](https://img.shields.io/badge/license-MIT_License-green.svg?style=flat-square)](https://github.com/bubkoo/boxup/blob/master/LICENSE)
[![build:?](https://img.shields.io/travis/bubkoo/boxup/master.svg?style=flat-square)](https://travis-ci.org/bubkoo/boxup)


## Install

```
$npm install --save boxup
```

## Usage
   
```js
var boxup = require('boxup');

console.log(boxup('default options'));

/*
┌───────────────┐
|default options|
└───────────────┘
*/


console.log(boxup('textAlign: center, width: 70, margin: 1, padding: 1\n\nAmet fringilla fusce nulla praesent mauris, suspendisse lectus aliquam nonummy pharetra, orci eleifend turpis phasellus maecenas bibendum. Posuere interdum in, pede proin dolores metus egestas odio. Nulla minus curabitur iaculis, sit ipsum quam feugiat, libero non malesuada nulla parturient adipiscing, libero ultricies augue ipsum urna.',
    {
        width    : 70.
        margin   : 1,
        padding  : 1,
        textAlign: 'center'
    }));

/*

   ┌────────────────────────────────────────────────────────────────────┐
   |                                                                    |
   |         textAlign: center, width: 70, margin: 1, padding: 1        |
   |                                                                    |
   |   Amet fringilla fusce nulla praesent mauris, suspendisse lectus   |
   |    aliquam nonummy pharetra, orci eleifend turpis phasellus maec   |
   |   enas bibendum. Posuere interdum in, pede proin dolores metus e   |
   |   gestas odio. Nulla minus curabitur iaculis, sit ipsum quam feu   |
   |   giat, libero non malesuada nulla parturient adipiscing, libero   |
   |                     ultricies augue ipsum urna.                    |
   |                                                                    |
   └────────────────────────────────────────────────────────────────────┘


*/
```

## API

### boxup(input, [options])

#### input

Type: `String`

The text inside the box.

#### options

##### width

Type: `Number`, 'Percentage string'

Default: `auto`

The width of the box, include padding and borders. Width in the terminal is column count, so width would not greate than tha max column count.

If `width` is a percentage string, the width is relative to the terminal's width.

If `width` is a number, it's a absolute width.

Any other invalid values will be treat as `atuo`.


##### textAlign

Type: `String`

Default: `left`

Values:
 
- left
- center
- right

Text alignment in the box.

##### boxAlign

Type: `String`

Default: `left`

Values:
 
- left
- center
- right

The alignment of the box.

##### borderStyle

Type: `String`

Default: `single`

Predefined values:

- `single`
```
   ┌───┐
   │foo│
   └───┘
```
- `double`
	```
	╔═══╗
	║foo║
	╚═══╝
	```
- `round` (`single` sides with round corners)
	```
	╭───╮
	│foo│
	╰───╯
	```
- `single-double` (`single` on top and bottom, `double` on right and left)
	```
	╓───╖
	║foo║
	╙───╜
	```
- `double-single` (`double` on top and bottom, `single` on right and left)
	```
	╒═══╕
	│foo│
	╘═══╛
	```
- `classic`
	```
	+---+
	|foo|
	+---+
	```

##### borderChars

Type: `Object`

Default: `null`

Specify the ANSII char used to build the box, can have the following keys: 

```js
{
    topLeft    : '+',
    topRight   : '+',
    bottomLeft : '+',
    bottomRight: '+',
    top       : '-',
    bottom    : '-',
    horizontal: '-',
    left    : '|',
    right   : '|',
    vertical: '|'
}
```

Which `horizontal` defined both `top` and `bottom` chars, as the same `vertical` defined both `left` and `right` chars. 

If we have already specified a border style, such as `single`, we can use this option to midify some char:

```js
var options = {
	borderStyle: 'single',
	borderChars: {
		topLeft    : '1',
    	topRight   : '2',
    	bottomLeft : '3',
    	bottomRight: '4'
	}
};
```

If the `borderStyle` is empty or not a valid value, we should define necessary chars to build the box, that's to say, all the corners and all the borders should be specified:

```js
var options = {
	borderStyle: '', // empty
	borderChars: {
	    // corners are necessary
		topLeft    : '1',
    	topRight   : '2',
    	bottomLeft : '3',
    	bottomRight: '4',
    	
    	// borders
    	top   : '-',  // or horizontal: '-'
    	bottom: '-',  // or horizontal: '-'
    	right : '|',  // or vertical: '|'
    	left  : '|'   // or vertical: '|'
    	
	}
};
```

##### borderColor

Type: `String`

Values: 

- black 
- red 
- green 
- yellow 
- blue 
- magenta 
- cyan 
- white 
- gray

Color of the box border.

##### dimBorder

Type: `Boolean`

Default: `false`

Reduce opacity of the border.


##### backgroundColor

Type: `String`

Values: 

- black 
- red 
- green 
- yellow 
- blue 
- magenta 
- cyan 
- white

Color of the background.

##### margin

Type: `Number`, `Array`, `Object`

Default: `0`

Set the size of the white space around the box.

If `margin` is a `Number`, the `left`/`right` margin is `3` times the `top`/`bottom` to make it look nice.

If `margin` is an `Array`, the array's item respectively represent the `top`, `right`, `bottom` and `left` margin of the box.

If `margin` is an `Object`, tha object can have any of the `top`, `right`, `bottom`, `left` properties.

**Examples:**
```js
var options = {
	margin: [1, 2, 3, 4]
};
/*
// equal to
var options = {
	margin: {
		top   : 1,
		right : 2,
		bottom: 3,
		left  : 4
	}
};
*/
```

##### padding

Type: `Number`, `Array`, `Object`

Default: `0`

Space between the text and box border.

If `padding` is a `Number`, the `left`/`right` padding is `3` times the `top`/`bottom` to make it look nice.

If `padding` is an `Array`, the array's item respectively represent the `top`, `right`, `bottom` and `left` padding of the box.

If `padding` is an `Object`, tha object can have any of the `top`, `right`, `bottom`, `left` properties.

## Related

- [boxup-cli](https://github.com/bubkoo/boxup-cli) - CLI for [boxup](https://github.com/bubkoo/boxup)
- [boxup-preset](https://github.com/bubkoo/boxup-preset) - Border style presets for [boxup](https://github.com/bubkoo/boxup)
