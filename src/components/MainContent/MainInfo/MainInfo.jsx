import { useState, useEffect } from "react"
import "./MainInfo.css"

const MainInfo = ({ weather }) => {
    const feelsLike = Math.round(weather?.main?.feels_like) ?? 0
    const actualTemp = Math.round(weather?.main?.temp) ?? 0
    
    const diff = feelsLike - actualTemp
    const diffText = diff > 0 ? `↑${diff}°` : diff < 0 ? `↓${Math.abs(diff)}°` : "0°"

    let message = "It feels the same as the actual temperature."
    if (diff > 0) message = "It feels warmer than the actual temperature."
    if (diff < 0) message = "It feels colder than the actual temperature."

    const sliderPosition = Math.max(10, Math.min(90, 50 + diff * 5))

    return (
        <div className="insights-container">
            <h1>Today's Highlights</h1>

            <div className="insights-grid">
                {weather?.main && (
                    <div className="FL">
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
            </div>
        </div>
    )
}

export default MainInfo 