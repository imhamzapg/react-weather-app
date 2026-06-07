import { useState, useEffect } from "react"
import "./MainInfo.css"

const MainInfo = ({ weather }) => {
    const feelsLike = Math.round(weather?.main?.feels_like) ?? 0
    const actualTemp = Math.round(weather?.main?.temp) ?? 0

    const diff = feelsLike - actualTemp
    const diffText = diff > 0 ? `↑${diff}°` : diff < 0 ? `↓${Math.abs(diff)}°` : "0°"

    let message = "It feels the same."
    if (diff > 0) message = "It feels warmer."
    if (diff < 0) message = "It feels colder."

    const sliderPosition = Math.max(10, Math.min(90, 50 + diff * 5))

    const getWindDirection = (deg) => {
        if (deg >= 337.5 || deg < 22.5) return "N";
        if (deg >= 22.5 && deg < 67.5) return "NE";
        if (deg >= 67.5 && deg < 112.5) return "E";
        if (deg >= 112.5 && deg < 157.5) return "SE";
        if (deg >= 157.5 && deg < 202.5) return "S";
        if (deg >= 202.5 && deg < 247.5) return "SW";
        if (deg >= 247.5 && deg < 292.5) return "W";
        if (deg >= 292.5 && deg < 337.5) return "NW";
        return "N/A";
    };

    const getHumidity = (hum) => {
        if (hum <= 30) return "Low"
        if (hum <= 60) return "Normal"
        return "High"
    }

    const getVisibility = (vis) => {
        if (vis <= 1000) return "Poor"
        if (vis <= 4000) return "Fair"
        if (vis <= 10000) return "Good"
        return "Excellent"
    }

    const getPressureStatus = (hpa) => {
        if (hpa < 1000) return "Low Pressure"
        if (hpa <= 1020) return "Normal"
        return "High Pressure"
    }

    const getUvStatus = (uv) => {
        if (uv <= 2) return "Low"
        if (uv <= 5) return "Moderate"
        if (uv <= 7) return "High"
        return "Very High"
    }

    const sunriseTargetTime = weather?.sys ? new Date((weather.sys.sunrise + weather.timezone) * 1000) : null;
    const sunsetTargetTime = weather?.sys ? new Date((weather.sys.sunset + weather.timezone) * 1000) : null;

    const sunriseTime = sunriseTargetTime?.toLocaleTimeString('sr-RS', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });
    const sunsetTime = sunsetTargetTime?.toLocaleTimeString('sr-RS', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });

    return (
        <div className="insights-container">
            <h1>Today's Highlights</h1>
            <div className="insights-grid">

                {/* 1. FEELS LIKE CARD */}
                {weather?.main && (
                    <div className="insights-card FL">
                        <div className="Fl-icon">
                            <span className="material-symbols-outlined feels-like-icon">thermostat</span>
                            <h2>FEELS LIKE</h2>
                        </div>
                        <h1 className="feels-like-temp">{feelsLike}°</h1>
                        <h3 className="actual-temp">Actual: {actualTemp}°</h3>
                        <div className="fl-slider-container">
                            <div className="fl-track"></div>
                            <div
                                className="fl-badge"
                                style={{ left: `${sliderPosition}%` }}
                            >
                                {diffText}
                            </div>
                        </div>
                        <p className="fl-message">{message}</p>
                    </div>
                )}

                {/* 2. WIND SPEED CARD */}
                {weather?.wind && (
                    <div className="insights-card WS">
                        <div className="Fl-icon">
                            <span className="material-symbols-outlined feels-like-icon">air</span>
                            <h2>Wind</h2>
                        </div>
                        <h1 style={{ fontSize: "3rem" }} className="feels-like-temp">{Math.round(weather.wind.speed)} m/s</h1>
                        <div className="wind-compas" >
                            <span
                                className="material-symbols-outlined"
                                style={{
                                    transform: `rotate(${weather.wind.deg + 180}deg)`,
                                }}
                            >
                                navigation
                            </span>
                            <h3 style={{ fontSize: "1.2rem", fontWeight: "500" }}>
                                Direction: {getWindDirection(weather.wind.deg)}
                            </h3>
                        </div>
                    </div>
                )}

                {/* 3. SUNRISE & SUNSET CARD */}
                {weather?.sys && (
                    <div className="insights-card">
                        <div className="Fl-icon">
                            <span className="material-symbols-outlined feels-like-icon">wb_twilight</span>
                            <h2>Sunrise & Sunset</h2>
                        </div>
                        <div className="sun-container">
                            <div className="mini-sun-data-cont">
                                <span className="material-symbols-outlined feels-like-icon">arrow_upward</span>
                                <h1>{sunriseTime}</h1>
                            </div>
                            <div className="mini-sun-data-cont">
                                <span className="material-symbols-outlined feels-like-icon">arrow_downward</span>
                                <h1>{sunsetTime}</h1>
                            </div>
                        </div>
                    </div>
                )}

                {/* 4. HUMIDITY CARD */}
                {(weather?.main?.humidity !== undefined) && (
                    <div className="insights-card">
                        <div className="Fl-icon">
                            <span className="material-symbols-outlined feels-like-icon">water_drop</span>
                            <h2>Humidity</h2>
                        </div>
                        <div className="humidity-continer">
                            <div className="wrapper">
                                <h1 style={{ fontSize: "3rem" }} className="feels-like-temp">{weather.main.humidity}%</h1>
                                <p style={{ fontSize: "1.2rem" }}>{getHumidity(weather.main.humidity)}</p>
                            </div>
                            <div
                                style={{
                                    justifyContent: weather.main.humidity <= 30 ? "flex-end" : weather.main.humidity <= 60 ? "center" : "flex-start",
                                }}
                                className="scale"
                            >
                                <div
                                    style={{
                                        backgroundColor: weather.main.humidity <= 30 ? "#4caf50" : weather.main.humidity <= 60 ? "#2196f3" : "#f44336"
                                    }}
                                    className="circle"
                                ></div>
                            </div>
                        </div>
                    </div>
                )}

                {/* 5. VISIBILITY CARD */}
                {(weather?.visibility !== undefined) && (
                    <div className="insights-card">
                        <div className="Fl-icon">
                            <span className="material-symbols-outlined feels-like-icon">visibility</span>
                            <h2>Visibility</h2>
                        </div>
                        <div className="visibility-container">
                            <h1 style={{ fontWeight: "500", fontSize: "2.5rem" }}>{weather.visibility / 1000} km</h1>
                        </div>
                        <p style={{ fontSize: "1.2rem", marginTop: "10px" }}>{getVisibility(weather.visibility)}</p>
                    </div>
                )}

                {/* 6. PRESSURE CARD */}
                {(weather?.main?.pressure !== undefined) && (
                    <div className="insights-card">
                        <div className="Fl-icon">
                            <span className="material-symbols-outlined feels-like-icon">compress</span>
                            <h2>Pressure</h2>
                        </div>
                        <div className="pressure-container">
                            <h1 style={{ fontWeight: "500", fontSize: "2.5rem" }}>{weather.main.pressure} hPa</h1>
                        </div>
                        <p style={{ fontSize: "1.2rem", marginTop: "10px" }}>{getPressureStatus(weather.main.pressure)}</p>
                    </div>
                )}

                {/* 7. UV INDEX CARD */}
                <div className="insights-card">
                    <div className="Fl-icon">
                        <span className="material-symbols-outlined feels-like-icon">wb_sunny</span>
                        <h2>UV Index</h2>
                    </div>
                    <div className="uv-container">
                        <h1 style={{ fontWeight: "500", fontSize: "2.5rem" }}>{weather?.uv ?? 4}</h1>
                    </div>
                    <p style={{ fontSize: "1.2rem", marginTop: "10px" }}>{getUvStatus(weather?.uv ?? 4)}</p>
                </div>

                {/* 8. AIR QUALITY CARD */}
                <div className="insights-card">
                    <div className="Fl-icon">
                        <span class="material-symbols-outlined">
                            aq
                        </span>                       
                         <h2>Air Quality</h2>
                    </div>
                    <div className="aqi-container">
                        <h1 style={{ fontWeight: "500", fontSize: "2.5rem" }}>{weather?.aqi ?? 2} <span style={{ fontSize: "1.2rem" }}>AQI</span></h1>
                    </div>
                    <p style={{ fontSize: "1.2rem", marginTop: "10px" }}>
                        {weather?.aqi === 1 ? "Good" : weather?.aqi === 2 ? "Fair" : weather?.aqi === 3 ? "Moderate" : "Poor"}
                    </p>
                </div>

            </div>
        </div>
    )
}

export default MainInfo