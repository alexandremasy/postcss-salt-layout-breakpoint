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

The conjuction of both predefined operator and [logical disjunctions](https://en.wikipedia.org/wiki/Logical_disjunction) enabled you to write easily maintainable breakpoints. The entry point is a mixin called `*breakpoint`. An unlimited quantity of arguments is accepted. Each *String* argument is composed of either an *operator* and a *breakpoint* or a [predefined media expression](#predefined-media-expressions). 



### Syntax

 ```css
*breakpoint(<operator><conditions>...){
  <css>
}
 ```



|      |      |      |
| ---- | ---- | ---- |
|      |      |      |



### Breakpoints definition

Here is the list of breakpoint available by default. They are based on the [most commonly used devices ratio available](https://medium.freecodecamp.com/the-100-correct-way-to-do-css-breakpoints-88d6a5ba1862). These are customisable via the [layout definition syntax](https://github.com/alexandremasy/postcss-salt-layout#configuration). 

| Name | Size   |
| ---- | ------ |
| xxs  | 320px  |
| xs   | 375px  |
| s    | 425px  |
| m    | 768px  |
| l    | 1024px |
| xl   | 1200px |
| xxl  | 1440px |



### Operators

The use of prefined operators induces the use of a min-width or max-width media query. 

| Operator | Operation |
| -------- | --------- |
| `<` `<=` | min-width |
| `>` `>=` | max-width |



### Supported units

Depending on the unit used for declaring the breakpoints, and the operator used we decrease or increase the breakpoint with an interval. 

Here is a list of the supported units and the related interval added or substracted. By default the `_settings.scss` file is configured to take advantage of the em unit.  

| Unit    | Interval |
| ------- | -------- |
| px      | 1        |
| em      | 0.01     |
| rem     | 0.1      |
| default | 0        |



### Predefined media expressions

Expressions containing logical disjunctions, such as [Chris Coyier's retina declaration](http://css-tricks.com/snippets/css/retina-display-media-query/), are correctly handled, even when combined with other media types or breakpoints.

```scss
*breakpoint("retina2x", ">m") {
	width: 100%;
}
```



Here is the list of available media expressions:

| Name      | Value                                    |
| --------- | ---------------------------------------- |
| screen    | "screen"                                 |
| print     | "print"                                  |
| handheld  | "handheld"                               |
| landscape | "(orientation: landscape)"               |
| portrait  | "(orientation: portrait)"                |
| retina2x  | "(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi), (min-resolution: 2dppx)" |
| retina3x  | "(-webkit-min-device-pixel-ratio: 3), (min-resolution: 350dpi), (min-resolution: 3dppx)" |



### Example

```css
h1{
  *breakpoint(>m)
  {
    color: red;
  }
}
```



**will yield**

```css
h1{
  @media (min-width:<m - 1*interval>){
    color: red;
  }
}
```



