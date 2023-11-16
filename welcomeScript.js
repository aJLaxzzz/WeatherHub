// welcomeScript.js

// Получаем элемент заголовка по его id
var welcomeText = document.getElementById("welcomeText");

// Массив с синонимами приветствия на разных языках
var greetings = ["Welcome", "Bienvenue", "Willkommen", "Bienvenido"];

// Текущий индекс в массиве greetings
var currentIndex = 0;

// Функция для поэтапного вывода и стирания нового слова
function displayAndErase(word) {
    var index = 0;
    var interval = setInterval(function () {
        welcomeText.textContent = word.substring(0, index);
        index++;
        if (index > word.length) {
            clearInterval(interval);
            // Ждем 5 секунд перед стиранием слова
            setTimeout(function () {
                eraseWord();
            }, 5000);
        }
    }, 100); // Интервал задержки между буквами (в миллисекундах)
}

// Функция для стирания слова
function eraseWord() {
    var index = welcomeText.textContent.length;
    var interval = setInterval(function () {
        welcomeText.textContent = welcomeText.textContent.substring(0, index);
        index--;
        if (index < 0) {
            clearInterval(interval);
            // Выбираем следующий синоним по порядку
            currentIndex = (currentIndex + 1) % greetings.length;
            setTimeout(function () {
                displayAndErase(greetings[currentIndex]);
            }, 1000);
        }
    }, 100); // Интервал задержки между стиранием букв (в миллисекундах)
}

// Запускаем процесс
displayAndErase(greetings[currentIndex]);
