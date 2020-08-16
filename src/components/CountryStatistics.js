import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";
import countryList from "react-select-country-list";
import "./css/styles.css";

function CountryStatistics() {
  const [countryDeaths, SetCountryDeaths] = useState([]);

  const [countryRecoveredCases, SetCountryRecoveredCases] = useState([]);

  const [countryStats, SetCountryStats] = useState(null);

  const [selectOptions, setSelectOptions] = useState([]);
  const selectList = countryList().getData();

  const [errormsg, setErrorMsg] = useState(null);

  const sortConfirmedCases = async () => {
    const response = await axios
      .get(
        `https://api.covid19api.com/dayone/country/${selectOptions}/status/confirmed`
      )
      .catch((e) => setErrorMsg("Something went wrong"));
    const res = await axios
      .get(
        `https://api.covid19api.com/dayone/country/${selectOptions}/status/deaths`
      )
      .catch((e) => setErrorMsg("Something went wrong"));

    const result = await axios
      .get(
        `https://api.covid19api.com/dayone/country/${selectOptions}/status/recovered`
      )
      .catch((e) => setErrorMsg("Something went wrong"));

    if (response.data.length === 0) {
      setErrorMsg("No data found");
      SetCountryStats("");
      SetCountryDeaths("");
      SetCountryRecoveredCases("");
    } else {
      SetCountryStats(response.data[response.data.length - 1].Cases);
      SetCountryDeaths(res.data[res.data.length - 1].Cases);
      SetCountryRecoveredCases(result.data[result.data.length - 1].Cases);
      setErrorMsg("");
    }
  };

  const handleChange = (e) => {
    console.log(e.value);
    setSelectOptions(e.value);
    // console.log(e.value);
  };

  return (
    <div className="container pt-5">
      <section className="pt-5">
        <div className="card">
          <h5 className="card-header">Country Statistics</h5>

          <div className="card-body">
            <div className="text-center">
              <Select options={selectList} onChange={handleChange} />
              <br />
              <button
                type="button"
                className="btn btn-success mr-5"
                onClick={() => sortConfirmedCases()}
              >
                Search
              </button>
            </div>
            <br />
            {countryStats && (
              <div className="row">
                <div className="col-sm-4">
                  Confirmed Cases:
                  <p className="card-text font-weight-bold">{countryStats}</p>
                </div>
                <div className="col-sm-4">
                  Deaths:
                  <p className="card-text font-weight-bold">{countryDeaths}</p>
                </div>
                <div className="col-sm-4">
                  Recovered:
                  <p className="card-text font-weight-bold">
                    {countryRecoveredCases}
                  </p>
                </div>
              </div>
            )}
            {errormsg && (
              <div className="row text-center">
                <h3 className="text-danger ">{errormsg}</h3>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default CountryStatistics;
