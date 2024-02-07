let searchInput = document.getElementById('search-input');
let searchBtn = document.getElementById('search-btn');
let city = document.getElementById('adress');
let derece = document.getElementById('derece');
let weatherCity = document.getElementById('weather');
let wendCity = document.getElementById('wend');
let icon = document.getElementById('icon');
let humidity = document.getElementById('humidity');

function getCityName(){
    if(searchInput.value == ''){
        city.innerHTML = 'Not Found!!';
    }
    else{
        getWeather()
    }    
}
getWeatherThanLocal()

function getWeather(){
    let weather = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=b513826a8063ba4050422b7e5e7b1549`;
    localStorage.setItem('adress', weather);
    fetch(localStorage.getItem('adress'))
        .then((response) => response.json())

        .then((repositories) => {
            if(repositories.cod == '404'){
                searchInput.classList.add('error');
                setTimeout(() => {
                    searchInput.classList.remove('error')
                }, 1000);
            }
            else{
                city.innerHTML = repositories.name;
                let celisius = repositories.main.temp - 273;
                derece.innerHTML = `<h1 id="derece">${Math.floor(celisius)} <span>o</span>  C</h1>`;
                weatherCity.innerHTML = `${repositories.weather[0].main}(${repositories.weather[0].description})`
                wendCity.innerHTML  = `${repositories.wind.speed}km/H Wind Speed`
                icon.src = `https://openweathermap.org/img/wn/${repositories.weather[0].icon}.png`;
                humidity.innerHTML  = `${repositories.main.humidity}% humidity`

            }
            
        });
    
    

}
function getWeatherThanLocal(){
    fetch(localStorage.getItem('adress'))
        .then((response) => response.json())

        .then((repositories) => {
            city.innerHTML = repositories.name;
            let celisius = repositories.main.temp - 273;
            derece.innerHTML = `<h1 id="derece">${Math.floor(celisius)} <span>o</span>  C</h1>`;
            weatherCity.innerHTML = `${repositories.weather[0].main}(${repositories.weather[0].description})`
            wendCity.innerHTML  = `${repositories.wind.speed}km/H Wind Speed`
            icon.src = `https://openweathermap.org/img/wn/${repositories.weather[0].icon}.png`;
            humidity.innerHTML  = `${repositories.main.humidity}% humidity`
        });
}
