// script.js

function showWeather() {
    var selectedCity = document.getElementById("cities").value;
    var weatherContainer = document.getElementById("weatherContainer");
    var selectedCityElement = document.getElementById("selectedCity");
    var weatherCardsContainer = document.getElementById("weatherCards");

    // Здесь вы можете использовать AJAX для получения данных о погоде для выбранного города
    // В примере я просто создам несколько карточек для демонстрации

    // Очистка предыдущих карточек
    weatherCardsContainer.innerHTML = "";

    // Создание нескольких демонстрационных карточек
    for (var i = 0; i < 7; i++) {
        var card = document.createElement("div");
        card.className = "weather-card";
        
        var temperature = document.createElement("p");
        temperature.textContent = "Температура: 25°C";

        var weatherIcon = document.createElement("img");
        weatherIcon.src = "images/weather-icons/cloud and moon.png";
        weatherIcon.alt = "Weather Icon";

        var details = document.createElement("div");
        details.className = "weather-details";
        details.innerHTML = "<p>Дополнительная информация о погоде...</p>";

        // Добавление элементов карточки
        card.appendChild(temperature);
        card.appendChild(weatherIcon);
        card.appendChild(details);

        // Добавление карточки к контейнеру
        weatherCardsContainer.appendChild(card);
    }

    // Обновление заголовка с выбранным городом
    selectedCityElement.textContent = "Город: " + selectedCity;

    // Показ контейнера с погодой после нажатия кнопки
    weatherContainer.style.display = "block";
}
