import { useState } from "react"
import "./MainContent.css"
import MainInfo from "./MainInfo/MainInfo";
const MainContent = ({ weather, isCelsius, toggleUnits, forecast }) => {
    const [view, setView] = useState("week");

    const weekDays = (day) => {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const date = new Date(day);
        return days[date.getDay()];
    };

    return (
        <div className="main-content">
            <div className="top-bar">
                <div className="view-bars">
                    <button
                        className={view === "today" ? "active" : ""}
                        onClick={() => { setView("today") }}
                    >
                        Today
                    </button>

                    <button
                        className={view === "week" ? "active" : ""}
                        onClick={() => { setView("week") }}
                    >
                        Week
                    </button>

                </div>
                <div className="units">
                    <button onClick={() => { toggleUnits(true) }} className={isCelsius ? "active" : ""}>°C</button>
                    <button onClick={() => { toggleUnits(false) }} className={!isCelsius ? "active" : ""}>°F</button>
                </div>
            </div>

            <div className="main">
                {view === "today" ? (
                    <>
                        {forecast && forecast.list && (
                            <div className="forecast">
                                {forecast.list.slice(0, 8).map((item, index) => (
                                    <div className="item" key={index}>
                                        <p>{item.dt_txt.split(" ")[1].split(":").slice(0, 2).join(":")}</p>
                                        <img
                                            src={`/weather-icons/${item.weather[0].icon}.png`}
                                            alt={item.weather[0].description}
                                            className="forecast-mini-icon"
                                        />
                                        <p>{isCelsius ? Math.round(item.main.temp) : Math.round((item.main.temp * 9 / 5) + 32)}°{isCelsius ? "C" : "F"}</p>
                                    </div>
                                ))}
                            </div>
                        )}


                    </>
                ) : view === "week" ? (
                    <>
                        {forecast && forecast.list && (
                            <div className="forecast">
                                {forecast.list.filter(item =>
                                    item.dt_txt.includes("12:00:00"))
                                    .map((item, index) => {
                                        return (
                                            <div key={index} className="item">
                                                <p>{weekDays(item.dt_txt.split(" ")[0])}</p>
                                                <img src={`/weather-icons/${item.weather[0].icon}.png`} alt=""
                                                className="forecast-mini-icon"
                                                />
                                                <div className="max-min-temp">
                                                    <p>{isCelsius ? Math.round(item.main.temp_max) : Math.round(item.main.temp_max * 9 / 5) + 32   }°{isCelsius ? "C" : "F"}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )}
                    </>
                ) : null}
            </div>
            <MainInfo weather={weather}/>
        </div>
    )
}

export default MainContent