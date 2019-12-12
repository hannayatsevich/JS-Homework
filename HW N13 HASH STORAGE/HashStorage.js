'use strict'

/*1.Разработать класс HashStorage (в файле HashStorage.js) для хранения в хэше произвольных пар ключ-значение.
Ключ может быть любой строкой; значение может иметь любой тип, в том числе векторный (хэш, массив и т.д.)
Класс должен иметь следующий интерфейс (т.е. иметь следующие публичные методы):
addValue(key,value) — сохраняет указанное значение под указанным ключом;
getValue(key) — возвращает значение по указанному ключу либо undefined;
deleteValue(key) — удаляет значение с указанным ключом, возвращает true если значение было удалено и false если такого 
значения не было в хранилище;
getKeys() — возвращает массив, состоящий из одних ключей.
Класс должен быть чистым (не должен использовать никаких глобальных переменных, не, должен «пачкать экран»). 
Класс должен быть универсальным, т.е. не зависеть ни от структуры хранимых данных, ни от способа их последующего 
использования (в т.ч. не должен содержать никаких ссылок на DOM, т.к. может использоваться и вообще без веб-страницы).

2.Создать объект drinkStorage класса HashStorage для хранения рецептов напитков.
Ключом является название напитка; значением — информация о напитке (алкогольный напиток или нет, строка с рецептом 
приготовления и т.д. по желанию).

3.Разработать веб-страницу для работы с хранилищем рецептов напитков.
На странице должны быть кнопки:
«ввод информации о напитке» — последовательно спрашивает название напитка, алкогольный он или нет, рецепт его приготовления; 
сохраняет информацию о напитке в хранилище.
«получение информации о напитке» — спрашивает название напитка и выдаёт (на страницу, в консоль или в alert) либо информацию 
о нём (по примеру, приведённому ниже), либо сообщение об отсутствии такого напитка в хранилище.
«удаление информации о напитке» — спрашивает название напитка и удаляет его из хранилища (если он там есть) с выдачей 
соответствующего сообщения в информационное окно.
«перечень всех напитков» — выдаёт в информационное окно перечень всех напитков из хранилища (только названия).

Пример информации о напитке:

напиток Маргарита
алкогольный: да
рецепт приготовления:
продукт, продукт... смешать...
*/

//1 класс HashStorage
function HashStorage () {
	var self = this;
	self.units = {};
		
	self.addValue = function(key,value) {
		self.units[key] = value;
	};
	self.getValue = function(key) {
		return self.units[key];
	};
	self.deleteValue = function(key) {
		if(!(key in self.units)){
			return false;
		}
		else{delete self.units[key];
			return true;
		}
	};
	self.getKeys=function() {
		var arrayKeys=[];
		for(var i in self.units) {
			arrayKeys.push(i);
		}
		return arrayKeys;
	};
};
//2 объект drinkStorage класса HashStorage для хранения рецептов напитков
var drinkStorage = new HashStorage;
//3 функции для работы с хранилищем рецептов напитков через веб-страницу.
function input() {
	let drinkName;
	while (true) {
		drinkName = prompt('Введите название напитка');
		let existingDrink = drinkStorage.getKeys().find(v => v.toLowerCase() === drinkName.toLowerCase());
		if ( !existingDrink )
			break;
		alert ('Такой напиток уже есть в хранилище!');
	};
	if(drinkName !== null && drinkName !== '') {
		var drinkAlk = (confirm(drinkName + ' - алкогольный напиток?'))?'Да':'Нет';
		var drinkRec = prompt('Введите рецепт напитка');
		var drink = {'Алкоголь': drinkAlk,'Рецепт': drinkRec};
		drinkStorage.addValue(drinkName, drink);
	};		
};
function output() {
	var drinkName = prompt('Введите название напитка');
	var checkInKeys = drinkStorage.getKeys().find(v => v.toLowerCase() === drinkName.toLowerCase());
	if(checkInKeys) {	
		var description = drinkStorage.getValue(checkInKeys);	
		return document.drinksForm.textField.value = ('Название: ' + checkInKeys + '\n'+'Алкоголь: ' + description['Алкоголь'] + '\n'+'Рецепт: ' + '\n' + description['Рецепт']);
	}
	return document.drinksForm.textField.value = 'Такого напитка нет в хранилище.';
};
function deleteUnit() {
	var drinkName = prompt('Введите название напитка');
	var checkInKeys = drinkStorage.getKeys().find(v => v.toLowerCase() === drinkName.toLowerCase());
	if(checkInKeys) {
		drinkStorage.deleteValue(checkInKeys);
		return document.drinksForm.textField.value = 'Информация о напитке ' + checkInKeys + ' удалена.'
	}
	else {
		return document.drinksForm.textField.value = 'В хранилище нет информации о напитке '+drinkName+'.'
	}
};
function keys() {
	var unitsArray = drinkStorage.getKeys();
	var unitsString = '';
	if(unitsArray.length === 0) {
		return document.drinksForm.textField.value = 'В хранилище нет данных о напитках';
	}
	else{
		for(var i = 0; i < unitsArray.length; i++){
			unitsString += unitsArray[i] + '\n';
			
		}
	return document.drinksForm.textField.value = unitsString;
	}
}
//напитки уже в хранилище по умолчанию
drinkStorage.addValue('Кровавая Мэри Джейн',{'Алкоголь':'Да','Рецепт':'ИНГРЕДИЕНТЫ 50 мл водки 150 мл томатного сока 15 мл лимонного сока 1 капля табаско 2 капли вустерского соуса 1 черешок сельдерея + еще 1 для украшения вяленый помидор и лимон на гриле и тост из белого хлеба для украшения соль, свежемолотый черный перец ПОШАГОВЫЙ РЕЦЕПТ ПРИГОТОВЛЕНИЯ Сельдерей крупно нарежьте. Растолките в стакане для смешивания мадлером (пестиком). Добавьте остальные ингредиенты. Перелейте в высокий стакан (хайбол), украсьте стеблем сельдерея, тостом, вяленым помидором и лимоном на гриле.'});
drinkStorage.addValue('Дикая земля',{'Алкоголь':'Да','Рецепт':'ИНГРЕДИЕНТЫ перцовая водка – 40 мл мякоть грейпфрута – 40 г сироп из маракуйи – 15 мл мякоть лайма – 20 г грейпфрут – 1 ломтик свежемолотый черный перец – по вкусу ПОШАГОВЫЙ РЕЦЕПТ ПРИГОТОВЛЕНИЯ Размять грейпфрут и лайм в бокале, влить все ингредиенты, добавить дробленый лед. Перемешать, украсить ломтиком грейпфрута, посыпать перцем.'});
drinkStorage.addValue('Северное сияние',{'Алкоголь':'Да','Рецепт':'ИНГРЕДИЕНТЫ листочки розмарина – 5 г жидкий мед – 15 мл водка, настоянная на мандаринах – 40 мл шампанское сухое – 75 мл мандариновая цедра для подачи ПОШАГОВЫЙ РЕЦЕПТ ПРИГОТОВЛЕНИЯ Заранее охладить бокал мартини. Водку и мед налить в стакан для смешивания, добавить розмарин и лед, перемешать, процедить в охлажденный бокал. Аккуратно, по ложке, влить шампанское, чтобы оно не перемешалось с другими ингредиентами, сбрызнуть эфирным маслом из кусочка мандариновой цедры, украсить лентой из цедры и немедленно подать.'});
drinkStorage.addValue('Вечность',{'Алкоголь':'Да','Рецепт':'ИНГРЕДИЕНТЫ 600 мл светлого рома корочки 1 апельсина 2 апельсина 4 больших лимона 150 мл ликера Grand Marnier или Cointreau ПОШАГОВЫЙ РЕЦЕПТ ПРИГОТОВЛЕНИЯ Шаг 1 Заранее, за неделю, настоять светлый ром на апельсиновых корочках. Шаг 2 Перед подачей выжать сок из апельсинов и лимонов, смешать и процедить. Смешать ром с цитрусовым соком и Grand Marnier или Cointreau. Шаг 3 Разлить по бокалам, наполненным льдом, немного долить холодной содовой или минеральной газированной водой. Подавать без украшений.'});
drinkStorage.addValue('Ромовый кокос',{'Алкоголь':'Да','Рецепт':'ИНГРЕДИЕНТЫ 1 кокос 2 банки (по 400 г) кокосового молока 1 банка концентрированного молока без сахара 2–3 палочки корицы 1 бутылка светлого рома ПОШАГОВЫЙ РЕЦЕПТ ПРИГОТОВЛЕНИЯ Шаг 1 Проделать в кокосе дырочку, слить жидкость, кокос запечь при 170°С, 15 мин., очистить, натереть мякоть на мелкой терке, смешать со светлым ромом. Шаг 2 Взбить блендером кокосовое молоко с концентрированным молоком. Добавить ромово-кокосовую смесь, взбить до однородности. Шаг 3 Влить в кувшин, положить палочки корицы, закрыть, настаивать в холодильнике 12–48 ч. Подавать со льдом.'});