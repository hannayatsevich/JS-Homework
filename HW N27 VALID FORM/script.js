'use strict'
/*Сверстать проект VALID_FORM по образцу. 
Сделать валидацию вводимых значений; правила валидации продумать самостоятельно, описать их в комментариях; как минимум, пустое (начальное) значение каждого из полей должно считаться ошибочным. 
При уходе с текстового поля формы или изменении чекбокса, радиогруппы, выпадающего списка — валидировать только данное поле и в случае ошибки сообщение об ошибке сразу отобразить рядом с полем (сообщения об ошибках возле остальных полей не должны стираться); позволять пользователю уйти с поля, даже если оно заполнено с ошибкой. 
При попытке отправки формы — валидировать сразу все поля и отобразить сразу все сообщения об ошибках рядом с ошибочно заполненными полями; скроллировать страницу к первому ошибочно заполненному полю, фокусировать это поле. 
В качестве скрипта, обрабатывающего данные формы (атрибут action тега form), можно установить http://fe.it-academy.by/TestForm.php
*/
/*
Ограничения ввода:
Разработчики: не пустое, менее 30 символов;
Название сайта: не пустое, от 10 до 50 символов
URL сайта: не пустое, в формате http://www.google.com
Дата запуска сайта: не пустое, в формате DD/MM/YYYY, не ранее 2000 года
Посетителей в сутки: не пустое, число, не менее 500
E-mail для связи: не пустое, в формате example@example.com
Рубрика каталога: не пустое, не "домашний уют"
Размещение: не пустое, бесплатное в данный момент не доступно
Разрешить отзывы: разрешить размещение отзывов обязательно 
Описание сайта: не пустое, не менее 100 символов
*/

var formTag = document.forms.form0;
formTag.addEventListener('click', validateForm, false);
formTag.addEventListener('submit', validateForm, false);

function validateForm(EO) {
  EO = EO || window.event;
      
  var formTag = document.forms.form0;
  
  var developersField = formTag.elements.developers;//name атрибут
  var developersErr = document.getElementById('developersErr');
  developersField.addEventListener('blur', x, false);
  
  function x(EO) {
    EO = EO || window.event;
    EO.preventDefault();
    var developersValue = developersField.value;
    switch(true){
      case developersValue === '' : developersErr.innerHTML = '*Заполните наименование разработчика'; break;
      case developersValue.length > 30 : developersErr.innerHTML = '*Введите краткое наименование разработчика (до 30 символов)'; break;
      default: developersErr.innerHTML = '';
    };
    return;
  };

  var sitenameField = formTag.elements.sitename;
  var sitenameErr = document.getElementById('sitenameErr');
  sitenameField.addEventListener('blur', y, false);

  function y(EO) {
    EO = EO || window.event;
    EO.preventDefault();
    var sitenameValue = sitenameField.value;
    switch(true) {
      case sitenameValue === '' : sitenameErr.innerHTML = '*Заполните название сайта'; break;
      case sitenameValue.length < 10 : sitenameErr.innerHTML = '*Минимальная длина названия - 10 символов'; break;
      case sitenameValue.length > 50 : sitenameErr.innerHTML = '*Максимальная длина названия - 50 символов, сократите'; break;
      default:sitenameErr.innerHTML = '';
    };
    return;
  };

  var siteurlField = formTag.elements.siteurl;
  var siteurlErr = document.getElementById('siteurlErr');
  siteurlField.addEventListener('blur', a, false);

  function a(EO) {
    EO = EO || window.event;
    EO.preventDefault();
    var siteurlValue = siteurlField.value;
    var siteurlCheck = /^(http|https):\/\/[^ "]+$/;
    switch(true) {
      case siteurlValue === '' : siteurlErr.innerHTML = '*Введите URL сайта'; break;
      case siteurlCheck.test(siteurlValue) === false : siteurlErr.innerHTML = '*Введите URL сайта в формате http://www.google.com'; break;
      default:siteurlErr.innerHTML = '';
    };
    return;
  };

  var launchdateField = formTag.elements.launchdate;
  var launchdateErr = document.getElementById('launchdateErr');
  launchdateField.addEventListener('blur', b, false);
  
  function b(EO) {
    EO = EO || window.event;
    EO.preventDefault();
    var launchdateValue = launchdateField.value;
    var dateFormat = new Date(launchdateValue);
    var launchdateCheck = /^[0-9]{2}[\/]{1}[0-9]{2}[\/]{1}[0-9]{4}$/;
    switch(true) {
      case launchdateValue === '' : launchdateErr.innerHTML = '*Заполните поле даты запуска сайта'; break;
      case launchdateCheck.test(launchdateValue) === false : launchdateErr.innerHTML = '*Введите дату запуска сайта в формате DD/MM/YYYY'; break;
      case dateFormat.getFullYear() < 2000 : launchdateErr.innerHTML = '*В каталоге размещаются сайты, созданные не ранее 2000 года'; break;
      default:launchdateErr.innerHTML = '';
    };
    return;
  };

  var visitorsField = formTag.elements.visitors;
  var visitorsErr = document.getElementById('visitorsErr');
  visitorsField.addEventListener('blur', d, false);

  function d(EO) {
    EO = EO || window.event;
    EO.preventDefault();
    var visitorsValue = Number(visitorsField.value.trim());
    switch(true) {
      case visitorsValue === 0 : visitorsErr.innerHTML = '*Количество посетителей в сутки должно быть больше 0'; break;
      case visitorsValue < 500 : visitorsErr.innerHTML = '*Для внесения сайта в каталог требуется более 500 посетителей в сутки'; break;
      case isNaN(visitorsValue) : visitorsErr.innerHTML = '*Введите число'; break;
      default: visitorsErr.innerHTML = '';
    };
    return;
  };

  var emailField = formTag.elements.email;
  var emailErr = document.getElementById('emailErr');
  emailField.addEventListener('blur', p, false);

  function p(EO) {
    EO = EO || window.event;
    EO.preventDefault();
    var emailValue = emailField.value;
    var emailCheck = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    switch(true) {
      case emailValue === '' : emailErr.innerHTML = '*Введите адрес электронной почты'; break;
      case emailCheck.test(emailValue) === false:emailErr.innerHTML = '*Введите адрес электронной почты в формате example@example.com'; break;
      default:emailErr.innerHTML = '';
    };
    return;
  };

  var divisionField = formTag.elements.division;
  var divisionErr = document.getElementById('divisionErr');
  divisionField.addEventListener('change', k, false);

  function k (EO){
    EO = EO || window.event;
    EO.preventDefault();
    var divisionValue = divisionField.value;
    switch(true) {
      case divisionValue == '' : divisionErr.innerHTML = '*Выберите рубрику каталога'; break;
      case divisionValue == 2 : divisionErr.innerHTML = '*Рубрика "Домашний уют"" переполнена'; break;
      default:divisionErr.innerHTML = '';
    };
    return;
  };
  
  var paymentField = formTag.elements.payment;
  var paymentErr = document.getElementById('paymentErr');
  for (var i = 0; i < paymentField.length; i++){
    paymentField[i].addEventListener('change', s, false);
  };
  //для IE
  function radioValue(radioField) {
    if(radioField.value === undefined){
      for(var i = 0; i < radioField.length; i++) {
        if(radioField[i].checked == true) {
          radioValue = radioField[i].value;
        };
      };
    }
    else{radioValue = radioField.value};
    return radioValue;
  };
  
  function s(EO) {
    EO = EO || window.event;
    EO.preventDefault();
    var paymentValue = paymentField.value;
    switch(true) {
      case paymentValue == '' : paymentErr.innerHTML = '*Выберите способ размещения'; break;
      case paymentValue == 1 : paymentErr.innerHTML = '*Бесплатное размещение на данный момент не доступно'; break;
      default: paymentErr.innerHTML = '';
    };			
    return;
  };

  var votesField = formTag.elements.votes;
  var votesErr = document.getElementById('votesErr');
  votesField.addEventListener('change', n, false);

  function n(EO) {
    EO = EO || window.event;
    EO.preventDefault();
    var votesValue = votesField.checked;
    if(!votesValue) {
    votesErr.innerHTML = '*Необходимо согласие на размещение отзывов';
    }
    else{votesErr.innerHTML = ''};
    return;
  };
  
  var descriptionField = formTag.elements.description;
  var descriptionErr = document.getElementById('descriptionErr');
  descriptionField.addEventListener('blur', m, false);
      
  function m(EO) {
    EO = EO || window.event;
    EO.preventDefault();
    var descriptionValue = descriptionField.value;
    switch(true) {
      case descriptionValue === '' : descriptionErr.innerHTML = '*Введите описание сайта'; break;
      case descriptionValue.length < 100 : descriptionErr.innerHTML = '*Введите подробное описание сайта - не менее 100 символов'; break;;
      default:descriptionErr.innerHTML = '';
    };
    return;
  };
  
  if(EO.type === 'submit'){
    var errorsArray = [developersErr,sitenameErr,siteurlErr,launchdateErr,visitorsErr,emailErr,divisionErr,paymentErr,votesErr,descriptionErr];
    var fieldsArray = [developersField,sitenameField,siteurlField,launchdateField,visitorsField,emailField,divisionField,paymentField,votesField,descriptionField];
    
    for(var i = 0; i < fieldsArray.length; i++) {
      if(fieldsArray[i] === divisionField) {
        switch(true) {
          case divisionField.value == '' : errorsArray[i].innerHTML = '*Выберите рубрику каталога'; break;
          case divisionField.value == 2 : errorsArray[i].innerHTML = '*Рубрика "Домашний уют"" переполнена'; break;
          default: divisionErr.innerHTML = '';
        };
      }
      else if(fieldsArray[i] === paymentField) {
        switch(true) {
          case paymentField.value == '' : errorsArray[i].innerHTML = '*Выберите способ размещения'; break;
          case paymentField.value == 1 : errorsArray[i].innerHTML = '*Бесплатное размещение на данный момент не доступно'; break;
          default: paymentErr.innerHTML = '';
        };
      }
      else if(fieldsArray[i] === votesField) {
        switch(true) {
          case votesField.checked === false : errorsArray[i].innerHTML = '*Необходимо согласие на размещение отзывов'; break;
          default : votesErr.innerHTML = '';
        }
      }
      else{fieldsArray[i].focus();
        fieldsArray[i].blur();
      };
    };
    for(var i = 0; i < errorsArray.length; i++) {
      if(errorsArray[i].innerHTML !== '') {
        EO.preventDefault();
        if(errorsArray[i] === paymentErr) {
          document.getElementById('payment1').scrollIntoView();
        }
        else {fieldsArray[i].focus()};
        break;
      };
    };
  };				
};