'use strict'
/*A3+
Написать чистую функцию, проверяющую, что переданная ей фраза является палиндромом.
(Палиндром - это фраза, которая слева направо читается так же как справа налево)
Массивы при решении не использовать.
При проверке должны игнорироваться:
    - регистр букв;
    - пробелы;
    - знаки препинания;
    - мягкие и твёрдые знаки;
    - разница между буквами "е" и "ё".
*/
		
function palindrom(txt) {
    var txtLC = txt.toLowerCase();
    var txtNorm = '';
    //очистка строки
    for(var i = 0; i < txtLC.length; i++) {
        if(txtLC[i] === 'ё')
            txtNorm += 'е';
        if(txtLC[i] >= 'а' && txtLC[i] <= 'я' && txtLC[i] != 'ь' && txtLC[i] != 'ъ')
            txtNorm += txtLC[i];
    }
    //проверка на палиндром
    for(var j = 0; j <= (txtNorm.length / 2 - 1); j++){
        if(txtNorm[j] !== txtNorm[txtNorm.length - 1 - j])
            return false;
    }
    return true;	
}

console.log(palindrom('Кинь лёд зебре, бобёр бездельник! '));