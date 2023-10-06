import Card from "./card.js";
const cells = 12; //количество карточек

// Этап 1. Создайте функцию, генерирующую массив парных чисел. Пример массива, который должна возвратить функция: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8].count - количество пар.

const numbersArray = [];

function createNumbersArray(count) {
  for (let i = 1; i <= count / 2; i++) {
    numbersArray.push(i);
    numbersArray.push(i);
  }
  //  console.log(numbersArray);
}

createNumbersArray(cells);

const shuffleArray = shuffle(numbersArray);

// Этап 2. Создайте функцию перемешивания массива.Функция принимает в аргументе исходный массив и возвращает перемешанный массив. arr - массив чисел

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i

    [arr[i], arr[j]] = [arr[j], arr[i]];  // поменять элементы местами
  }
  return arr;
}

// Этап 3. Используйте две созданные функции для создания массива перемешанными номерами. На основе этого массива вы можете создать DOM-элементы карточек. У каждой карточки будет свой номер из массива произвольных чисел. Вы также можете создать для этого специальную функцию. count - количество пар.

const container = document.getElementById("game");
let cardsArray = [];
let firstCard = null;
let secondCard = null;

// логика игры
function startGame(container, count) {
  for (let i = 0; i < shuffleArray.length; i++) {
    cardsArray.push(new Card(container, shuffleArray[i], flip));
    // console.log(Card);
  }

  function flip(card) {
    if (firstCard !== null && secondCard !== null) {
      if (firstCard.number !== secondCard.number) {
        firstCard.open = false;
        secondCard.open = false;
        firstCard.success = false;
        secondCard.success = false;
        firstCard = null;
        secondCard = null;
      }
    }

    if (firstCard == null) {
      firstCard = card;
    } else {
      if (secondCard == null) {
        secondCard = card;
      }
    }

    if (firstCard !== null && secondCard !== null) {
      if (firstCard.number == secondCard.number) {
        firstCard.success = true;
        secondCard.success = true;
        firstCard = null;
        secondCard = null;
        if (
          document.querySelectorAll(".card.success").length ==
          numbersArray.length
        ) {
          alert("Вы победили!!!");
          location.reload();  // презагрузка страницы
        }
      }
    }
  }
}

startGame(container, createNumbersArray.length);
