"use strict"

/*
Доработать проект MOOD (слайды N.10) так, чтобы цвета не повторялись. 
Для контроля повторения цветов использовать хэш.
function randomDiap(n,m) {
        return Math.floor(Math.random()*(m-n+1))+n;
}
function mood(colorsCount) {
    var colors=[ '', 'красный', 'оранжевый', 'жёлтый', 'зелёный', 'голубой', 'синий', 'фиолетовый' ];
    console.log( 'цветов: ' + colorsCount );
    for ( var i=1; i<=colorsCount; i++ ) {
        var n=randomDiap(1,7);
        var colorName=colors[n];
        console.log( colorName );
    }
}
mood(3);
*/

function randomDiap(n, m) {
  return Math.floor(Math.random() * (m - n + 1)) + n;
};
function mood(colorsCount) {
  var colors = [ '', 'красный', 'оранжевый', 'жёлтый', 'зелёный', 'голубой', 'синий', 'фиолетовый' ];
  console.log( 'цветов: ' + colorsCount );
  var check = {};
  var colorNum = 1;
  while(colorNum <= colorsCount) {
    var n = randomDiap(1, 7);
    var colorName = colors[n];
    if (!(colorName in check)) {
      check[colorName] = true;
      console.log(colorName);
      colorNum++;
    };
  };
};
mood(3);