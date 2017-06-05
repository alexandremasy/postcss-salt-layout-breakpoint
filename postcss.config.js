const salt = require('./');

var layout = {
  grid: {
    base:		"16px",
    columns: 	12,
    gutter:	 	0.5,
    sizes: {
      xxs:    	0.25,
      xs:     	0.50,
      s:      	0.75,
      m:      	1.00,
      l:      	1.50,
      xl:     	2.00,
      xxl:    	4.00
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

module.exports = {
  plugins: [
    require('./index.js')(layout)
  ]
}
