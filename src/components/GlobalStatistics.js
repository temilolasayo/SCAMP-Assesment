import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/styles.css";

function GlobalStatistics() {
  const [globalStats, SetGlobalStats] = useState(null);

  const [errormsg, setErrorMsg] = useState(null);

  const todayDate = new Date();
  const currentDate = todayDate.toString();

  useEffect(() => {
    axios
      .get(`https://api.covid19api.com/world/total`)

      .then((response) => {
        SetGlobalStats(response.data);
      })
      .catch((error) => {
        console.log(error);
        setErrorMsg("Something went wrong!!!!");
      });
  });

  return (
    <div className="container pt-5">
      <h2 className="font-weight-bold pb-3">
        Monitoring Dashboard for Corona Virus
      </h2>
      <div className="card ">
        <h5 className="card-header">Global Statistics</h5>

        <div className="card-body">
          {globalStats && (
            <div>
              <div className="row">
                <div className="col-sm-4">
                  Confirmed Cases:{" "}
                  <p className="card-text font-weight-bold">
                    {globalStats.TotalConfirmed}
                  </p>
                </div>
                <div className="col-sm-4">
                  Deaths:{" "}
                  <p className="card-text font-weight-bold">
                    {globalStats.TotalDeaths}
                  </p>
                </div>
                <div className="col-sm-4">
                  Recovered:
                  <p className="card-text font-weight-bold">
                    {globalStats.TotalRecovered}
                  </p>
                </div>
              </div>
              Globally, as of {currentDate}, there have been{" "}
              <span className="text-primary font-weight-bold">
                {globalStats.TotalConfirmed} confirmed cases{" "}
              </span>
              of COVID-19, including{" "}
              <span className="text-danger font-weight-bold">
                {globalStats.TotalDeaths} deaths
              </span>
              , reported to WHO.
            </div>
          )}
          {/* {errormsg && (
            <div className="row text-center">
              <h3 className="text-danger ">{errormsg}</h3>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}

export default GlobalStatistics;
