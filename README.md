
# Stylus for Meteor [![Build Status](https://travis-ci.org/hoppas/meteor-plugin-stylus.svg?style=flat-square)](https://travis-ci.org/hoppas/meteor-plugin-stylus)

[Stylus](http://stylus-lang.com/) is a revolutionary new language,
providing an efficient, dynamic, and expressive way to generate CSS.
Supporting both an indented syntax and regular CSS style.

### NOTE
This may not be compatible with other Meteor Stylus libraries. Please
uninstall anything related to Stylus before running this, otherwise your
application may fail with a fibers-related error.

### Imports
If you want to `@import` a file, give it the extension `.import.styl`
to prevent Meteor from processing it independently.

This packages supports both relative and absolute `@import`.
Absolute `@import` are relative to your root meteor application directory,
you shouldn't precede its path by `/`.

### Packages
 * [Stylus](https://github.com/stylus/stylus) with [url](http://stylus-lang.com/docs/functions.url.html)– 0.52.4
 * [poststylus](https://github.com/seaneking/poststylus) – 0.2.1
 * [autoprefixer](https://github.com/postcss/autoprefixer) – 6.0.3
 * [postcss-svg](https://github.com/Pavliko/postcss-svg) – 1.0.1
 * [postcss-zindex](https://github.com/ben-eb/postcss-zindex) – 2.0.0

### Testing
Run command
```
meteor test-packages ./
```
### TODO
 * add stylus.json config