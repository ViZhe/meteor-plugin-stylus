
function stylusTest (test_name, template_name, class_name, style_property, style_value) {
    Tinytest.add(test_name, function(test) {
        var div = document.createElement('div');
        UI.render(Template[template_name], div);
        div.style.display = 'block';
        document.body.appendChild(div);

        var p = div.querySelector('p.' + class_name);
        var property = getStyleProperty(p, style_property);
        test.equal(property, style_value);

        document.body.removeChild(div); // toggle this line to test ur p's, bruh
    });
}

// Stylus
stylusTest(
    'stylus - presence',
    'stylus_test_presence',
    'stylus_presence',
    'border-left-style',
    'dashed'
);

// Stylus.url
stylusTest(
    'stylus - url absolute',
    'stylus_test_url',
    'stylus_url_absolute',
    'background-image',
    'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABU1BMVEUAAABmu2pkumhjumdmu2pmu2pmu2pkumhiuWdlumlmu2pmu2pmu2plumliuWZiuWZlu2lnu2tzwXd0wXhnvGtlumlmu2plu2lrvW5tvnFlu2lmu2pmu2plu2lmu2pmu2pmu2pmu2pmu2pzwXdnu2tmu2pmu2pmu2pywHbK58vT69Ruv3Jlu2lmu2prvW/N6c7Q6tFsvW/b79zk8+Vwv3Rlu2lmu2ptvnHd8N7h8uJvv3Lb79zk8+Vwv3Rlu2lmu2ptvnHd8N7h8uJvv3Jlu2nb79zk8+VxwHVmu2pnu2tuvnHe8N/h8uJvv3Jlu2lmu2rZ7tr4/PjQ6tHM6M7M6c7P6tD1+/bg8eFlu2nZ7tr5/PnX7djU7NXU7NXW7df3+/fg8eHb79zk8+VzwXZovGxpvGxwv3Pe8N/h8uLb79zk8+Rwv3Rlu2llu2ltvnDd8N7///8OH2IpAAAAI3RSTlMAAAAAAxcrAzmW0OXQljkDCHXq6nUIAnX4+HU66ekBlc8r5X8w79sAAAABYktHRHDYAGx0AAAAB3RJTUUH3wYdESUNiSkbpQAAALRJREFUGNNjYAACRhZWNjZWFkYGCGBi5+Dk4ubm4eXjZwZLCwgKKauoqqlrCIuIAhUxiolLaGpp6+jq6RtISokxMjBKyxgaGZuYmplbWFrJSjMyyMnrGlrb2NrZOzg6ObvIyzGwKugaurq5e3h6efv4+imwMigq+RsGBAYFh4SGhftGKCmCBSKjomNi4+ITwAIgLYlJySmpaekZYC0gQzOzsnNy8/IhhmJYi+EwDKdjeg7N+wCOcyVvqqAkqgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNS0wNi0yOVQxNzozNzoxMyswMjowMGliddsAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTUtMDYtMjlUMTc6Mzc6MTMrMDI6MDAYP81nAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAABJRU5ErkJggg==)'
);

stylusTest(
    'stylus - url relative',
    'stylus_test_url',
    'stylus_url_relative',
    'background-image',
    'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABU1BMVEUAAABmu2pkumhjumdmu2pmu2pmu2pkumhiuWdlumlmu2pmu2pmu2plumliuWZiuWZlu2lnu2tzwXd0wXhnvGtlumlmu2plu2lrvW5tvnFlu2lmu2pmu2plu2lmu2pmu2pmu2pmu2pmu2pzwXdnu2tmu2pmu2pmu2pywHbK58vT69Ruv3Jlu2lmu2prvW/N6c7Q6tFsvW/b79zk8+Vwv3Rlu2lmu2ptvnHd8N7h8uJvv3Lb79zk8+Vwv3Rlu2lmu2ptvnHd8N7h8uJvv3Jlu2nb79zk8+VxwHVmu2pnu2tuvnHe8N/h8uJvv3Jlu2lmu2rZ7tr4/PjQ6tHM6M7M6c7P6tD1+/bg8eFlu2nZ7tr5/PnX7djU7NXU7NXW7df3+/fg8eHb79zk8+VzwXZovGxpvGxwv3Pe8N/h8uLb79zk8+Rwv3Rlu2llu2ltvnDd8N7///8OH2IpAAAAI3RSTlMAAAAAAxcrAzmW0OXQljkDCHXq6nUIAnX4+HU66ekBlc8r5X8w79sAAAABYktHRHDYAGx0AAAAB3RJTUUH3wYdESUNiSkbpQAAALRJREFUGNNjYAACRhZWNjZWFkYGCGBi5+Dk4ubm4eXjZwZLCwgKKauoqqlrCIuIAhUxiolLaGpp6+jq6RtISokxMjBKyxgaGZuYmplbWFrJSjMyyMnrGlrb2NrZOzg6ObvIyzGwKugaurq5e3h6efv4+imwMigq+RsGBAYFh4SGhftGKCmCBSKjomNi4+ITwAIgLYlJySmpaekZYC0gQzOzsnNy8/IhhmJYi+EwDKdjeg7N+wCOcyVvqqAkqgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNS0wNi0yOVQxNzozNzoxMyswMjowMGliddsAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTUtMDYtMjlUMTc6Mzc6MTMrMDI6MDAYP81nAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAABJRU5ErkJggg==)'
);

// Autoprefixer
stylusTest(
    'stylus - autoprefixer',
    'stylus_test_autoprefixer',
    'stylus_autoprefixer',
    '-webkit-column-count',
    '2'
);

// Postcss-svg
stylusTest(
    'stylus - svg',
    'stylus_test_svg',
    'stylus_svg',
    'background-image',
    'url(data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2046.11%2046.11%22%3E%3Cpath%20d%3D%22M23.054%200C10.342%200%200%2010.342%200%2023.055S10.342%2046.11%2023.055%2046.11%2046.11%2035.768%2046.11%2023.055%2035.768%200%2023.054%200zm0%2039.11C14.2%2039.11%207%2031.908%207%2023.055S14.2%207%2023.054%207c8.853%200%2016.056%207.202%2016.056%2016.055S31.907%2039.11%2023.054%2039.11z%22%2F%3E%3C%2Fsvg%3E)'
);

// Postcss-zindex
stylusTest(
    'stylus - zindex is first',
    'stylus_test_zindex',
    'stylus_zindex_first',
    'z-index',
    '1'
);

stylusTest(
    'stylus - zindex is second',
    'stylus_test_zindex',
    'stylus_zindex_second',
    'z-index',
    '2'
);
