//СКОЛЬКО СЕКУНД В ЖИЗНИ
//здесь получили сколько в часе секунд
let secondInAMinute = 60;
let minuteInAHours = 60;
let secondInAHours = secondInAMinute * minuteInAHours;
//здесь получили сколько в сутках секунд
let hoursInADay = 24;
let secondsInADay = secondInAHours * hoursInADay
//здесь получили сколько в году секунд
let daysInAYear = 365;
let secondsInAYear = secondsInADay * daysInAYear
//здесь получили сколько в жизни секунд
let age = 29
let secondsInAge = secondsInAYear * age
console.log(secondsInAge)


// инкремент / декремент
let highFives = 0
console.log(++highFives) // а если декремент то уменьшаем на 1

let highFivesTwo = 0 // если ставить после, то сначала вернет исходное значение и потом будет прибавлять
console.log(highFivesTwo++) // обнуляем значение
console.log(highFivesTwo++) // прибавляем 1 чтоб в 3ем был уже результат 2, можем в 3 добавить ++ и в 4 будет 3
console.log(highFivesTwo) // прибавляется еще 1




