import React from "react";
import "./App.css";
import GlobalStatistics from "./components/GlobalStatistics";
import CountryRanking from "./components/CountryRanking";
import CountryStatistics from "./components/CountryStatistics";

function App() {
  return (
    <div className="App">
      <GlobalStatistics />
      <CountryStatistics />
      <CountryRanking />
    </div>
  );
}

export default App;
