import React, { useState } from "react";
import { useLazyQuery, gql } from "@apollo/client";

const QUERY_SEARCH_COUNTRY = gql`
  query GetCountry($code: ID!) {
    country(code: $code) {
      name
      capital
      emoji
      code
      currency
    }
  }
`;

function Search() {
  const [countrySearch, setCountrySearch] = useState("");
  const [getCountry, { loading, error, data }] =
    useLazyQuery(QUERY_SEARCH_COUNTRY);

  return (
    <div className="search">
      <div className="inputs">
        <input
          type="text"
          placeholder="Search for a country"
          onChange={(e) => setCountrySearch(e.target.value)}
        />
        <button
          onClick={() => {
            getCountry({
              variables: { code: countrySearch.toUpperCase() },
            });
          }}
        >
          Search Country
        </button>
      </div>
      <div className="searchCountry">
        {loading && <p> Data is loading.... </p>}
        {error && <p> Error: {error.message} </p>}
        {data && (
          <div className="countryDisplay">
            <h2>
              {data.country.name} {data.country.emoji}
            </h2>
            <p>Capital: {data.country.capital}</p>
            <p>Code: {data.country.code}</p>
            <p>Currency: {data.country.currency}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
