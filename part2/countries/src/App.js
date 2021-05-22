import React, { useState, useEffect } from "react";
import axios from "axios";
import Country from "./components/Country.js";
import Filter from "./components/Filter.js";
import CountryNames from "./components/CountryNames.js";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [CurrentCountry, setCurrentCountry] = useState({});
  const [searchResult, setNewSearchResult] = useState([]);

  useEffect(() => {
    console.log("making request ...");
    axios.get("https://restcountries.eu/rest/v2/all").then((Response) => {
      let countries = [];
      Response.data.forEach((element) => {
        countries.push(element);
      });
      setCountries(countries);
    });
  }, []);

  // handlers
  const search = (query) => {
    let i = 0;
    const result = [];
    while (i < countries.length && result.length <= 11) {
      const country = countries[i];
      if (country.name.toLowerCase().includes(query.toLowerCase())) {
        result.push(country);
      }
      i++;
    }

    setCurrentCountry([]);
    if (result.length === 1) {
      setCurrentCountry(result[0]);
    }
    return result;
  };

  const HandleQueryChange = (event) => {
    const query = event.target.value;
    if (query) {
      let result = search(query);
      setNewSearchResult(result);
    } else {
      setNewSearchResult([]);
    }
  };

  return (
    <div>
      <Filter handler={HandleQueryChange} />
      <CountryNames NamesToShow={searchResult} />
      <Country CurrentCountry={CurrentCountry} />
    </div>
  );
};

export default App;
