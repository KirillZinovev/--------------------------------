let canvas = document.getElementById('game'); //игровое поле
let zhyk = canvas.getContext('2d'); // жук - клетка
let kletka = 32; // 1 клетака на поле = 32 пх
let speed = 0; // скорость жука
let schet = 0;
let animal = { //жук
  x: 160,
  y: 160, // начальные координаты
  dx: kletka,
  dy: 0, //скорость жука
  cells: [0,1], // тащю 2ую клетку за 1ой
  maxCells: 2 //lдлина жука 2 клетки
}


let apple = { // типо яблоко
  x: 320, // начальные координвты
  y: 320
};
function getRandomInt(min, max) { //генератор случ чисел в диапазоне игрового поля
  return Math.floor(Math.random() * (max - min)) + min;
}
function loop() { // игровой процесс
  requestAnimationFrame(loop); // замедляет игру в 10 раз
  if (++speed < 10) {
    return;
  }
  speed = 0; // обнуление сокрости
  zhyk.clearRect(0, 0, canvas.width, canvas.height); //очиста поля
  animal.x += animal.dx;
  animal.y += animal.dy;// движение с нужнолй скоростью
  if (animal.x < 0) { // жук врезался == появился с другой стороны горизонталь
    animal.x = canvas.width - kletka;
  }
  else if (animal.x >= canvas.width) {
    animal.x = 0;
  }
  if (animal.y < 0) { // жук врезался == появился с другой стороны вертикаль
    animal.y = canvas.height - kletka;
  }
  else if (animal.y >= canvas.height) {
    animal.y = 0;
  }
  // Продолжаем двигаться в выбранном направлении. Голова всегда впереди, поэтому добавляем её координаты в начало массива, который отвечает за всю змейку
  animal.cells.unshift({ x: animal.x, y: animal.y });
  // Сразу после этого удаляем последний элемент из массива змейки, потому что она движется и постоянно освобождает клетки после себя
  if (animal.cells.length > animal.maxCells) {
    animal.cells.pop();
  }
  // Рисуем еду — красное яблоко
  zhyk.fillStyle = 'red';
  zhyk.fillRect(apple.x, apple.y, kletka - 1, kletka - 1);
  // Одно движение змейки — один новый нарисованный квадратик 
  zhyk.fillStyle = 'green';
  // Обрабатываем каждый элемент змейки
  animal.cells.forEach(function (cell, index) {
    // Чтобы создать эффект клеточек, делаем зелёные квадратики меньше на один пиксель, чтобы вокруг них образовалась чёрная граница
    zhyk.fillRect(cell.x, cell.y, kletka, kletka);
    // Если змейка добралась до яблока...
    if (cell.x === apple.x && cell.y === apple.y) {
      apple.x = getRandomInt(0, 25) * kletka;
      apple.y = getRandomInt(0, 25) * kletka;
      schet++;
      document.getElementById("schet").innerHTML = "Счет:" + schet;
    }
  });
}
// Смотрим, какие нажимаются клавиши, и реагируем на них нужным образом
document.addEventListener('keydown', function (e) {
  // Дополнительно проверяем такой момент: если змейка движется, например, влево, то ещё одно нажатие влево или вправо ничего не поменяет — змейка продолжит двигаться в ту же сторону, что и раньше. Это сделано для того, чтобы не разворачивать весь массив со змейкой на лету и не усложнять код игры.
  // Стрелка влево
  // Если нажата стрелка влево, и при этом змейка никуда не движется по горизонтали…
  if (e.which === 37 && animal.dx === 0) {
    // то даём ей движение по горизонтали, влево, а вертикальное — останавливаем
    // Та же самая логика будет и в остальных кнопках
    animal.dx = -kletka;
    animal.dy = 0;
  }
  // Стрелка вверх
  else if (e.which === 38 && animal.dy === 0) {
    animal.dy = -kletka;
    animal.dx = 0;
  }
  // Стрелка вправо
  else if (e.which === 39 && animal.dx === 0) {
    animal.dx = kletka;
    animal.dy = 0;
  }
  // Стрелка вниз
  else if (e.which === 40 && animal.dy === 0) {
    animal.dy = kletka;
    animal.dx = 0;
  }
});

// Запускаем игру
requestAnimationFrame(loop);
