'use strict'
/*A2+
Написать чистую функцию, эффективно удаляющую из переданной ей строки все начальные и конечные пробелы.
Не используйте метод строки trim.
Не используйте массивы (это неэффективно в данной задаче).
Если умеете работать с регулярными выражениям - не используйте и их :)
*/

function trim(txt) {
    var i = 0;
    while((i < txt.length) && (txt.charAt(i) == ' ')) {
        i++;
    };
    if(i == txt.length)
        return '';
    var j = txt.length - 1;
    while((j >= 0) && (txt.charAt(j) == ' ')) {
        j--;
    };
    if((i == 0) && (j = txt.length - 1)) 
        return txt;
    return txt.substring(i, j + 1);
}

console.time('T');
console.log(trim('       Hello       '));
console.timeEnd('T');