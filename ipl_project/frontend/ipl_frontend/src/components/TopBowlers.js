import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import axios from 'axios';

function TopBowlers() {
  const [year, setYear] = useState('');
  const [data, setData] = useState([['Bowler', 'Economy']]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/economical-bowlers/');
        const chartData = [['Bowler', 'Economy']];
        res.data.forEach(i => chartData.push([i.bowler, i.economy]));
        setData(chartData);
      } catch (err) {
        console.error('Error fetching all bowlers:', err);
      }
    };
    fetchAllData();
  }, []);


  const loadData = async () => {
    try {
      const url = year
        ? `http://127.0.0.1:8000/api/economical-bowlers/${year}/`
        : 'http://127.0.0.1:8000/api/economical-bowlers/';
      const res = await axios.get(url);
      const chartData = [['Bowler', 'Economy']];
      res.data.forEach(i => chartData.push([i.bowler, i.economy]));
      setData(chartData);
    } catch (err) {
      console.error('Error fetching year data:', err);
    }
  };

  return (
    <div>
      <div className="mb-3 row align-items-center">
        <div className="col-md-3">
          <input
            type="number"
            className="form-control"
            placeholder="Enter Year"
            value={year}
            onChange={e => setYear(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <button className="btn btn-success w-100" onClick={loadData}>
            {year ? 'Filter Year' : 'Show All'}
          </button>
        </div>
      </div>

      <Chart
        chartType="BarChart"
        width="100%"
        height="500px"
        data={data}
        loader={<div>Loading chart...</div>}
        options={{
          title: year
            ? `Top Economical Bowlers (${year})`
            : 'Top Economical Bowlers (All Seasons)',
          legend: { position: 'none' },
          colors: ['#28a745'],
          hAxis: { title: 'Economy Rate', minValue: 0 },
          vAxis: { title: 'Bowler' },
          chartArea: { width: '70%', height: '70%' },
        }}
      />
    </div>
  );
}

export default TopBowlers;
