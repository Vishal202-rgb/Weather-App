window.addEventListener("DOMContentLoaded", () => {
    const apiurl = "/api/weather?q=";

    const searchBox = document.querySelector(".search input");
    const searchBtn = document.querySelector(".search button");
    const weatherIcon = document.querySelector(".weather-icon");

    async function checkWeather(city) {
        const response = await fetch(apiurl + city);

        if (!response.ok) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
            return;
        }

        const data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        const weatherMain = data.weather[0].main;

        if (weatherMain === "Clouds") {
            weatherIcon.src = "clouds.png";
        } else if (weatherMain === "Clear") {
            weatherIcon.src = "clear.png";
        } else if (weatherMain === "Rain") {
            weatherIcon.src = "rain.png";
        } else if (weatherMain === "Drizzle") {
            weatherIcon.src = "drizzle.png";
        } else if (weatherMain === "Mist") {
            weatherIcon.src = "mist.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }

    searchBtn.addEventListener("click", () => {
        checkWeather(searchBox.value);
    });
});