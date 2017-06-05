// tooling
const postcss = require('postcss');

class Breakpoint
{
	/**
	 *	The default breakpoint options
	 *
	 *	@property Object
	 **/
	static get defaults(){
		return {
		  grid: {
		    base:		"16px",
		    columns: 	12,
		    gutter:	 	.5,
		    sizes:{
		      xxs:    	.25,
		      xs:     	.5,
		      s:      	.75,
		      m:      	1,
		      l:      	1.5,
		      xl:     	2,
		      xxl:    	4
		    }
		  },

		  breakpoints: {
		    xxs:    	"320px",
		    xs:     	"375px",
		    s:      	"425px",
		    m:      	"768px",
		    l:      	"1024px",
		    xl:    		"1200px",
		    xxl:    	"1440px"
		  }
		};
	}

	/**
	 *	Options to use
	 *
	 *	@property {Object} value
	 **/
	static set options(value)
	{
		Breakpoint._options = value;
	}
	static get options()
	{
		return Breakpoint._options;
	}

////////////////////////////////////////////////////////////////////////////////

	/**
	 *	Return the pre-defined expressions
	 *
	 *	@property {Object}
	 **/
	get expressions()
	{
		return {
			screen: 		"screen",
			print: 			"print",
			handheld: 	"handheld",
			landscape: 	"(orientation: landscape)",
			portrait: 	"(orientation: portrait)",
			retina2x: 	"(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi), (min-resolution: 2dppx)",
			retina3x: 	"(-webkit-min-device-pixel-ratio: 3), (min-resolution: 350dpi), (min-resolution: 3dppx)"
		}
	}

	/**
	 *	The intervals used for the computation
	 *
	 *	@property Object
	 **/
	get intervals()
	{
		return {
			px: 				1.00,
			em: 				0.01,
			rem: 				0.01,
			default: 		0.00
		}
	}

////////////////////////////////////////////////////////////////////////////////

	/**
	 *	Constructor
	 *
	 *	@param {String} e – The expression
	 **/
	constructor(e)
	{
		this.expression = e;
		this.operator = this.getOperator(e);
		this.value = this.getValue(e);

		this._isKnownExpression()
			? this._fetchKnownExpression()
			: this._processExpression();
	}

////////////////////////////////////////////////////////////////////////////////

	/**
	 *	Return the operator used in the given expression.
	 * 	If no operator are found, then return '='
	 *
	 *	@param {String} expression
	 *	@return {String}
	 **/
	getOperator(expression)
	{
		return this._getFirstFromMatch(expression, /[><=]+/, '=');
	}

	/**
	 *	Return the value used in the given expression.
	 *
	 *	@param {String} expression
	 *	@return {String}
	 **/
	getValue(expression)
	{
		return this._getFirstFromMatch(expression, /[\w]+/, null);
	}

	/**
	 *	Return the first match or the default
	 *
	 *	@param {String} expression
	 *	@param {RegExp} regexp
	 *	@param {*} ifNull
	 *	@return {*}
	 **/
	_getFirstFromMatch(expression, regexp, ifNull)
	{
		let m = expression.match(regexp);
		if (m)
		{
			return m[0];
		}
		else
		{
			return ifNull;
		}
	}

////////////////////////////////////////////////////////////////////////////////

	/**
	*	Return true if the given value is an expression
	*
	*	@return {Boolean}
	**/
	_isKnownExpression()
	{
		return this.expressions.hasOwnProperty(this.value);
	}

	/**
	 *	Fetch a pre-defined expression
	 **/
	_fetchKnownExpression()
	{
		if (this._isKnownExpression(this.value))
		{
			this.value = this.expressions[this.value];
		}
	}


////////////////////////////////////////////////////////////////////////////////

	/**
	 *	Process the expression
	 **/
	_processExpression()
	{
		// get the value
		this._fetchValue();

		// apply the operator
		this._applyOperator();
	}

	/**
	 *	Fetch the scale value
	 *
	 *	@return {Object}
	 **/
	_fetchValue()
	{
		let b = Breakpoint.options.breakpoints;
		if (b.hasOwnProperty(this.value))
		{
			this.value = b[this.value];
		}
		else
		{
			throw decl.error('Error: The given scale does not exists: ' + this.value, {
				word: this.value,
				plugin: 'postcss-salt-layout-breakpoint'
			});
		}
	}

	_applyOperator()
	{
		let value, interval, match, unit, prefix, property;

		match = this.value.match(/^([+-]?(?:\d+|\d*\.\d+))([a-z]*|%)$/);
		value = match[1];
		unit = match[2];
		interval = this.intervals.hasOwnProperty(unit) ? this.intervals[unit] : this.intervals.default;
		property = 'width';

		switch (this.operator)
		{
			case '=':
			case '>=':
			case '<=':
			default:
				prefix = 'max';
				break;

			case '>':
				value = parseFloat(value) + parseFloat(interval);
				prefix = 'min';
				break;

			case '<':
				value = parseFloat(value) - parseFloat(interval);
				prefix = 'max';
				break;
		}

		// let's compose
		this.value = `(${prefix}-${property}: ${value}${unit})`;
	}
}



// plugin
module.exports = postcss.plugin('postcss-salt-typography', (opts) => {

	// options
	const prefix = '\\*';
	Breakpoint.options = opts = opts || Breakpoint.defaults;

	// property pattern
	const rulesMatch = new RegExp(`^${ prefix }breakpoint$`);

	// process a matched declaration
	const processMatchedDeclaration = (rule) =>
	{
		rule.name = "media ";

		var m = /([><=]*\s*[\w]+)/gm;
		let params = rule.params.match(m);

		let r = params.map(function(e){
			let b = new Breakpoint(e);
			return b.value;
		});

		rule.params = r.join(' and ');
	}

	return (css) => {
		// walk each matching declaration
		css.walkAtRules(rulesMatch, processMatchedDeclaration);
	};
});
