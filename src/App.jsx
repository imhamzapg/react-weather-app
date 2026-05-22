import './App.css'
import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar/sidebar'
import MainContent from './components/MainContent/MainContent'

const App = () => {
  const [weather, setWeather] = useState(null)
  const [city, setCity] = useState("Novi Pazar")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [cityImage, setCityImage] = useState("")
  const [isCelsius, setIsCelsius] = useState(true);
  const [forecast, setForecast] = useState(null);

  const toggleUnits = (status) => {
    setIsCelsius(status);
  };

  const API_KEY = "783df983330ec9a2aef131fb4857f95c"
  const baseURL = "https://api.openweathermap.org/data/2.5/weather";
  const forecastURL = "https://api.openweathermap.org/data/2.5/forecast";

  const fetchCityImage = async (cityName) => {
    const accessKey = "TxXIp-gUT-fdU3_wbebgVwETzGGTsbyqcEGyfl7oNsI"
    const url = `https://api.unsplash.com/search/photos?page=1&query=${cityName}&client_id=${accessKey}`;
    try {
      const responnse = await fetch(url)
      const data = await responnse.json()
      if (data.results && data.results.length > 0) {
        setCityImage(data.results[0].urls.regular)
      } else {
        setCityImage("/city-bg.jpg")
      }
    } catch (error) {
      console.error("Error fetching city image:", error)
      setCityImage("/city-bg.jpg")
    }
  }


  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${baseURL}?q=${city}&appid=${API_KEY}&units=metric`);
      if (!response.ok) {
        throw new Error("Grad nije pronađen");
      }
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      setError(error.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  }
  const fetchForecast = async () => {
    try {
      const response = await fetch(`${forecastURL}?q=${city}&appid=${API_KEY}&units=metric`);
      if (!response.ok) {
        throw new Error("Ne mogu dobiti prognozu");
      }
      const data = await response.json();
      setForecast(data);
    } catch (error) {
      console.error("Error fetching forecast:", error);
      setForecast(null);
    }
  }

  useEffect(() => {
    fetchData();
    fetchCityImage(city)
    fetchForecast();
  }, [city]);

  return (
    <div className="app-container">

      {loading && <div className="status-message">Loading....</div>}
      {error && <div className="status-message error">{error}</div>}

      {weather && !loading && (
        <div className="dashboard-layout">
          <Sidebar
            cityImage={cityImage}
            setCity={setCity}
            weather={weather}
            isCelsius={isCelsius}
          />
          <div className="main-content">
            <MainContent
              isCelsius={isCelsius}
              toggleUnits={toggleUnits}
              weather={weather}
              forecast={forecast}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default App