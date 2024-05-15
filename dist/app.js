var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const sunnyIcon = "fas fa-sun big";
const cloudIcon = "fas fa-cloud big";
const rainIcon = "fas fa fa-cloud-rain big";
// <i class="fas fa-sun big"></i>
// <i class="fas fa-cloud big"></i>
// <i class="fas fa-cloud-rain big"></i>
document.addEventListener("DOMContentLoaded", function () {
    var apiKey = "9505a89d01a54dc0b47123008241505";
    var form = document.getElementById("weather-form"); // Cast para HTMLFormElement
    var weatherInfo = document.getElementById("weather-info");
    form === null || form === void 0 ? void 0 : form.addEventListener("submit", function (event) {
        return __awaiter(this, void 0, void 0, function* () {
            event.preventDefault();
            const cityInput = document.getElementById("city-input");
            const cityValue = cityInput.value;
            const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityValue}`;
            try {
                const weatherData = yield createInformation(apiUrl);
                if (weatherInfo)
                    weatherInfo.innerHTML = weatherData;
                weatherInfo.style.padding = "7px";
            }
            catch (error) {
                console.error("Error fetching weather data:", error);
                if (weatherInfo)
                    weatherInfo.innerHTML =
                        "<p>Error fetching weather data. Please try again.</p>";
            }
        });
    });
});
function createInformation(apiUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(apiUrl);
        const data = yield response.json();
        var icon = "";
        switch (data.current.condition.text) {
            case "Partly cloudy":
                icon = cloudIcon;
                break;
            case "Sunny":
                icon = sunnyIcon;
                break;
            case "Clear":
                icon = sunnyIcon;
                break;
            case "Moderate rain":
                icon = rainIcon;
                break;
            case "Light rain":
                icon = rainIcon;
                break;
            default:
                break;
        }
        if (response.ok) {
            const weatherInformation = `
            <h2>${data.location.name}, ${data.location.country}</h2>
            <p>Temperature: ${data.current.temp_c}°C</p>
            <p>Weather: ${data.current.condition.text}</p>
            <i class = "${icon}"></i>
          `;
            return weatherInformation;
        }
        else {
            throw new Error("Failed to fetch weather data");
        }
    });
}
