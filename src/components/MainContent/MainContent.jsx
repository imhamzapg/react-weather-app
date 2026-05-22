import { useState } from "react"

const MainContent = ({weather, isCelsius, toggleUnits , forecast}) =>{
    const [view, setView] = useState("week");
    return (
        <div className="main-content">
            <div className="top-bar">
                <div className="view-bars">
                    <button onClick={()=>{setView("today")}}>Today</button>
                    <button onClick={()=>{setView("week")}}>Week</button>
                </div>
                <div className="unite-selector">
                    <button onClick={() =>{toggleUnits(true)}}>℃</button>
                    <button onClick={() =>{toggleUnits(false)}}>℉</button>
                </div>
            </div>
            <div className="main">
                {view === "today" ? (
                    <>
                    {forecast && forecast.list && (
                        <div className="foreacst">
                            {forecast.list.slice(0, 5).map((item, index) => (
                                <div className="item" key={index}>
                                    {/* treba da lepo napravi podatke */}
                                    <p>{item.dt_txt}</p>
                                    <p>{isCelsius ? Math.round(item.main.temp) : Math.round((item.main.temp * 9/5) + 32)}°{isCelsius ? "C" : "F"}</p>
                                </div>
                            ))}
                        </div>
                    )}
                    </>
                ) : view === "week" ? (
                    <>
                    <h1>h1</h1> 
                    </>
                 ) : null}
            </div>
        </div>
    )
}

export default MainContent