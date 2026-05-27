import { useState, useEffect } from "react"


const MainInfo = ({ weather }) => {
    return (
        <>
            <div className="insights-container">
                <h1>Today's Highlights</h1>

                <div className="insights-grid">
                    {weather && weather.main && (
                        <>
                            <div className="Uv">
                                <h2>UV Index</h2>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default MainInfo
