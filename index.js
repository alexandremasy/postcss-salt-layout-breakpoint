// tooling
const postcss = require('postcss');

const defaults = {
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
  )

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


// plugin
module.exports = postcss.plugin('postcss-salt-typography', (opts) => {

	// options
	const prefix = '*';
	opts = opts || defaults;

	// *breakpoint(<operator><conditions>...){}

	// property pattern
	const propertyMatch = new RegExp(`^${ prefix }(font(?:-family|-weight|-size|-style)?|line-height)$`);

	// process a matched declaration
	const processMatchedDeclaration = (decl) =>
	{
		const property = decl.prop.match(propertyMatch)[1];
		const value = decl.value;

		plugins.forEach((e) =>
		{
			if (e.property == property)
			{
				decl.after(e.process(decl));
			}
		});

		decl.remove();
	}

	return (css) => {
		// walk each matching declaration
		css.walkDecls(propertyMatch, processMatchedDeclaration);
	};
});
