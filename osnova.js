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
if (++speed < 5) {
return;
}
speed = 0; // обнуление сокрости
zhyk.clearRect(0, 0, canvas.width, canvas.height); //очиста поля
animal.x += animal.dx;
animal.y += animal.dy;// движение с нужнолй скоростью
if (animal.x < 0) { // жук врезался == луз
alert("GAME OVER"+" ВАШ СЧЕТ: "+schet);
document.location.reload();
}
else if (animal.x >= canvas.width) {
alert("GAME OVER"+" ВАШ СЧЕТ: "+schet);

document.location.reload();
}
if (animal.y < 0) { // жук врезался == появился с другой стороны вертикаль
alert("GAME OVER"+" ВАШ СЧЕТ: "+schet);
document.location.reload();
}
else if (animal.y >= canvas.height) {
alert("GAME OVER"+" ВАШ СЧЕТ: "+schet);
document.location.reload();
}
// добавляем опр точку в начало
animal.cells.unshift({ x: animal.x, y: animal.y });
// Метод unshift() добавляет один или более элементов в начало массива и возвращает новую длину массива
if (animal.cells.length > animal.maxCells) {
animal.cells.pop();
}
// красное тиоп яблоко
zhyk.fillStyle = 'red';
zhyk.fillRect(apple.x, apple.y, kletka - 1, kletka - 1);
// 1 движение = 1 нарисованный квадрат (Метод fillRect рисует в заданной точке закрашенный прямоугольник. Первые два параметра задают координаты точки, в которой окажется верхний левый угол нарисованного прямоугольника.)
zhyk.fillStyle = 'black';
// обработка каждого элемента
animal.cells.forEach(function (cell, index) {
zhyk.fillRect(cell.x, cell.y, kletka, kletka);
// жук съел яблоко
if (cell.x === apple.x && cell.y === apple.y) {
apple.x = getRandomInt(0, 25) * kletka;
apple.y = getRandomInt(0, 25) * kletka;
schet++;
document.getElementById("schet").innerHTML = "Счет:" + schet;
speed--;
}
});
}
// бинд клавиш
document.addEventListener('keydown', function (e) {
// стрелка влево
if (e.which === 37 && animal.dx === 0) {
//даём ей движение по горизонтали, а вертикальное — останавливаем
// та же самая логика будет и в остальных кнопках
animal.dx = -kletka;
animal.dy = 0;
}
// стрелка вверх
else if (e.which === 38 && animal.dy === 0) {
animal.dy = -kletka;
animal.dx = 0;
}
// стрелка вправо
else if (e.which === 39 && animal.dx === 0) {
animal.dx = kletka;
animal.dy = 0;
}
// стрелка вниз
else if (e.which === 40 && animal.dy === 0) {
animal.dy = kletka;
animal.dx = 0;
}
});

// запускаем функцию игры
requestAnimationFrame(loop);