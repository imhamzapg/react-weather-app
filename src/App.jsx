import './App.css'
import { useState, useEffect } from 'react'
import Sidebar from './components/sidebar'

function App() {
  const [weather, setWeather] = useState(null)
  const [city, setCity] = useState("Novi Pazar")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const API_KEY = "783df983330ec9a2aef131fb4857f95c"
  const baseURL = "https://api.openweathermap.org/data/2.5/weather";

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

  useEffect(() => {
    fetchData(); 
  }, [city]);

  return (
    <div className="app-container">
      
      {loading && <div className="status-message">Loading....</div>} 
      {error && <div className="status-message error">{error}</div>} 

      {weather && !loading && (
        <div className="dashboard-layout"> 
          <Sidebar setCity={setCity} weather={weather} /> 

          <main className="main-content">
             <h2>Today's Highlights for {weather.name}</h2>
             <div className="temp-large">{Math.round(weather.main.temp)}°C</div>
          </main>
        </div>
      )}
    </div>
  )
}

export default App