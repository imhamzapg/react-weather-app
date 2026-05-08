import './App.css'
import { useState, useEffect } from 'react'
function App() {
  const [weather, setWeather] = useState(null)
  const [city, setCity] = useState("Novi Pazar")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const API_KEY = "783df983330ec9a2aef131fb4857f95c"
  const baseURL = "https://api.openweathermap.org/data/2.5/weather";
  const fetchData = async () => {
    try {
      const response = await fetch(`${baseURL}?q=${city}&appid=${API_KEY}&units=metric`);
      if (!response.ok) {
        throw new Error("City not found")
      }
      const data = await response.json();
      setWeather(data)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }
  useEffect(()=>{
    fetchData()
  },[])
  return (
    <>
      <h1>Weather App</h1>
    </>
  )
}

export default App
