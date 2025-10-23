import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import axios from 'axios';

function MatchesWonStacked() {
  const [data, setData] = useState([['Team', 'Loading...']]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/matches-won/')
      .then(res => {
        if (!res.data || res.data.length === 0) return;

        
        const seasons = [...new Set(res.data.map(i => i.season))].sort((a,b)=>a-b);
      
        const teams = [...new Set(res.data.map(i => i.winner))].sort();

        const table = {};
        teams.forEach(team => {
          table[team] = {};
          seasons.forEach(season => {
            const record = res.data.find(r => r.season === season && r.winner === team);
            table[team][season] = record ? Number(record.wins) : 0;
          });
        });

        const chartData = [['Team', ...seasons.map(s => s.toString())]];
        teams.forEach(team => {
          const row = [team, ...seasons.map(season => table[team][season])];
          chartData.push(row);
        });

        setData(chartData);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const options = {
    title: 'Matches Won by Teams Over IPL Seasons',
    chartArea: { width: '65%', height: '70%' },
    isStacked: true,
    hAxis: {
      title: 'Matches Won',
      minValue: 0,
    },
    vAxis: {
      title: 'Team',
    },
    colors: ['#3366cc','#dc3912','#ff9900','#109618','#990099','#0099c6','#dd4477','#66aa00','#b82e2e','#316395'],
    legend: { position: 'top', maxLines: 3 },
    bar: { groupWidth: '70%' },
  };

  return (
    <div style={{ overflowX: 'auto' }}>
      {loading ? (
        <div>Loading chart...</div>
      ) : (
        <Chart
          chartType="BarChart" 
          width={`${Math.max(1000, data[0].length * 100)}px`}
          height={`${data.length * 50}px`}
          data={data}
          options={options}
          loader={<div>Loading chart...</div>}
        />
      )}
    </div>
  );
}

export default MatchesWonStacked;
