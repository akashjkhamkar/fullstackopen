import React from "react";

const CountryNames = ({ NamesToShow }) => {
  if (NamesToShow.length >= 10) {
    return <h4>Too many matches, specify another filter</h4>;
  } else {
    return (
      <div>
        {NamesToShow.map((country) => (
          <h4 key={country.name + Math.random() * 123}>{country.name}</h4>
        ))}
      </div>
    );
  }
};

export default CountryNames;
