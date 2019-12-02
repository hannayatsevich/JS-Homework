'use strict'
/*Написать «чистую» функцию для эффективного подсчёта количества русских гласных букв в строке. 
Регулярные выражения (кто умеет) не использовать. 
Спросить у пользователя строку. Вывести в консоль количество русских гласных букв в ней.
*/

console.time('T');

function vowelsInText(txt) {
    var txtSplit = txt.split('');
    var vowels = {'а':0,'е':0,'ё':0,'и':0,'о':0,'у':0,'ы':0,'э':0,'ю':0,'я':0,'A':0,'E':0,'Ё':0,'И':0,'О':0,'У':0,'Ы':0,'Э':0,'Ю':0,'Я':0};
    var vowelsCount = 0;
    for(var i = 0; i < txtSplit.length; i++) {
        var letter = txtSplit[i];
        if(letter in vowels)
            vowelsCount++;
    };
    return vowelsCount;
}
        
console.timeEnd('T');

//получение словоформы для числа
function getNumWord(num, word1, word2, word5) {
    var dd = num % 100;
    if((dd >= 11) && (dd <= 19 ))
        return word5;
    var d = num % 10;
    if(d == 1)
        return word1;
    if((d >= 2) && (d <= 4))
        return word2;
    return word5;
}

var txt = prompt('Введите предложение любой длины на русском языке');
console.log(`В предложении ${vowelsInText(txt)} ${getNumWord(vowelsInText(txt),'гласная буква','гласные буквы','гласных букв')}`);

/*
Variant 2
function vowelsInText(txt) {
    var txtSplit = txt.toLowerCase().split('');
    var vowels = ['а','е','ё','и','о','у','ы','э','ю','я'];
    var vowelsCount = 0;
    for(var i = 0; i < txtSplit.length; i++) {
        var letter = txtSplit[i];
        if(vowels.includes(letter))//Метод includes() определяет, содержит ли массив определённый элемент, возвращая в зависимости от этого true или false. arr.includes(searchElement[, fromIndex = 0]). Методы массивов indexOf() и includes(), используемые для поиска элементов и проверки того, имеется ли в массиве некий элемент, работают медленно.
            vowelsCount++;
    };
    return vowelsCount;
}
*/
/*
Variant 3
function vowelsInText(txt) {
    var txtSplit = txt.toLowerCase().split('');
    var vowels = 'аеёиоуыэюя';
    var vowelsCount = 0;
    for(var i = 0; i < txtSplit.length; i++) {
        var letter = txtSplit[i];
        if(vowels.indexOf(letter) != -1)//Метод indexOf() возвращает первый индекс, по которому данный элемент может быть найден в массиве или -1, если такого индекса нет. arr.indexOf(searchElement[, fromIndex = 0]). Методы массивов indexOf() и includes(), используемые для поиска элементов и проверки того, имеется ли в массиве некий элемент, работают медленно.
            vowelsCount++;
    };
    return vowelsCount;
}
*/
/*
Variant 4
function vowelsInText (txt) {
    var txtSplit = txt.toLowerCase().split('');
    var vowels = new Set(['а','е','ё','и','о','у','ы','э','ю','я']);
    var vowelsCount = 0;
    for(var i = 0; i < txtSplit.length; i++) {
        var letter = txtSplit[i];
        if(vowels.has(letter))//Set – коллекция для хранения множества значений, причём каждое значение может встречаться лишь один раз. Метод  has() возвращает логическое значение, показывающее, существует ли элемент с указанным значением в объекте  Set или нет.
            vowelsCount++;
    };
    return vowelsCount;
}
*/
/*
Variant 5
function textVowels(txt) {
    function textVowelsCount(v) {
        var vowels = 'аеёиоуыэюя';
        return vowels.indexOf(v) != -1;
    };
    return txt.toLowerCase().split('').filter(textVowelsCount).length;
}
*/
/*
Variant 6
function textVowels(txt) {
    function textVowelsCount(sum, v) {
        var vowels = 'аеёиоуыэюя';
        if (vowels.indexOf(v) != -1){
            return sum + 1;
        }
        return sum;
    }
    return txt.toLowerCase().split('').reduce(textVowelsCount, 0);
}
*/
/*
Variant 7
function textVowels(txt) {
    var sum = 0;	
    function textVowelsCount(v) {
        var vowels = 'аеёиоуыэюя';
        if (vowels.indexOf(v) != -1)
            sum++;
    }
    txt.toLowerCase().split('').forEach(textVowelsCount);
    return sum;
}
*/