let submitButton = document.getElementById('submit-button');
let cityButton = document.getElementById('city');
let weatherHeader = document.getElementById('weather-header')
let city;
let api = 'cd4b86131f339b846419787fd23f54e2';
let weatherImgDiv = document.getElementById('weather-img');
let conditionTitle = document.getElementById('condition-title');
let cityName = document.getElementById('city-name');
let temp = document.getElementById('temp');
let feelsLike = document.getElementById('feels-like');
let wind = document.getElementById('wind');
let description = document.getElementById('description');
let weatherSpecifics = document.getElementById('weather-specifics');
let weatherInfoSection = document.getElementById('weather-info-section');




submitButton.addEventListener('click', getWeather);




async function getWeather() {
    weatherInfoSection.style.visibility = 'visible';
    city = cityButton.value;
    cityName.textContent = city.toUpperCase();
try {
    await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${api}`, {mode:'cors'})
    .then(function(response){
        return response.json();
    })
    .then(function(response){
        console.log(response)

        let temp = kelvinToF(response.main.temp);
        let feelsLike = kelvinToF(response.main.feels_like);
        let windCondition = response.wind.speed;
        let descriptionCondition = response.weather[0].description.toUpperCase();
        let condition = response.weather[0].main;
        cityName.textContent = city.toUpperCase();
        checkCondition(condition);


        logWeather(temp, feelsLike, windCondition, descriptionCondition);
        
    })
} catch(error) {

    alert('Please Enter A Valid City/State/Country');
    document.location.reload();
    
}
    

}

function checkCondition(condition) {
    removeAllChildNodes(weatherImgDiv);
    let image = new Image();
    image.classList.add('icon');

    if(condition == 'Clouds') {
        image.src = 'https://freesvg.org/img/sivvus_weather_symbols_2.png';
        conditionTitle.textContent = 'Cloudy';
        weatherImgDiv.style.visibility = 'visible';
        weatherImgDiv.appendChild(conditionTitle);
        weatherImgDiv.appendChild(image);

    } else if(condition == "Rain") {
        image.src = 'https://cdn.iconscout.com/icon/free/png-256/rain-238-445608.png';
        conditionTitle.textContent = 'Rain';
        weatherImgDiv.style.visibility = 'visible';
        weatherImgDiv.appendChild(conditionTitle);

        weatherImgDiv.appendChild(image);

    } else if(condition == "Clear") {
        image.src = 'https://cdn1.iconfinder.com/data/icons/weather-elements/512/Weather_SunGradient.png';
        conditionTitle.textContent = 'Clear';
        weatherImgDiv.style.visibility = 'visible';
        weatherImgDiv.appendChild(conditionTitle);

        weatherImgDiv.appendChild(image);

    }
    
    

}

function kelvinToF(kelvin){
    let fahrenheit = 1.8 * (kelvin - 273) + 32;
    return fahrenheit.toFixed(0);
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function logWeather(a, b, c, d){
    weatherSpecifics.style.visibility = 'visible';

    temp.textContent = a;
    feelsLike.textContent = b;
    wind.textContent = c;
    description.textContent = d;
}


