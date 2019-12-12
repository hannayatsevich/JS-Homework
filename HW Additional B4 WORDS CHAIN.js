'use strict'
/*B4+
Дан большой массив слов - словарь.
Написать функцию, получающую два слова, и строящую за несколько шагов 
из первого слова второе, за каждый шаг меняя не более одной буквы,
так, чтобы на каждом шаге получалось допустимое слово (слово из словаря).
Функция должна вернуть самую короткую цепочку шагов в виде строки.
Например, при работе со следующим словарём:
["ТАРА","ЛИПА","ТУРА","ЛУЖА","ПАРК","ЛОЖЬ","ЛУПА","ПЛОТ","МУРА","ПАУК","ПАУТ","ПЛУТ","ЛОЖА","СЛОТ","ПАРА"]
при вызове со словами "ЛИСА" и "ЛОСЬ", функция должна вернуть строку:
"ЛИСА-ЛИПА-ЛУПА-ЛУЖА-ЛОЖА-ЛОЖЬ-ЛОСЬ"
а при вызове со словами "МУХА" и "СЛОН" - строку:
"МУХА-МУРА-ТУРА-ТАРА-ПАРА-ПАРК-ПАУК-ПАУТ-ПЛУТ-ПЛОТ-СЛОТ-СЛОН"
*/

function wordToWord(word1, word2, maxSteps = 100) {
  var vocabulary = ["ЛУЖА","МУЗА","ЛИРА","МЕХА","ЛИГА","ТАРА","ЛИПА","ТУРА","ПАРК","ЛОЖЬ","ЛУПА","ПЛОТ","МУРА","ПАУК","ПАУТ","ПЛУТ","ЛОЖА","СЛОТ","ПАРА"];
  var steps=0;//нет решения за n-ое количество ходов						
  function chain(start, change = -1){//change - позиция измененной буквы в слове
    steps += 1;
    var answer;
    if(steps > maxSteps) {
      answer = 'Пройдено максимально разрешённое число шагов, ответ не найден';
    }
    else{
      answer = start + '-';
      //функция для фильтрации словаря по признаку отличия на 1 букву от стартового слова
      function charChange(v) {
        let charCount = 0;
        for(var i = 0; i < start.length; i++){
          if(v[i] === start[i])
            charCount++;
        };
        if(charCount === start.length - 1)
          return true;
      };
      //функция проверки слова на предмет отличия на 1 букву от конечного слова
      function checkEnd(v) {
        let charCount = 0;
        for(var i = 0; i < word2.length; i++){
          if(v[i] === word2[i])
            charCount++;
        };
        if(charCount === v.length - 1)
          return true;
      };
      //функция для оценки схожести слова из массива вариантов с конечным словом и сортировки массива
      function wordScore(word, b = word2) {
        var score = 0;
        var vowels = 'аеёиоуыэюя';
        for(var i = 0; i < word.length; i++){
          if(word[i] === b[i]) {
            score += 3;//символы совпадают полностью
          };
          if(vowels.indexOf(word[i].toLowerCase()) !== -1 && vowels.indexOf(b[i].toLowerCase()) !== -1) {
            score += 2;//наличие гласной буквы в нужном месте
          }
          else if(vowels.indexOf(word[i].toLowerCase()) !== -1){
            score += 1;//наличие гласной буквы 
          };
        };
        return score;
      };
      //фукция для фильтрации отсортированного массива от вариантов с изменением той же позиции, что и на предыдущем ходе
      function letterChanged(v) {
        var position =- 1;
        for(var i = 0; i < v.length; i++){
          if(v[i] !== start[i]){
            position = i;
          };
        };
        if(position !== change){
          return true;
        }
        else{return false;}
      };
      //функция получения измененной позиции
      function getLetterChanged(v) {
        var position = -1;
        for(var i = 0; i < v.length; i++){
          if(v[i] !== start[i]) {
            position = i;
          };
        };
        return position;
      };
      let charChangeArray=vocabulary.filter(charChange);
      if(charChangeArray.length === 0) {
        answer = 'Цепочка прервалась';
      }
      if(charChangeArray.length === 1 && checkEnd(charChangeArray[0])) {
        answer += charChangeArray[0] + '-' + word2;
      }
      else if(charChangeArray.length === 1) {
        //отсев слов с аналогичной позицией измененной буквы во входном слове
        var charChangeArrayFiltered = charChangeArray.filter(letterChanged);
        if(charChangeArrayFiltered.length === 0) {
          answer = 'Цепочка прервалась';
        }
        else{var deleteWord = vocabulary.indexOf(charChangeArray[0]);
          vocabulary.splice(deleteWord, 1);//дорогая операция!
          var check=chain(charChangeArray[0], getLetterChanged(charChangeArray[0]));
          if(check === 'Цепочка прервалась'){
            answer = 'Цепочка прервалась';
          }
          else if(check === 'Пройдено максимально разрешённое число шагов, ответ не найден') {
            answer = 'Пройдено максимально разрешённое число шагов, ответ не найден';
          }
          else{answer += check};
        };
      }
      else{//сортировка массива по уровню схожести слов с конечным словом
        charChangeArray.sort((a,b) => {return wordScore(b) - wordScore(a)});
        //отсев слов с аналогичной позицией измененной буквы во входном слове
        var charChangeArrayFiltered = charChangeArray.filter(letterChanged);
        //удаление отсеянных слов из словаря, если что-то было отсеяно
        if(charChangeArray.length !== charChangeArrayFiltered.length) {
          for(var i = 0; i < charChangeArray.length; i++) {
            if(charChangeArrayFiltered.indexOf(charChangeArray[i]) === -1) {
              var deleteWord = vocabulary.indexOf(charChangeArray[i]);
              vocabulary.splice(deleteWord, 1);//дорогая операция!
            };					
          };
        };	
        if(charChangeArrayFiltered.length === 0){
          answer = 'Цепочка прервалась';
        }
        else {for(var i = 0; i < charChangeArrayFiltered.length; i++){
            function checkNextStep() {
              var deleteWord = vocabulary.indexOf(charChangeArrayFiltered[i]);
              vocabulary.splice(deleteWord, 1);//дорогая операция!
              var check = chain(charChangeArrayFiltered[i], getLetterChanged(charChangeArrayFiltered[i]));
              return check;
            };
            var check = checkNextStep();
            if(check === 'Пройдено максимально разрешённое число шагов, ответ не найден') {
              answer = 'Пройдено максимально разрешённое число шагов, ответ не найден';
              break;
            };
            if(check !== 'Цепочка прервалась'){
              answer += check;
              break;
            };						
          };
          if(answer === start + '-'){
            answer = 'Цепочка прервалась';
          };
        };
      };					
    };
    return answer;
  };
  return chain(word1);
} ;

(function() {
  console.log('ЛИСА ' + '-->' + ' ЛОСЬ: ' + wordToWord('ЛИСА','ЛОСЬ'));	
  console.log(wordToWord('ЛИСА','ЛОСЬ') === 'ЛИСА-ЛИПА-ЛУПА-ЛУЖА-ЛОЖА-ЛОЖЬ-ЛОСЬ'?'тест пройден':'ТЕСТ НЕ ПРОЙДЕН');
  console.log('МУХА ' + '-->' + ' СЛОН: ' + wordToWord('МУХА','СЛОН'));
  console.log(wordToWord('МУХА','СЛОН') === 'МУХА-МУРА-ТУРА-ТАРА-ПАРА-ПАРК-ПАУК-ПАУТ-ПЛУТ-ПЛОТ-СЛОТ-СЛОН'?'тест пройден':'ТЕСТ НЕ ПРОЙДЕН');
  console.log('МУХА ' + '-->' + ' ГРОМ: ' + wordToWord('МУХА','ГРОМ'));
  console.log('МУХА ' + '-->' + ' СЛОН (max 5 шагов): ' + wordToWord('МУХА','СЛОН',5));
})();