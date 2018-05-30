/*

  Задание 1.

  Написать функцию которая будет задавать СЛУЧАЙНЫЙ цвет для фона.
  Каждая перезагрузка страницы будет с новым цветом.
  Для написания используйте функцию на получение случайного целого числа,
  между минимальным и максимальным значением (Приложена снизу задания)

  + Бонус, повесить обработчик на кнопку через метод onClick
  + Бонус, использовать 6-ричную систему исчесления и цвет HEX -> #FFCC00
  + Бонус выводить полученый цвет по центру страницы.
  Необходимо создать блок через createElement задать ему стили через element.style
  и вывести через appendChild или insertBefore

  Необходимые материалы:
    Math.Random (Доки): https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    function getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    __
    Работа с цветом:
    Вариант 1.
      Исользовать element.style.background = 'rgb(r,g,b)';
      где r,g,b случайное число от 0 до 256;

    Вариант 2.
      Исользовать element.style.background = '#RRGGBB';
      где, RR, GG, BB, значние цвета в 16-ричной системе исчесления
      Формирование цвета в вебе: https://ru.wikipedia.org/wiki/%D0%A6%D0%B2%D0%B5%D1%82%D0%B0_HTML
      Перевод в 16-ричную систему исчесления делается при помощи
      метода Number.toString( 16 ) https://www.w3schools.com/jsref/jsref_tostring_number.asp,

      var myNumber = '251'
      myNumber.toString(16) // fb

*/
// function getRandom(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// };
var body = document.getElementsByTagName('body');
var div = document.getElementsByClassName('currentColor');

function getRandomColor() {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++ ) {
    color += letters[Math.round(Math.random() * 15)];
  }
  return color;
};

function rand() {
  var c = getRandomColor();
  div[0].innerText = c;
  body[0].style.backgroundColor = c;
  body[0].style.margin = 0;
  body[0].style.padding = 0;
  body[0].style.height = "-webkit-fill-available";
  body[0].style.display = "flex";
  body[0].style.justifyContent = "center";
  body[0].style.alignItems = "center";
  body[0].style.flexDirection = "column";
  body[0].style.fontSize = "30px";
  div[0].style.display = "flex";
  div[0].style.flexDirection = "column";
  div[0].style.alignItems = "center";
  div[0].style.color = getRandomColor();
  var createButton = document.createElement('button');
  createButton.setAttribute('onclick','rand()');
  createButton.innerText = 'randomise me'
  div[0].appendChild(createButton);
  createButton.style.borderRadius = "100px";
  createButton.style.border = "0px";
  createButton.style.height = "100px";
  createButton.style.fontSize = "30px";
  createButton.style.backgroundColor = getRandomColor();
  createButton.style.color = getRandomColor();
};
window.onload = rand;