import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import axios from 'axios';

function ExtraRuns() {
  const [year, setYear] = useState('');
  const [data, setData] = useState([['Team', 'Extra Runs']]);
  const [allData, setAllData] = useState([]); 

  
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/extra-runs/');
        setAllData(res.data);
        const chartData = [['Team', 'Extra Runs']];
        
       
        const teamData = {};
        res.data.forEach(item => {
          const team = item.bowling_team;
          teamData[team] = (teamData[team] || 0) + item.extra_runs;
        });

        Object.entries(teamData).forEach(([team, runs]) => {
          chartData.push([team, runs]);
        });

        setData(chartData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAllData();
  }, []);

 
  const loadData = async () => {
    try {
      const url = year
        ? `http://127.0.0.1:8000/api/extra-runs/${year}/`
        : 'http://127.0.0.1:8000/api/extra-runs/';
      const res = await axios.get(url);
      const chartData = [['Team', 'Extra Runs']];
      res.data.forEach(i => chartData.push([i.bowling_team, i.extra_runs]));
      setData(chartData);
    } catch (err) {
      console.error(err);
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
          <button className="btn btn-primary w-100" onClick={loadData}>
            {year ? 'Filter Year' : 'Show All'}
          </button>
        </div>
      </div>

      <Chart
        chartType="BarChart"
        width="100%"
        height="500px"
        data={data}
        options={{
          title: year
            ? `Extra Runs Conceded by Teams (${year})`
            : 'Extra Runs Conceded by Teams (All Seasons)',
          legend: { position: 'none' },
          colors: ['#dc3545'],
          chartArea: { width: '70%', height: '70%' },
          hAxis: { title: 'Extra Runs', minValue: 0 },
          vAxis: { title: 'Team' },
        }}
        loader={<div>Loading chart...</div>}
      />
    </div>
  );
}

export default ExtraRuns;
