const apiKey = '14ffbc8669a614bd9983ed43497d73b5'; 

function showWeather() {
    
    const selectElement = document.getElementById('cities');
    const selectedCity = selectElement.value;
    printCurrentWeather(selectedCity);
    createWeatherCards(selectedCity);
    printWeekWeather();
    document.getElementById('weather-container').style.display = 'block';

    
}


async function printCurrentWeather(currentCity) {
    const cityElement = document.getElementById('head-scroll').querySelector('.current-weather-city');
    const dayElement = document.getElementById('head-scroll').querySelector('.current-weather-day');
    const dateElement = document.getElementById('head-scroll').querySelector('.current-weather-date');
    const timeElement = document.getElementById('head-scroll').querySelector('.current-weather-time');
    const weatherConditionElement = document.getElementById('head-scroll').querySelector('.current-weather-header p');
    const temperatureElement = document.getElementById('head-scroll').querySelector('.current-weather-temperature');
    const windSpeedElement = document.getElementById('head-scroll').querySelector('.current-weather-detail:nth-child(1) span');
    const pressureElement = document.getElementById('head-scroll').querySelector('.current-weather-detail:nth-child(2) span');
    const humidityElement = document.getElementById('head-scroll').querySelector('.current-weather-detail:nth-child(3) span');
    const feelsLikeElement = document.getElementById('head-scroll').querySelector('.current-weather-detail:nth-child(4) span');
    const visibilityElement = document.getElementById('head-scroll').querySelector('.current-weather-detail:nth-child(5) span');
    
    cityElement.textContent = currentCity;
    try {
        const weatherData = await getCurrentWeather(currentCity);
    
        if (weatherData) {
            const timestamp = weatherData.dt * 1000;  
            const date = new Date(timestamp);

           
            const dayOfWeek = getDayOfWeek(date.getDay());
            const formattedDate = formatDate(date);
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const currentTimeString = `${hours}:${minutes}`;
            const weatherCondition = weatherData.weather[0].main;

            
            const imgElement = document.querySelector('.current-weather-card img');
            const newImgUrl = getWeatherIcon(weatherCondition);
            imgElement.src = newImgUrl;
            
            
            dayElement.textContent = dayOfWeek;
            dateElement.textContent = formattedDate;
            timeElement.textContent = currentTimeString;
            weatherConditionElement.textContent = getWeatherCondition(weatherCondition);
            temperatureElement.textContent = `${kelvinToCelsius(weatherData.main.temp)}°C`;
            windSpeedElement.textContent = `${weatherData.wind.speed} м/с`; 
            pressureElement.textContent = `${kelvinToCelsius(weatherData.main.pressure)} мм рт. ст.`; 
            humidityElement.textContent = `${weatherData.main.humidity}%`;
            feelsLikeElement.textContent = `${kelvinToCelsius(weatherData.main.feels_like)}°C`; 
            visibilityElement.textContent = `${weatherData.visibility} м`; 
            
        } else {
            //alert('Не удалось получить данные о погоде.');
        }
    } catch (error) {
        //alert('Произошла ошибка:', error);
    }
}

const weatherConditions = ['clear', 'clouds', 'rain', 'snow', 'thunderstorm', 'drizzle'];

function getRandomWeatherCondition() {
    const randomIndex = Math.floor(Math.random() * weatherConditions.length);
    return weatherConditions[randomIndex];
}

function getWeatherCondition(weatherCondition) {
    switch (weatherCondition.toLowerCase()) {
        case 'clear':
            return 'Ясно';
        case 'clouds':
            return 'Облачно';
        case 'rain':
            return 'Дождь';
        case 'snow':
            return 'Снег';
        case 'drizzle':
            return 'Мелкий дождь';
        case 'thunderstorm':
            return 'Гроза';
        default:
            return 'Ветер';
    }
}

function getWeatherIcon(weatherCondition) {
    switch (weatherCondition.toLowerCase()) {
        case 'clear':
            return 'images/weather-icons/clear.png';
        case 'clouds':
            return 'images/weather-icons/clouds.png';
        case 'rain':
            return 'images/weather-icons/rain.png';
        case 'snow':
            return 'images/weather-icons/snow.png';
        case 'drizzle':
            return 'images/weather-icons/cloud and moon.png';
        case 'thunderstorm':
            return 'images/weather-icons/thunderstorm.png';
        default:
            return 'images/weather-icons/wind.png';
    }
}

function printWeekWeather() {
    const daysOfWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    const months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];

    const weekCards = document.querySelectorAll('.week-weather-card');

    weekCards.forEach((card, index) => {
        const cardHeader = card.querySelector('.week-weather-card-header');
        const headDateElement = cardHeader.querySelector('.head-date');
        const headerHeaderElement = cardHeader.querySelector('.header-header');

        const currentDate = new Date(); 
        currentDate.setDate(currentDate.getDate() + index); 

        const dayOfWeekIndex = currentDate.getDay();
        const dayOfWeek = daysOfWeek[dayOfWeekIndex];
        const dayOfMonth = currentDate.getDate();
        const formattedDay = dayOfMonth.toString().padStart(2, '0');
        const month = months[currentDate.getMonth()];

        headDateElement.textContent = formattedDay;
        headerHeaderElement.textContent = ` ${month} ${dayOfWeek}`;
    });
}

async function getCurrentWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  
    try {
      const response = await fetch(apiUrl);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      //alert('Fetch error:', error);
      return null;
    }
}

function kelvinToCelsius(kelvin) {
    const celsius = kelvin - 273.15;
    return Math.round(celsius);
}

function hPaToMmHg(hPa) {
    const mmHg = hPa * 0.75006375541921;
    return mmHg.toFixed(2);
}

function getDayOfWeek(dayIndex) {
    const daysOfWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    return daysOfWeek[dayIndex];
}

function getDayName(dayOfWeek) {
    const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    return days[dayOfWeek];
}


function formatDate(date) {
    const options = {  month: 'long', day: 'numeric' };
    return date.toLocaleDateString('ru-RU', options);
}


function formatTime(date) {
    const options = { hour: 'numeric', minute: 'numeric', hour12: false };
    return date.toLocaleTimeString('ru-RU', options);
}


function addWeatherCard(date, morningTemperature, morningWeatherType, nightTemperature, nightWeatherType, iconSrc, weekIndex) {
    const weatherCard = document.createElement('div');
    weatherCard.classList.add('weather-card');

    const weatherCardHeader = document.createElement('div');
    weatherCardHeader.classList.add('weather-card-header');
    weatherCardHeader.textContent = date;
    weatherCard.appendChild(weatherCardHeader);

    const weatherInfo = document.createElement('div');
    weatherInfo.classList.add('weather-info');

    // Утро
    const morningDiv = document.createElement('div');
    morningDiv.classList.add('date-morning');
    morningDiv.textContent = 'Утром';
    weatherInfo.appendChild(morningDiv);

    const morningTemperatureDiv = document.createElement('div');
    morningTemperatureDiv.classList.add('temperature-morningg');
    morningTemperatureDiv.textContent = morningTemperature;
    weatherInfo.appendChild(morningTemperatureDiv);

    const morningWeatherTypeDiv = document.createElement('div');
    morningWeatherTypeDiv.classList.add('weather-type-morning');
    morningWeatherTypeDiv.textContent = morningWeatherType;
    weatherInfo.appendChild(morningWeatherTypeDiv);

    // Ночь
    const nightDiv = document.createElement('div');
    nightDiv.classList.add('date-night');
    nightDiv.textContent = 'Ночью';
    weatherInfo.appendChild(nightDiv);

    const nightTemperatureDiv = document.createElement('div');
    nightTemperatureDiv.classList.add('temperature-night');
    nightTemperatureDiv.textContent = nightTemperature;
    weatherInfo.appendChild(nightTemperatureDiv);

    const nightWeatherTypeDiv = document.createElement('div');
    nightWeatherTypeDiv.classList.add('weather-type-night');
    nightWeatherTypeDiv.textContent = nightWeatherType;
    weatherInfo.appendChild(nightWeatherTypeDiv);

    weatherCard.appendChild(weatherInfo);

    const img = document.createElement('img');
    img.src = iconSrc;
    img.alt = '';
    weatherCard.appendChild(img);

    document.querySelectorAll('.week')[weekIndex].appendChild(weatherCard);
}


async function createWeatherCards(currentCity) {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate()); 
    const daysInWeek = 7;
    const options2 = { weekday: 'long' };
    let dayCount = 0;

    for (let weekIndex = 0; weekIndex < 5; weekIndex++) {
        const weekDiv = document.querySelectorAll('.week')[weekIndex];
        const daysInCurrentWeek = (weekIndex === 0) ? daysInWeek - currentDate.getDay() + 1 : daysInWeek;

        for (let dayIndex = 0; dayIndex < daysInCurrentWeek; dayIndex++) {
            if (dayCount >= 30) {
                return;
            }

            const futureDate = new Date(currentDate);
            futureDate.setDate(currentDate.getDate() + dayCount);

            const dayString = futureDate.toLocaleDateString('ru-RU', options2);
            const dateString = `${futureDate.getDate()} ${futureDate.toLocaleDateString('ru-RU', { month: 'short' })}`;
            const dayTemperature = getRandomTemperatureString(-25, 25);
            const nightTemperature = getRandomTemperatureString(-25, 25);
            const weatherCondition = getRandomWeatherCondition();
            const weatherCondition2 = getRandomWeatherCondition();
            addWeatherCard(
                `${dayString}, ${dateString}`,
                dayTemperature, 
                getWeatherCondition(weatherCondition), 
                nightTemperature, 
                getWeatherCondition(weatherCondition2), 
                getWeatherIcon(weatherCondition),
                weekIndex
            );
            dayCount++;
        }
    }
}

function getRandomTemperatureString(min, max) {
    const randomTemperature = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomTemperature.toString()+"°C";
}










  
  
  