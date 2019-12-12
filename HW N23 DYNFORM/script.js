'use strict'

/*N.23 Домашнее задание DYN_FORM
Создать проект DYN_FORM. Разработать функцию, которая в переданном ей теге <form> динамически строит элементы формы по переданному ей массиву. 
Вызвать эту функцию дважды с указанными ниже массивами, чтобы она построила на веб-странице две формы по указанным ниже образцам. Точном соответствия внешнего вида форм образцам добиваться не обязательно. 
В качестве скрипта, обрабатывающего данные форм (атрибут action тега form), можно указывать http://fe.it-academy.by/TestForm.php 
var formDef1=
[
{label:'Название сайта:',kind:'longtext',name:'sitename'},
{label:'URL сайта:',kind:'longtext',name:'siteurl'},
{label:'Посетителей в сутки:',kind:'number',name:'visitors'},
{label:'E-mail для связи:',kind:'shorttext',name:'email'},
{label:'Рубрика каталога:',kind:'combo',name:'division',
variants:[{text:'здоровье',value:1},{text:'домашний уют',value:2},{text:'бытовая техника',value:3}]},
{label:'Размещение:',kind:'radio',name:'payment',
variants:[{text:'бесплатное',value:1},{text:'платное',value:2},{text:'VIP',value:3}]},
{label:'Разрешить отзывы:',kind:'check',name:'votes'},
{label:'Описание сайта:',kind:'memo',name:'description'},
{label:'Опубликовать:',kind:'submit'},
];

var formDef2=
[
{label:'Фамилия:',kind:'longtext',name:'lastname'},
{label:'Имя:',kind:'longtext',name:'firstname'},
{label:'Отчество:',kind:'longtext',name:'secondname'},
{label:'Возраст:',kind:'number',name:'age'},
{label:'Зарегистрироваться:',kind:'submit'},
];
*/

function createForm(array) {
  var form = document.createElement('form');
  form.action = 'http://fe.it-academy.by/TestForm.php';
  form.method = 'post';
  form.name = 'form' + document.forms.length; //имя формы
  for(var i = 0; i < array.length; i++) {
    var p = document.createElement('p');
    form.appendChild(p);
    var kind = array[i].kind;
    var input;
    if(kind === 'longtext' || kind === 'shorttext') {
      input = document.createElement('input');
      input.type = 'text';
    }
    if(kind === 'number') {
      input = document.createElement('input');
      input.type = 'number';
      input.setAttribute('min', '0');
    };
    if(kind === 'check') {
      input = document.createElement('input');
      input.type = 'checkbox';
      input.checked = true;				
    };
    if(kind === 'submit'){
      input = document.createElement('input');
      input.type = 'submit';
      input.value = array[i].label.slice(0, array[i].label.length - 1);
      p.appendChild(input);
    };
    if(kind === 'memo'){
      input = document.createElement('textarea');
    };
    if(kind === 'longtext' || kind === 'shorttext' || kind === 'number' || kind === 'check' || kind === 'combo' || kind === 'memo' || kind === 'radio') {
      var label = document.createElement('label');
      var descr = document.createTextNode(array[i].label);
      p.appendChild(label);
      label.appendChild(descr);
      if(kind === 'combo'){
        input = document.createElement('select');
        var variants = array[i].variants;
        for(var j = 0; j < variants.length; j++) {
          var option = document.createElement('option');
          var text = document.createTextNode(variants[j].text);
          input.appendChild(option);
          option.appendChild(text);
          option.value = variants[j].value;
        };
      };
      if(kind === 'radio') {
        var variants = array[i].variants;
        for(var j = 0; j < variants.length; j++){
          var input = document.createElement('input');
          input.type = 'radio';
          input.value = variants[j].value;
          for(name in array[i]) {
            input.name = array[i].name;
          };
          var text = document.createTextNode(variants[j].text);
          p.appendChild(input);
          p.appendChild(text);
        };				
      };					
    };
    if(kind === 'longtext' || kind === 'shorttext' || kind === 'number' || kind === 'check' || kind === 'combo' || kind === 'memo') {
      label.setAttribute('for', array[i].name);
      for(name in array[i]) {
        input.name = array[i].name;
        input.id = array[i].name;
      };
      input.className = kind;
      p.appendChild(input);
    };			
  };
  var hr = document.createElement('hr');
  document.body.append(form);
  document.body.append(hr);
};

(function() {
  var formDef1 =
    [
      {label: 'Название сайта:', kind: 'longtext', name: 'sitename'},
      {label: 'URL сайта:', kind: 'longtext', name: 'siteurl'},
      {label: 'Посетителей в сутки:', kind: 'number', name: 'visitors'},
      {label: 'E-mail для связи:', kind: 'shorttext', name: 'email'},
      {label: 'Рубрика каталога:', kind: 'combo', name: 'division',
        variants:[{text: 'здоровье', value: 1},{text: 'домашний уют', value: 2},{text: 'бытовая техника', value: 3}]},
      {label: 'Размещение:', kind: 'radio', name: 'payment',
        variants:[{text: 'бесплатное', value: 1},{text: 'платное', value: 2},{text: 'VIP', value: 3}]},
      {label: 'Разрешить отзывы:', kind: 'check', name: 'votes'},
      {label: 'Описание сайта:', kind: 'memo', name: 'description'},
      {label: 'Опубликовать:', kind: 'submit'},
    ];
  var formDef2=
    [
      {label: 'Фамилия:', kind: 'longtext', name: 'lastname'},
      {label: 'Имя:', kind: 'longtext', name: 'firstname'},
      {label: 'Отчество:', kind: 'longtext', name: 'secondname'},
      {label: 'Возраст:', kind: 'number', name: 'age'},
      {label: 'Зарегистрироваться:', kind: 'submit'},
    ];
  createForm(formDef1);
  createForm(formDef2);
})();