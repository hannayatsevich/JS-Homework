'use strict'

/*С2+
Напишите функцию deepComp для глубокого сравнения переданных ей значений.
Значения могут быть числами, строками, хэшами, массивами, в т.ч. любого уровня вложения.
Учтите, что цикл for..in не гарантирует перебора ключей хэша в каком-либо порядке.
Напишите тесты правильной работы функции
*/

function deepComp(x,y) {
  var answer;
  if((Array.isArray(x) !== Array.isArray(y)) || typeof(y) !== typeof(x)) {
    answer = false;
  }
  else {
    switch(true) {
      case (typeof(x) === 'string') || (typeof(x) === 'number') || (typeof(x) === 'undefined') || (x === null):
        if(x === y) {
          answer = true;
        }
        else if(typeof(x) === 'number' && isNaN(x) && typeof(y) === 'number' && isNaN(y)) {
          answer = true;
        }
        else {answer = false};
        break;
      case (Array.isArray(x)):
          if(x.length !== y.length) {
            answer = false;
          }
          else if(x.length === 0) {
            answer = true;
          }
          else {
            for(var i = 0; i < x.length; i++){
              answer = deepComp(x[i], y[i]);
              if(answer === false){
                break;
              }
              else {answer = true};
            }
          }							
          break;
      case (typeof(x) === 'object'):
        if(y === null || Object.keys(x).length !== Object.keys(y).length) {
          answer = false;
        }
        else if(Object.keys(x).length === 0) {
          answer = true;
        }
        else{
          for(var key in x) {
            if(!(key in y)) {
              answer = false;
              break;
            }										
            else {
              answer = deepComp(x[key], y[key]);
              if(answer === false) {
                break;
              }
              else {answer = true};
            };									
          }									
        };							
        break;
    };
  };
  return answer;
};

(function(){
  var H1 = { a:5, b: { b1:6, b2:7 } };
  var H2 = { b: { b1:6, b2:7 }, a:5 };
  var H3 = { a: 5, b: { b1:6 } };
  var H4 = { a: 5, b: { b1:66, b2:7 } };
  var H5 = { a: 5, b: { b1:6, b2:7, b3:8 } };
  var H6 = { a: null, b: undefined, c:Number.NaN };
  var H7 = { c: Number.NaN, b: undefined, a: null };
  var H8 = {a: 5, b: 6};
  var H9 = {c: 5, d: 6};
  var H10 = {a: 5};
  var A1 = [5, 7];
  var A2 = [5, 5, 7];
  var A3 = [5, 8, 7];
  var A4 = [5, 8, 7];
  console.log(deepComp(H1, H2) === true?'тест пройден':'ТЕСТ 1 НЕ ПРОЙДЕН');
  console.log(deepComp(H1, H3) === false?'тест пройден':'ТЕСТ 2 НЕ ПРОЙДЕН');
  console.log(deepComp(H1, H4) === false?'тест пройден':'ТЕСТ 3 НЕ ПРОЙДЕН');
  console.log(deepComp(H1, H5) === false?'тест пройден':'ТЕСТ 4 НЕ ПРОЙДЕН');
  console.log(deepComp(H6, H7) === true?'тест пройден':'ТЕСТ 5 НЕ ПРОЙДЕН');
  console.log(deepComp(H8, H9) === false?'тест пройден':'ТЕСТ 6 НЕ ПРОЙДЕН');
  console.log(deepComp(H8, H10) === false?'тест пройден':'ТЕСТ 7 НЕ ПРОЙДЕН');
  console.log(deepComp(null, H10) === false?'тест пройден':'ТЕСТ 8 НЕ ПРОЙДЕН');
  console.log(deepComp(H10, null) === false?'тест пройден':'ТЕСТ 9 НЕ ПРОЙДЕН');
  console.log(deepComp(null, null) === true?'тест пройден':'ТЕСТ 10 НЕ ПРОЙДЕН');
  console.log(deepComp(null, undefined) === false?'тест пройден':'ТЕСТ 11 НЕ ПРОЙДЕН');
  console.log(deepComp(5, "5") === false?'тест пройден':'ТЕСТ 12 НЕ ПРОЙДЕН');
  console.log(deepComp(5, H1) === false?'тест пройден':'ТЕСТ 13 НЕ ПРОЙДЕН');
  console.log(deepComp(A1, H1) === false?'тест пройден':'ТЕСТ 14 НЕ ПРОЙДЕН');
  console.log(deepComp(A2, A3) === false?'тест пройден':'ТЕСТ 15 НЕ ПРОЙДЕН');
  console.log(deepComp(A4, A3) === true?'тест пройден':'ТЕСТ 16 НЕ ПРОЙДЕН');
  console.log(deepComp([], []) === true?'тест пройден':'ТЕСТ 17 НЕ ПРОЙДЕН');
  console.log(deepComp({}, {}) === true?'тест пройден':'ТЕСТ 18 НЕ ПРОЙДЕН');
})();