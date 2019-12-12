'use strict'

/*С2+
Напишите функцию deepCopy для глубокого копирования переданного ей значения.
Функция должна получать число, строку, хэш или массив и возвращать его копию, включая все подхэши, подмассивы и т.д.
Напишите тесты правильной работы функции.
*/

function deepCopy(x) {
  var xCopy;
  switch(true) {
    case (typeof(x) === 'string') || (typeof(x) === 'number') || (typeof(x) === 'undefined'):
      xCopy = x;
      break;
    case (x === null):
      xCopy = null;
      break;
    case (Array.isArray(x)):
      xCopy = [];
      for(var i = 0; i < x.length; i++) {
        xCopy[i] = deepCopy(x[i]);
      };
      break;
    case (typeof(x) === 'object'):
      xCopy = {};
      for(var key in x) {
        xCopy[key] = deepCopy(x[key]);
      };
      break;
  };
  return xCopy;
};

function test1() {
  var h1 = { a: 5, b: {b1:6,b2:7}, c: [33, 22], d: null, e: undefined, f: Number.NaN};
  var h2 = deepCopy(h1);
  console.log(h2);
  console.assert(h1 !== h2,'false');//false
  console.assert(h1.a === h2.a);
  console.assert(h1.b !== h2.b,'false');//false
  console.assert(h1.b.b1 === h2.b.b1);
  console.assert(h1.c !== h2.c,'false');//false
  console.assert(h1.c[0] === h2.c[0]);
  console.assert(h1.d === h2.d);
  console.assert(h1.e === h2.e);
  console.assert(isNaN(h2.f));
  console.assert(h2.c instanceof Array);
};
function test2() {
  var a1=[ 5, {b1: 6, b2: 7}, [33, 22], null, undefined, Number.NaN];
  var a2 = deepCopy(a1);
  console.log(a2);
  console.assert(a1 !== a2,'false');//false
  console.assert(typeof(a2) === typeof(a1));
  console.assert(a1[1] !== a2[1],'false');//false
  console.assert(a1[1].b1 === a2[1].b1);
  console.assert(a1[2] !== a2[2],'false');//false
  console.assert(a1[2][0] === a2[2][0]);
  console.assert(a1[3] === a2[3]);
  console.assert(a1[4] === a2[4]);
  console.assert(isNaN(a2[5]));
  console.assert(a2[2] instanceof Array);
};
function test3() {
  var v1 = "sss";
  var v2 = deepCopy(v1);
  console.log(v2);
  console.assert(typeof(v2) === typeof(v1));
  console.assert(v1 === v2);
};
function test4() {
  var z1 = null;
  var z2 = deepCopy(z1);
  console.log(z2);
  console.assert(typeof(z2) === typeof(z1));
  console.assert(z1 === z2);
};
function test5() {
  var n1 = Number.NaN;
  var n2 = deepCopy(n1);
  console.log(n2);
  console.assert(typeof(n2) === typeof(n1));
  console.assert(isNaN(n2));
};
test1();
test2();
test3();
test4();
test5();