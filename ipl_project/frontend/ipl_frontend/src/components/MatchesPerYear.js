import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import axios from 'axios';

function MatchesPerYear() {
  const [data, setData] = useState([['Year', 'Matches']]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/matches-per-year/')
      .then(res => {
        const chartData = [['Year', 'Matches']];
        res.data.forEach(item => {
          chartData.push([Number(item.season), Number(item.total_matches)]);
        });
        setData(chartData);
      })
      .catch(err => console.error(err));
  }, []);

  const options = {
    title: 'Matches Per Year',
    legend: { position: 'none' },
    colors: ['#007bff'],
  };

  return <Chart chartType="ColumnChart" width="100%" height="400px" data={data} options={options} />;
}

export default MatchesPerYear;
