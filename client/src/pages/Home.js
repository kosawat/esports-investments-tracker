import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

function Home() {
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = (await axios.get('/api/investments')).data;
        setInvestments(data);
        setLoading(false);
        console.log(data);
      } catch (error) {
        setError(true);
        console.log(error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="container">
      <h1 className="h1-text">Esports Investments Tracker</h1>
      <div className="row">
        <div className="col">Date</div>
        <div className="col">Sectors</div>
        <div className="col">Investment Type</div>
        <div className="col">Investee</div>
        <div className="col">Investors</div>
        <div className="col">Amount</div>
      </div>

      {!loading
        ? investments.map((investment, i) => (
            <div className="row" key={i}>
              <div className="col">
                {moment(investment.date).format('DD/MM/YYYY')}
              </div>
              <div className="col">{investment.sectors.join(', ')}</div>
              <div className="col">{investment.investmenttype}</div>
              <div className="col">{investment.investee}</div>
              <div className="col">{investment.investors.join(', ')}</div>
              <div className="col">{investment.amount || 'Undisclosed'}</div>
            </div>
          ))
        : null}
    </div>
  );
}

export default Home;
