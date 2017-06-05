const salt = require('./');

var layout = {
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

module.exports = {
  plugins: [
    require('./index.js')(layout)
  ]
}
