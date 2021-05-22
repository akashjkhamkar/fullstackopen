const Country = ({ CurrentCountry }) => {
  if (Object.keys(CurrentCountry).length === 0) {
    return <></>;
  }

  return (
    <div>
      <h1>{CurrentCountry.name}</h1>
      <div>capital {CurrentCountry.capital}</div>
      <div>population {CurrentCountry.population}</div>
      <h2>languages</h2>

      <ul>
        {CurrentCountry.languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>

      <img width="150px" src={CurrentCountry.flag} alt="flag"></img>
    </div>
  );
};
export default Country;
