let weather = {
    "apiKey": "4ba1420c357df7768d63f241720ee87b",

    getWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
            + city
            + "&units=metric&appid="
            + this.apiKey
        ).then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },

    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, feels_like, temp_min, temp_max, humidity } = data.main;
        const { speed } = data.wind;

        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".temp-description").innerText = "Feels like: " + feels_like + " °C";
        document.querySelector(".max-temp").innerText = "High: " + temp_max + "°C";
        document.querySelector(".min-temp").innerText = "Low: " + temp_min + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind Speed: " + speed + "km/h";

        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')"
    },

    searchWeather: function () {
        this.getWeather(document.querySelector(".search-bar").value);
    }

};

document.querySelector(".search button").addEventListener("click", function () {
    weather.searchWeather();
});

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.searchWeather();
    }
});

weather.getWeather("Vancouver");