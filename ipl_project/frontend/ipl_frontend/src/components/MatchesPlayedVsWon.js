import React, { useState, useEffect } from "react";
import axios from "axios";
import { Chart } from "react-google-charts";

const ExtraRunsChart = () => {
  const [chartData, setChartData] = useState([["Team", "Played", "Won"]]);
  const [year, setYear] = useState("");

  const fetchData = async (selectedYear = "") => {
    try {
      const url = selectedYear
        ? `http://127.0.0.1:8000/api/matches-vs-won/${selectedYear}/`
        : `http://127.0.0.1:8000/api/matches-vs-won/`;

      const response = await axios.get(url);
      const data = response.data;

    
      const formattedData = [
        ["Team", "Played", "Won"],
        ...data.map((item) => [item.team, item.played, item.won]),
      ];

      setChartData(formattedData);
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);


  const handleFilter = () => {
    fetchData(year);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Team Performance (Played vs Won)</h2>

      <div className="mb-4 flex items-center gap-2">
        <input
          type="number"
          placeholder="Enter Year (e.g. 2016)"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          onClick={handleFilter}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Filter
        </button>
      </div>

      <Chart
        chartType="ColumnChart"
        width="100%"
        height="500px"
        data={chartData}
        options={{
          title: year
            ? `Extra Runs in IPL ${year}`
            : "Overall Team Performance (All Seasons)",
          chartArea: { width: "70%" },
          hAxis: {
            title: "Teams",
            titleTextStyle: { color: "#333" },
            slantedText: true,
            slantedTextAngle: 45,
          },
          vAxis: {
            title: "Matches Count",
            minValue: 0,
          },
          legend: { position: "top" },
          colors: ["#8884d8", "#82ca9d"],
        }}
      />
    </div>
  );
};

export default ExtraRunsChart;
