const API_Key = 'aca6c47bbfea5d553efbf45511fdadad';

const units = 'metric';
const currTime = new Date();

const GreetingMsg = document.getElementById("Greeting");
const disCityName = document.getElementById("city-name");
const temp = document.getElementById("temp");
const description = document.getElementById("original-desc");
const Feels_like_desc = document.getElementById("weather-description");
const WindSpeed = document.getElementById("wind-speed");
const dispName = document.getElementById("main-name");
const WindDesc = document.getElementById("wind-desc");

function CalculateTime(timedata){
    const timezoneOffset = timedata; // This is in seconds
    const currentDateTime = new Date();

    // Convert current date/time to UTC
    const utcDate = new Date(currentDateTime.getTime() + (currentDateTime.getTimezoneOffset() * 60000));

    // Calculate the local date/time for the city
    const cityDateTime = new Date(utcDate.getTime() + (timezoneOffset * 1000));

    // Format the date and time
    const options = { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        timeZone: 'UTC' // Change to desired timezone if necessary
    };
    console.log(`Local Date and Time in ${query.CityName}:`, cityDateTime.getHours());
    return cityDateTime;
}
function ChangeGreetingMsg(hours){
    var msg;
    if(hours < 12 && hours > 4){
        msg = "Good Morning";
    }
    else if(hours >= 12 && hours < 17){
        msg = "Good Afternoon";
    }
    else if(hours >= 17 && hours < 20){
        msg = "Good Evening";
    }
    else{
        msg = "Good Night";
    }
    return msg;
}
function DecideWindDescription(WindSpeed){
    var desc;
    if(WindSpeed < 2.0){
        desc = 'Low';
    }
    else if(WindSpeed >= 2.0 && WindSpeed < 8.0){
        if(WindSpeed >= 2.0 && WindSpeed < 4.0){
            desc = 'Moderately Low';
        }
        else if(WindSpeed >= 4.0 && WindSpeed < 6.0){
            desc = 'Moderate Flow';
        }
        else{
            desc = 'Moderately High';
        }
    }
    else{
        desc = 'Very High';
    }
    return desc;
}
function DetailsExtract() {
    const elements = new URLSearchParams(window.location.search);
    const CityName = elements.get('CityName');
    const UsrName = elements.get('username');
    console.log(elements);
    return {CityName, UsrName};
}
function decideBackground(weather, time){
    var path;
    console.log(weather === 'Haze');
    console.log(time < 20);
    if(weather === 'Rain'){
        if(time >= 20 && time < 5){
            path = "url('../Assets/rain_in_night_real.jpg')";
        }
        else{
            path = 'url("../Assets/a_girl_in_rain_real.jpg")';
        }
    }
    else if(weather === 'Clear'){
        if(time >= 5 && time < 19){
            path = "url('../Assets/sunny_real.jpg')";
        }
        else{
            path = "url('../Assets/clear_night_sky_real.jpg')";
        }
    }
    else if(weather === 'Haze'){
        if(time >= 5 && time < 19){
            path = "url('../Assets/Hazy_weather.jpg')";
        }
        else{
            path = "url('../Assets/haze_in_night.jpg')";
        }
    }
    else if(weather === 'Clouds'){
        if(time >= 5 && time < 19){
            path = "url('../Assets/Clouds_Real.jpg')";
        }
        else{
            path = "url('../Assets/cloudy_night_sky.jpg')"
        }
    }
    return path;
}
const query = DetailsExtract();
const api_call = `https://api.openweathermap.org/data/2.5/weather?q=`+query.CityName+`&units=`+units+`&appid=`+API_Key;

fetchweather(api_call);

function fetchweather(url){
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        disCityName.innerText = data.name;
        var timeObj = CalculateTime(data.timezone);
        document.body.style.backgroundImage = decideBackground(data.weather[0].main, timeObj.getHours());
        GreetingMsg.innerText = ChangeGreetingMsg(timeObj.getHours());
        dispName.innerText = query.UsrName;
        temp.innerText = data.main['temp'];
        description.innerText = data.weather[0].description;
        WindSpeed.innerText = `${data.wind['speed']} km/hr`;
        WindDesc.innerText = DecideWindDescription(data.wind.speed);
        Feels_like_desc.innerText = `It Feels Like ${data.main['feels_like']}°C with humidity of ${data.main['humidity']}%`;
    });
}


// itch.io for icons

// city name
// temp
// desc 
// feels like 
// wind 
// humidity 
