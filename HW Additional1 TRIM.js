'use strict'

function trim(txt) {
    if(txt.indexOf(' ') == -1)
        return txt;
    else {
        for (var i = 0; i < txt.length; i++) {
            if (txt.charAt(i) != ' ')
                break;
        };
        if (i == txt.length)
            return 'текст состоит из одних пробелов';
        else {
            for(var j = txt.length - 1; j >= 0; j--) {
                if(txt.charAt(j) != ' ')
                    break;
            };
            return txt.substring(i, j + 1);
        };
    };
};

console.time('T');
console.log(trim('       Hello       '));
console.timeEnd('T');