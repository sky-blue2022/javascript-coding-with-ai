// Replace 'your_api_key_here' with your actual API key from OpenWeatherMap
const apiKey = "your_api_key_here";

document.getElementById("getWeather").addEventListener("click", () => {
  const city = document.getElementById("cityInput").value.trim(); // Trim spaces

  if (!city) {
    alert("Please enter a city name!");
    return;
  }

  // Encode the city name to handle spaces and special characters
  const encodedCity = encodeURIComponent(city);

  // Construct the API URL
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&units=metric&appid=${apiKey}`;

  fetch(apiUrl)
    .then((response) => {
      // Check if the response is not OK
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("City not found. Please check the spelling.");
        }
        throw new Error(
          "Failed to fetch weather data. Please try again later."
        );
      }
      return response.json();
    })
    .then((data) => {
      // Display weather information
      const weatherInfo = `
                <p><strong>City:</strong> ${data.name}</p>
                <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
                <p><strong>Condition:</strong> ${data.weather[0].description}</p>
            `;
      document.getElementById("weatherResult").innerHTML = weatherInfo;
    })
    .catch((error) => {
      // Display error messages in red
      document.getElementById("weatherResult").innerHTML = `
                <p style="color: red;">Error: ${error.message}</p>
            `;
    });
});
