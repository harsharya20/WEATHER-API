const api='********************';

const iconImg = document.getElementById('weather-icon');
const loc = document.querySelector('#location');
const tempC = document.querySelector('.c');
const tempF = document.querySelector('.f');
const desc = document.querySelector('.desc');
const sunriseDOM = document.querySelector('.sunrise');
const sunsetDOM = document.querySelector('.sunset');


window.addEventListener('load', () => {
    let long;
    let lat;
    //accessing geolocation of the user
    //navigator.geolocation will check if the object is available in the browser.
    //if available then call getCurrentPositon
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) => {
        //storing longitude and latitude in variables
        long = position.coords.longitude;
        lat = position.coords.latitude;
        //use of js fetch API.The fetch APi enables to call and get data formAPI services. URL need
        //to be converted into JSON format so that we can use it in our app
        const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api}&units=metric`;
        //console.log(base);

        //using fetch to get data
        fetch(base)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const { temp } = data.main;
          const place = data.name;
          const { description, icon } = data.weather[0];
          const { sunrise, sunset } = data.sys;


            const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
            const fahrenheit = (temp * 9)/5 + 32;


            //converting Epoch(Unix) time to GMT
            const sunriseGMT = new Date(sunrise * 1000);
            const sunsetGMT = new Date(sunset * 1000);


            //interacting with DOM to show data
            iconImg.src = iconUrl;
          loc.textContent = `${place}`;
          desc.textContent = `${description}`;
          tempC.textContent = `${temp.toFixed(2)} °C`;
          tempF.textContent = `${fahrenheit.toFixed(2)} °F`;
          sunriseDOM.textContent = `${sunriseGMT.toLocaleDateString()}, ${sunriseGMT.toLocaleTimeString()}`;
          sunsetDOM.textContent = `${sunsetGMT.toLocaleDateString()}, ${sunsetGMT.toLocaleTimeString()}`;
        });

        });
    }
});

