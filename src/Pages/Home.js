import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";

const QUERY_LIST_OF_COUNTRIES = gql`
  {
    countries {
      name
      capital
      emoji
      code
    }
  }
`;

function Home() {
  const { loading, error, data } = useQuery(QUERY_LIST_OF_COUNTRIES);
  return (
    <div className="home">
      <div className="title">
        <h1>List Of Countries</h1>
        <Link to="/search">Search for Country </Link>
      </div>
      <div className="listOfCountries">
        {loading && <p> Data is loading.... </p>}
        {error && <p> Error: {error.message} </p>}
        {data &&
          data.countries.map((country, id) => (
            <div key={id} className={country}>
              <h2>
                {country.name} <label> {country.emoji}</label>
              </h2>
              <p>
                {country.capital} | {country.code}
              </p>
              <hr />
            </div>
          ))}
      </div>
    </div>
  );
}

export default Home;
