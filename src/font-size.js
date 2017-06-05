const abstract = require('./abtract.js');
const _ = require('underscore');
const postcss = require('postcss');

/**
 *  Font Size parser
 *
 *  @author Alexandre Masy <hello@alexandremasy.com>
 **/
class fontSize extends abstract
{
  /**
   *  The property
   *
   *  @return {String}
   **/
  get property() { return 'font-size'; }

  /**
   *  Process the value to output the appropriate replacement
   *
   *  @param {String} decl
   **/
  process(decl)
  {
    super.process(decl);

    let value = decl.value;

    // get the def
    let family, size;
    if (value.indexOf('/') != -1)
    {
      let r = new RegExp(`^(.*)\/(.*)$`)
      let m = value.match(r);

      family = _.findWhere(this._options, {name:m[1]});
      if (!family)
      {
        throw decl.error('Error: The given font definition name does not exists: ' + m[1], { word: m[1], plugin: 'postcss-salt-typography' });
      }
      size = m[2];
    }
    else
    {
      family = this._options[0];
      size = value;
    }

    // get the values
    size = family.sizes[size];

    // apply the def to the template
    return this.apply({family:family.name, size});
  }

  /**
   *  Apply the given values to a template
   *
   *  @param {Object} def
   *  @return {Node}
   **/
  apply(def)
  {
    let tpl;
    if (Array.isArray(def.size))
    {
      let fontFirst = this.stripUnit(def.size[0]);
      let fontLast = this.stripUnit(def.size[def.size.length-1]);

      // @TODO Replace with appropriate values
      let breakpointFirst = 16;
      let breakpointLast = 89;
      let fontUnit = /^([+-]?(?:\d+|\d*\.\d+))([a-z]*|%)$/.exec(def.size[0])[2];
      // @TODO Compute appropriate value
      let breakpointUnit = 'rem';

      tpl = `
      font-size: calc(${fontFirst + fontUnit}+(${fontLast}-${fontFirst})*(100vw-${breakpointFirst+breakpointUnit})/(${breakpointLast}-${breakpointFirst}));

      *breakpoint('>last')
      {
        font-size: ${fontLast + fontUnit};
      }

      *breakpoint('<first')
      {
        font-size: ${fontFirst + fontUnit};
      }
      `;
    }
    else
    {
      tpl = `font-size: ${def.size}`
    }

    return postcss.parse(tpl);
  }

  /**
   *  Strip the unit
   *
   *  @param {String} value
   *  @return {Number}
   **/
  stripUnit(value)
  {
    return parseFloat(/^([+-]?(?:\d+|\d*\.\d+))([a-z]*|%)$/.exec(value)[0]);
  }
}

module.exports = new fontSize();
