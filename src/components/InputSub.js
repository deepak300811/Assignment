import React, { useEffect, useState } from "react"
import axios from "axios"
import CountryCard from "./CountryCard"

const InputSub = () => {
  const [inputCountry, setInputCountry] = useState("")
  const [firstGotCountry, setFirstGotCountry] = useState({})
  const [count, setCount] = useState(0)
  const handleSubmit = e => {
    e.preventDefault()
    setCount(prev => prev + 1)
  }
  useEffect(() => {
    if (count > 0) {
      axios
        .get(`https://restcountries.eu/rest/v2/name/${inputCountry}`)
        .then(res => setFirstGotCountry(res.data[0]))
        .catch(error => setFirstGotCountry("Error"))
    }
  }, [count])
  return (
    <div className="container">
      <form className="form-box">
        <div className="form-control">
          <input
            type="text"
            name="country"
            id="country"
            onChange={e => setInputCountry(e.target.value)}
            placeholder="Enter"
          />
        </div>

        <div className="form-control">
          <button
            type="submit"
            onClick={e => handleSubmit(e)}
            disabled={inputCountry.length === 0}
          >
            Get Country Data
          </button>
        </div>
      </form>
      <CountryCard countryData={firstGotCountry} countParent={count} />
    </div>
  )
}

export default InputSub
