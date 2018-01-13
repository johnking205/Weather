function weatherRequest(){
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);

}
//Update the weather info based on coords
function geoSuccess(pos) {
    var coordinates = pos.coords;

    getWeatherInfo(coordinates.latitude, coordinates.longitude);
}

//Inform the user that coords couldn't be retreived
function geoError() {
    alert('Could not find location');
}


//Use Free Code Camp (FCC) API to get info about location
function getWeatherInfo(lat, lon) {
    var myRequest = new XMLHttpRequest();
    var requestURL = 'https://fcc-weather-api.glitch.me/api/current?lat='
    + encodeURIComponent(lat) +'&lon=' + encodeURIComponent(lon);
            
    myRequest.onreadystatechange = function() {
        if(myRequest.readyState === 4){
            if(myRequest.status === 200) {
                updateScreen(JSON.parse(myRequest.responseText));
            } else {
                alert('Could not connect to the weather app')
            }
        }
    };
    myRequest.open('GET', requestURL);
    myRequest.send();
}

//Update the weather info based on coords
function geoSuccess(pos) {
    var coordinates = pos.coords;

    getWeatherInfo(coordinates.latitude, coordinates.longitude);
}

//Inform the user that coords couldn't be retreived
function geoError() {
    alert('Could not find location');
}

//update the screen with the new weather info
function updateScreen(info) {
    //current weather icon
    var icon = document.getElementById('weatherIcon');
    icon.setAttribute('src', info.weather[0].icon);

    //current location name
    var location = document.getElementById('location');
    location.innerHTML = info.name;

    //current location day of the week
    var dayOfWeek = document.getElementById('dayOfWeek');
    dayOfWeek.innerHTML = getDayString();

    //current weather desecription
    var weatherDescription = document.getElementById('weatherDescription');
    weatherDescription.innerHTML = info.weather[0].description;

    //current wind direction
    var windDir = document.getElementById('windDir');
    windDir.innerHTML = 'Wind Direction: ' + getWindDirStr(info.wind.deg);

    //current wind velocity
    var windSpeed = document.getElementById('windSpeed');
    windSpeed.innerHTML = 'Wind Speed: ' + Math.round(info.wind.speed * 3600 / 1609 *10) / 10 + ' mph';

    //current humidity
    var humid = document.getElementById('humid');
    humid.innerHTML = 'Humidity: ' + info.main.humidity + '%';

    //current temp
    var temp = document.getElementById('temp');
    temp.innerHTML = Math.round(info.main.temp) + '&deg;'
}

//Get string of today's day of the week
function getDayString() {
    var day = new Date();
    var dayStr = ['Sunday', 'Monday', 'Tueday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return dayStr[day.getDay()];
}

//Convert wind direction degree to cardinal direction string
function getWindDirStr(deg) {
    var dirStr = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

    //math to convert deg to # from 0 (N) to 7 (NW)
    return dirStr[Math.round(deg / 45)%8];

}

//Toggle between F and C measurement
function toggleTemp(scale) {
    var temp = document.getElementById('temp');
    // var tempF = Math.round(parseInt(temp.innerHTML) * 9/5 + 32) + '&deg;';
    // var tempC = Math.round((parseInt(temp.innerHTML) * 5/9) + 32) + '&deg;';

    if(scale==='f') {
        document.getElementById('fahrenheit').style.color = 'aliceblue';
        document.getElementById('fahrenheit').removeAttribute('onclick');
        document.getElementById('celsius').style.color = 'blue';
        document.getElementById('celsius').setAttribute('onclick', 'toggleTemp("c")');
        temp.innerHTML = Math.round(parseInt(temp.innerHTML) * 9/5 + 32) + '&deg;';
    }
    if(scale==='c') {
        document.getElementById('celsius').style.color = 'aliceblue';
        document.getElementById('celsius').removeAttribute('onclick');
        document.getElementById('fahrenheit').style.color = 'blue';
        document.getElementById('fahrenheit').setAttribute('onclick', 'toggleTemp("f")')
        temp.innerHTML = Math.round((parseInt(temp.innerHTML) - 32) * 5/9) + '&deg;';
    }
}