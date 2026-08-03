const dateText = document.getElementById('date')// Забираем спанчик
const day = (3600 * 24) * 1000 // День в миллисекундах
const date = new Date();// Создаем объект даты
const nextDay = new Date(date.getTime() + day); // Прибавляем день для проверки
let nextMonth = nextDay.getMonth() + 1 > 11 ? 0 : nextDay.getMonth() + 1;// Проверяем если следующий месяц боле списка то начинаем с января иначе след месяц
const monthArray = "январь,февраль,март,апрель,май,июнь,июль,август,сентябрь,октябрь,ноябрь,декабрь".split(",");
dateText.textContent = monthArray[nextDay.getMonth()] + " " + "and " + monthArray[nextMonth];