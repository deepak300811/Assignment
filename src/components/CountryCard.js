import axios from "axios"
import React, { useEffect, useState } from "react"
// import OverlayWeather from "./OverlayWeather"

const CountryCard = ({ countryData, countParent }) => {
  const { capital, population, latlng, flag } = countryData
  const [showOverlay, setShowOverlay] = useState(false)
  const [count, setCount] = useState(0)
  const [capitalData, setCapitalData] = useState({})
  //   http://api.weatherstack.com/current?access_key=46871bd58acb223d59cd7dcb1d550b6c&query=delhi

  useEffect(() => {
    setShowOverlay(false)
  }, [countParent])
  useEffect(() => {
    if (count > 0) {
      axios
        .get(
          `http://api.weatherstack.com/current?access_key=46871bd58acb223d59cd7dcb1d550b6c&query=${capital}`
        )
        .then(res => {
          console.log(res.data)
          setCapitalData(
            prev =>
              (prev = {
                temperature: res.data.current.temperature,
                weather_icons: res.data.current.weather_icons[0],
                wind_speed: res.data.current.wind_speed,
                precip: res.data.current.precip
              })
          )
        })
        // .then(res => console.log(res))
        .catch(error => console.log(error))
    }
  }, [count])
  return (
    <>
      {countryData.capital ? (
        <>
          <div className="outer">
            <div className="flag">
              <img src={flag} alt="" />
            </div>
            <div className="details">
              <span>Capital: {capital}</span>
              <span>Population: {population}</span>
              <span>LatLng: {latlng}</span>
            </div>
            <button
              className="cap-weather"
              onClick={() => {
                setCount(prev => prev + 1)
                setShowOverlay(prev => !prev)
              }}
              disabled={showOverlay}
            >
              Capital Weather
            </button>
          </div>
          {countryData.capital && showOverlay ? (
            <>
              {capitalData.temperature ? (
                <div className="outer weather">
                  <div className="weather-icon">
                    <img src={capitalData.weather_icons} alt="" />
                  </div>
                  <div className="details">
                    {/* <span>City: {capital}</span> */}
                    <span>Temperature: {capitalData.temperature}</span>
                    <span>Wind speed: {capitalData.wind_speed}</span>
                    <span>Precip: {capitalData.precip}</span>
                  </div>
                  <button
                    className="go-back "
                    onClick={() => {
                      // setCount(prev => prev + 1)
                      setShowOverlay(prev => !prev)
                    }}
                  >
                    X
                  </button>
                </div>
              ) : (
                <p>Capital Weather Data Not Found!!</p>
              )}
            </>
          ) : null}
        </>
      ) : null}
    </>
  )
}

export default CountryCard
