import React, { useState } from "react";
import axios from "axios";
import "./css/styles.css";

function CountryRanking() {
  const [table, setTable] = useState(null);

  const [errormsg, setErrorMsg] = useState(null);

  const sortConfirmedCases = async () => {
    const response = await axios
      .get(`https://api.covid19api.com/summary`)
      .catch((e) => setErrorMsg("Something went wrong"));

    if (response.data.length === 0) {
      setErrorMsg("Something went wrong!!!!");
      setTable("");
    } else {
      setTable(
        response.data.Countries.sort(
          (a, b) => a.TotalConfirmed - b.TotalConfirmed
        )
      );
      setErrorMsg("");
    }
  };

  const sortRecoveredCases = async () => {
    const response = await axios
      .get(`https://api.covid19api.com/summary`)
      .catch((e) => setErrorMsg("Something went wrong"));
    if (response.data.length === 0) {
      setErrorMsg("Something went wrong!!!!");
      setTable("");
    } else {
      setTable(
        response.data.Countries.sort(
          (a, b) => a.TotalRecovered - b.TotalRecovered
        )
      );
      setErrorMsg("");
    }
  };

  const sortDeathCases = async () => {
    const response = await axios
      .get(`https://api.covid19api.com/summary`)
      .catch((e) => setErrorMsg("Something went wrong"));
    if (response.data.length === 0) {
      setErrorMsg("Something went wrong!!!!");
      setTable("");
    } else {
      setTable(
        response.data.Countries.sort((a, b) => a.TotalDeaths - b.TotalDeaths)
      );
      setErrorMsg("");
    }
  };

  const renderTableHeader = () => {
    return (
      <>
        <th>COUNTRY</th>
        <th>TOTAL CONFIRMED</th>
        <th>TOTAL DEATHS</th>
        <th>TOTAL RECOVERED</th>
      </>
    );
  };

  const renderTableData = () => {
    return table.map((post) => {
      const { Slug, TotalDeaths, TotalConfirmed, TotalRecovered } = post;
      return (
        <tr key={TotalConfirmed}>
          <td>{Slug.toUpperCase()}</td>
          <td>{TotalConfirmed}</td>
          <td>{TotalDeaths}</td>
          <td>{TotalRecovered}</td>
        </tr>
      );
    });
  };

  return (
    <div className="container pt-5 mb-5">
      <div className="card">
        <h5 className="card-header"> Ranking of Countries for Corona Virus</h5>

        <div className="card-body">
          <div className="text-center"></div>
          <button
            type="button"
            className="btn btn-success mr-5"
            onClick={() => sortConfirmedCases()}
          >
            Rank Based on Confirmed Cases
          </button>
          <button
            type="button"
            className="btn btn-danger mr-5"
            onClick={() => sortDeathCases()}
          >
            Rank Based on Total Deaths
          </button>
          <button
            type="button"
            className="btn btn-info"
            onClick={() => sortRecoveredCases()}
          >
            Rank Based on Total Recovered
          </button>
          <section>
            {table && (
              <table id="rankingTable">
                <tbody>
                  <tr>{renderTableHeader()}</tr>
                  {renderTableData()}
                </tbody>
              </table>
            )}
            {errormsg && (
              <div className="row text-center">
                <h3 className="text-danger ">{errormsg}</h3>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default CountryRanking;
