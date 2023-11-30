const apiKey = '14ffbc8669a614bd9983ed43497d73b5'; 

function showWeather() {
    
    const selectElement = document.getElementById('cities');
    const selectedCity = selectElement.value;
    printCurrentWeather(selectedCity);
    createWeatherCards(selectedCity);
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

            const timestamp = weatherData.dt * 1000; // Умножаем на 1000, потому что timestamp в секундах, а не в миллисекундах
            const date = new Date(timestamp);

            // Получаем день недели, дату и время
            const dayOfWeek = getDayOfWeek(date.getDay());
            const formattedDate = formatDate(date);
            const formattedTime = formatTime(date);
            const weatherCondition = weatherData.weather[0].id;
            
            // Используем полученные значения
            dayElement.textContent = dayOfWeek;
            dateElement.textContent = formattedDate;
            timeElement.textContent = formattedTime;
            /*weatherConditionElement.textContent = icons[weatherCondition];*/
            temperatureElement.textContent = `${kelvinToCelsius(weatherData.main.temp)}°C`;
            windSpeedElement.textContent = `${weatherData.wind.speed} м/с`; // Замените на соответствующий ключ в объекте weatherData
            pressureElement.textContent = `${kelvinToCelsius(weatherData.main.pressure)} мм рт. ст.`; // Замените на соответствующий ключ в объекте weatherData
            humidityElement.textContent = `${weatherData.main.humidity}%`; // Замените на соответствующий ключ в объекте weatherData
            feelsLikeElement.textContent = `${kelvinToCelsius(weatherData.main.feels_like)}°C`; // Замените на соответствующий ключ в объекте weatherData
            visibilityElement.textContent = `${weatherData.visibility} м`; // Замените на соответствующий ключ в объекте weatherData
            
        } else {
            alert('Не удалось получить данные о погоде.');
        }
    } catch (error) {
        alert('Произошла ошибка:', error);
    }

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
      console.error('Fetch error:', error);
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
    morningDiv.textContent = 'Morning';
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
    nightDiv.textContent = 'Night';
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
    currentDate.setDate(currentDate.getDate()); // Удаление одного дня
    const daysInWeek = 7;
    const options2 = { weekday: 'long' };
    let dayCount = 0;
    const dailyForecast = await getWeeklyForecast(currentCity);

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

            addWeatherCard(
                `${dayString}, ${dateString}`,
                '20°C', // утро
                'Sunny', // тип погоды утро
                '20°C', // ночь
                'Sunny', // тип погоды ночь
                'images/weather-icons/moon.png',
                weekIndex
            );
            dayCount++;
        }
    }
}

async function getWeeklyForecast(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${apiKey}&units=metric&lang=ru&cnt=30`;
  
    try {
        const response = await fetch(apiUrl);
  
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();

        // Проход по каждому элементу массива list
        const dailyForecast = data.list.reduce((dailyForecast, forecast) => {
            const date = forecast.dt_txt.split(' ')[0]; // Извлечение даты без времени
            const time = forecast.dt_txt.split(' ')[1]; // Извлечение времени

            // Определение, днем или ночью
            const isDay = time >= '06:00:00' && time < '18:00:00';
            
            // Добавление в массив dailyForecast
            if (!dailyForecast[date]) {
                dailyForecast[date] = { day: [], night: [] };
            }

            if (isDay) {
                dailyForecast[date].day.push(forecast);
            } else {
                dailyForecast[date].night.push(forecast);
            }

            return dailyForecast;
        }, {});

        return dailyForecast;
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}










  
  
  