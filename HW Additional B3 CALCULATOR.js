"use strict"

/*B3+
Написать функцию-калькулятор вручную введённого выражения (без использования функции eval и динамического описания функции new Function, если вы знаете о них).
Должны работать операции + - * / и скобки, числа должны приниматься целые, дробные (через точку), отрицательные
Например, вызываем функцию, передавая ей строку "2*(-3+1)", функция возвращает -4.
*/

var expression = '2*(3+1)*(1/1)';//8
var expression2 = '4-5*(3-4*7)';//129
var expression3 = '4-5*(-2-4*7)';//154
var expression4 = '4-5*(5-2-4*7)';//129
var expression5 = '2*(-3.5+1.5)';//-4
var expression6 = '2 * (3+ 1)*( 1/1 )';//8
var expression7 = '2*(-3+1)';//-4

function exprCalc(expr) {
  var clear = expr.match(/([-+*()/])|(\d+(\.\d+)?)/g);
  var priority = {'*':2,'/':2,'+':1,'-':1,'(':0,')':0};
//Замена минуса на бинарную операцию с 0
  for(var h = 0; h < clear.length; h++) {
    if ((clear[h] === '-') && (clear[h-1] in priority)) {
      clear.splice(h, 0,'0')
    }
    if ((clear[h] === '-') && (clear[h-1] === undefined)) {
      clear.splice(0, 0, '0')
    }
  }
//Преобразование в постфиксную запись
  var opStack = [];
  var postfixSeq = [];
  for(var i = 0; i < clear.length; i++){
    if (clear[i] in priority ){
      if (clear[i] == '('){
        opStack.push(clear[i]);
      }
      else if (clear[i] == ')'){
          var lastOp = opStack.pop();
          while (lastOp !== '('){
            postfixSeq.push(lastOp);
            lastOp = opStack.pop()
          }
        }
        else {
          while((opStack.length > 0) && (priority[opStack[opStack.length - 1]] >= priority[clear[i]])){
          postfixSeq.push(opStack.pop());
          }
          opStack.push(clear[i]);
        }
    }
    else postfixSeq.push(clear[i]);
  }
  while (opStack.length > 0){
    postfixSeq.push(opStack.pop());
  }

//Расчет операции
  function operation(x, y, op){
    if (op === '+') {
      return x + y;
    }
    if (op === '-'){
      return x - y;
      }
    if (op === '*'){
      return x * y;
    }
    if (op === '/'){
      if (y === 0){
        return 0;
      }
      return x/y;
    }
    else{
      return 0;
    }
  }
//Итоговый расчет выражения
  for(var j = 0; j < postfixSeq.length; j++){
    if(postfixSeq[j] in priority ){
      var y = opStack.pop();
      var x = opStack.pop();
      opStack.push(operation(x, y, postfixSeq[j]));
    }
    else opStack.push(parseFloat(postfixSeq[j]));
  }
  return opStack[0];			
}

console.log(expression + ' = ' + exprCalc(expression));
console.log(expression2 + ' = ' + exprCalc(expression2));
console.log(expression3 + ' = ' + exprCalc(expression3));
console.log(expression4 + ' = ' + exprCalc(expression4));
console.log(expression5 + ' = ' + exprCalc(expression5));
console.log(expression6 + ' = ' + exprCalc(expression6));
console.log(expression7 + ' = ' + exprCalc(expression7));