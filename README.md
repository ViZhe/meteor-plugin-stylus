
# Stylus for Meteor [![Build Status](https://travis-ci.org/hoppas/meteor-plugin-stylus.svg?style=flat-square)](https://travis-ci.org/hoppas/meteor-plugin-stylus)

[Stylus](http://stylus-lang.com/) is a revolutionary new language,
providing an efficient, dynamic, and expressive way to generate CSS.
Supporting both an indented syntax and regular CSS style.



### How it work

1. takes all `.styl` files
2. excludes files with prefix `.import` (`.import.styl`)
3. files are sorted according to template:
    ```
client/styles/vars/
client/styles/mixins/
client/styles/top/
client/styles/middle/
client/styles/bottom/
client/lib/
*
    ```
4. merge files
5. compile into css


### Imports
If you want to `@import` a file, give it the extension `.import.styl`
to prevent Meteor from processing it independently.

This packages supports only absolute `@import`
from root meteor application directory.


### Configuration
For configure the package, create the file `/config/stylus.json`.

Default options:
```
{
    "url": {
        "paths": ["./public/"],
        "limit": 30000
    },
    "autoprefixer": {
        "browser": ["last 2 versions",
                    "Explorer >= 10",
                    "Android >= 4.1",
                    "Safari >= 7",
                    "iOS >= 7"]
    },
    "svg": {
        "svgo": true,
        "ei": false
    }
}
```


### Stylus plagins
 * [Stylus](https://github.com/stylus/stylus) with [url](http://stylus-lang.com/docs/functions.url.html)– 0.52.4
 * [poststylus](https://github.com/seaneking/poststylus) – 0.2.1
 * [postcss-svg](https://github.com/Pavliko/postcss-svg) – 1.0.1
 * [postcss-zindex](https://github.com/ben-eb/postcss-zindex) – 2.0.0
 * [autoprefixer](https://github.com/postcss/autoprefixer) – 6.0.3


### Testing
Run command
```
meteor test-packages ./
```


### NOTE
This may not be compatible with other Meteor Stylus libraries. Please
uninstall anything related to Stylus before running this, otherwise your
application may fail with a fibers-related error.
