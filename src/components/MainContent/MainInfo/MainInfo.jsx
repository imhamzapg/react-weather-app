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
    console.log(weather)
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

    const sunriseTargetTime = weather?.sys ? new Date((weather.sys.sunrise + weather.timezone) * 1000) : null;
    const sunsetTargetTime = weather?.sys ? new Date((weather.sys.sunset + weather.timezone) * 1000) : null;

    const sunriseTime = sunriseTargetTime?.toLocaleTimeString('sr-RS', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });
    const sunsetTime = sunsetTargetTime?.toLocaleTimeString('sr-RS', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });

    return (
        <div className="insights-container">
            <h1>Today's Highlights</h1>
            <div className="insights-grid">
                {weather?.main && (
                    <>
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
                    </>
                )}
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
            </div>
        </div>
    )
}

export default MainInfo 