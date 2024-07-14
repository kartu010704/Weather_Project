import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { useState } from "react";

export default function SearchBox({ updateInfo }) {
  let [city, setCity] = useState("");
  let [error, setError] = useState(false);

  const API_URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "97c487e76b07e853adbfceeae71d802b";

  let getWeatherInfo = async () => {
    try {
      let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}`);
      if (!response.ok) {
        throw new Error("City not found");
      }
      let jsonResponse = await response.json();

      let result = {
        city: city,
        temp: Math.round(jsonResponse.main.temp - 273.15),
        tempMin: Math.round(jsonResponse.main.temp_min - 273.15),
        tempMax: Math.round(jsonResponse.main.temp_max - 273.15),
        humidity: jsonResponse.main.humidity,
        feels_like: Math.round(jsonResponse.main.feels_like - 273.15),
        weather: jsonResponse.weather[0].description,
      };
      console.log(result);
      return result;
    } catch (err) {
      setError(true);
      return null;
    }
  };

  let handleChange = (evt) => {
    setCity(evt.target.value);
  };

  let handleSubmit = async (evt) => {
    evt.preventDefault();
    setError(""); // Clear any existing errors
    console.log(city);
    let newInfo = await getWeatherInfo();
    if (newInfo) {
      updateInfo(newInfo);
    }
    setCity(""); // Reset the input field
  };

  return (
    <div className="SearchBox">
      <form onSubmit={handleSubmit}>
        <TextField
          id="city"
          label="City Name"
          variant="outlined"
          required
          value={city}
          onChange={handleChange}
        />
        {error && <div className="error">{error}</div>}
        <br />
        <br />
        <Button variant="contained" type="submit">
          Click
        </Button>

        {error && <p style={{ color: "red" }}>No Such place exists!</p>}
      </form>
    </div>
  );
}
