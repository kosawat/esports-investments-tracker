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
      <h1 className="h1-header">Esports Investments Tracker</h1>

      <table className="table">
        <thead>
          <tr className="table-dark">
            <th scope="col">Date</th>
            <th scope="col">Sectors</th>
            <th scope="col">Investment Type</th>
            <th scope="col">Investee</th>
            <th scope="col">Investors</th>
            <th scope="col">Amount</th>
          </tr>
        </thead>
        <tbody>
          {!loading
            ? investments.map((investment, i) => (
                <tr key={i}>
                  <td>
                    {moment(investment.date).format('DD/MM/YYYY')}
                  </td>
                  <td>{investment.sectors.join(', ')}</td>
                  <td>{investment.investmenttype}</td>
                  <td>{investment.investee}</td>
                  <td>{investment.investors.join(', ')}</td>
                  <td>{investment.amount || 'Undisclosed'}</td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
