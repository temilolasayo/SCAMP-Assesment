import React, { useState } from "react";
import Select from "react-select";
import axios from "axios";
import "./css/styles.css";

function CountryRanking() {
  const [table, setTable] = useState(null);

  const [errormsg, setErrorMsg] = useState(null);

  const [rankType, setRankType] = useState("");

  const options = [
    { value: "TotalConfirmed", label: "Total Confirmed" },
    { value: "TotalDeaths", label: "Total Deaths" },
    { value: "TotalRecovered", label: "Total Recovered" },
  ];

  const handleChange = (e) => {
    console.log(e.value);
    setRankType(e.value);
    // console.log(e.value);
  };

  const sortRanking = async () => {
    const response = await axios
      .get(`https://api.covid19api.com/summary`)
      .catch((e) => setErrorMsg("Something went wrong"));

    if (response.data.length === 0) {
      setErrorMsg("Something went wrong!!!!");
      setTable("");
    } else {
      if (rankType === "TotalConfirmed") {
        setTable(
          response.data.Countries.sort(
            (a, b) => a.TotalConfirmed - b.TotalConfirmed
          )
        );
        setErrorMsg("");
      } else {
        if (rankType === "TotalDeaths") {
          setTable(
            response.data.Countries.sort(
              (a, b) => a.TotalDeaths - b.TotalDeaths
            )
          );
          setErrorMsg("");
        } else {
          if (rankType === "TotalRecovered") {
            setTable(
              response.data.Countries.sort(
                (a, b) => a.TotalRecovered - b.TotalRecovered
              )
            );
            setErrorMsg("");
          }
        }
      }
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
    return table.map((countryRankingData) => {
      const {
        Slug,
        TotalDeaths,
        TotalConfirmed,
        TotalRecovered,
      } = countryRankingData;
      return (
        <tr key={TotalConfirmed}>
          <td>{Slug.toUpperCase()}</td>
          <td className="text-success">{TotalConfirmed}</td>
          <td className="text-danger">{TotalDeaths}</td>
          <td className="text-info">{TotalRecovered}</td>
        </tr>
      );
    });
  };

  return (
    <div className="container pt-5 mb-5">
      <div className="card">
        <h5 className="card-header"> Ranking of Countries for Corona Virus</h5>

        <div className="card-body">
          <div className="text-center">
            <Select options={options} onChange={handleChange} />
            <br />
            <button
              type="button"
              className="btn btn-success mr-5"
              onClick={() => sortRanking()}
            >
              Search
            </button>

            <section>
              <br /> <br />
              {table && (
                <div id="tableDisplay">
                  <table id="rankingTable">
                    <tbody>
                      <tr>{renderTableHeader()}</tr>
                      {renderTableData()}
                    </tbody>
                  </table>
                </div>
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
    </div>
  );
}

export default CountryRanking;
