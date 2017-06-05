# [WIP] Salt - Layout - Breakpoint

> PostCSS plugin that walk through you css declarations to find the dynamic font values and enforce a predefined one. This plugin is part of [Salt](https://github.com/alexandremasy/salt), a collection of tool to help you enforce a set of rule througout your application.



## Getting started

Installation is as easy as:

```shell
npm install postcss-salt-typography-parser
```



**PostCSS**

Include the plugin in you build process:

```
@TODO

```

**Gulp**

Include the plugin in your build process:

```
@TODO
```



This plugins depends on :

- [PostCSS](https://github.com/postcss/postcss)
- [Salt - Typography - Helper](https://github.com/alexandremasy/postcss-salt-typography-helper)
- [Salt - Layout - Breakpoint](https://github.com/alexandremasy/postcss-salt-layout-breakpoint)





## Functionalities

Walk through your typographic css declarations to find the dynamic values and enforce a predefined one;

 ```css
html{
  *breakpoint(<operator><conditions>...){}
  property: *grid(<operator>?<scale>)
}
 ```



1. Generate the media queries breakpoint with control operator
2. Output the grid value when needed



### Media Queries

The conjuction of both predefined operator and [logical disjunctions](https://en.wikipedia.org/wiki/Logical_disjunction) enabled you to write easily maintainable breakpoints. The entry point is a mixin called `breakpoint`. An unlimited quantity of arguments is accepted. Each *String* argument is composed of either an *operator* and a *breakpoint* or a *predefined media expression*. 