import { use, useState } from "react"
import "./sidebar.css"
import searchIcon from "../../assets/icons/search.png"
const Sidebar = ({ cityImage, setCity, weather }) => {
    const [term, setTerm] = useState("")

    const today = new Date()
    const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });


    const handleSubmit = (e) => {
        e.preventDefault()
        setCity(term)
    }

    return (
        <div className="sidebar">
            <form onSubmit={handleSubmit} className="search-form">
                <img src={searchIcon} alt="search" className="search-icon" />
                <input
                    onChange={(e) => { setTerm(e.target.value) }}
                    value={term}
                    type="text"
                    placeholder="Search for places..."
                />
            </form>
            <div className="sidebar-weather">
                <img
                    src={`/weather-icons/${weather.weather[0].icon}.png`}
                    alt="Weather icon"
                    className="main-weather-icon"
                />
                <h1 className="temp-large">{Math.round(weather.main.temp)}°C</h1>
                <div className="day-time">
                    <h2 className='day'>{dayName} ,</h2>
                    <p className='time'>{today.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
                <hr />
                <div className="mini-weather-desc">
                    <div className="weather-desc-wrap">
                        <img
                            src={`/weather-icons/${weather.weather[0].icon}.png`}
                            alt="Condition icon"
                            className="desc-mini-icon"
                        />
                        <p>{weather.weather[0].description.charAt(0).toUpperCase() + weather.weather[0].description.slice(1)}</p>
                    </div>

                    <div className="weather-rain-wrap">
                        <img
                            src="/weather-icons/09d.png"
                            alt="Rain icon"
                            className="desc-mini-icon"
                        />
                        <p>Rain - {weather.main.humidity}%</p>
                    </div>
                  
                </div>
                  <div style={{ backgroundImage: `url(${cityImage || '/city-bg.jpg'})` }} className="city-card" >
                        <div className="city-overlay">
                            <p className="city-text">{weather.name}, {weather.sys.country}</p>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default Sidebar