import React, { useState } from 'react';

function Planpage() {
    const [Age, setAge] = useState([]);
    const [SumInsured, setSumInsured] = useState(300000);
    const [CityTier, setCityTier] = useState('tier-1');
    const [Tenure, setTenure] = useState('1 yr');
    const [PremiumPlan, setPremiumplan] = useState(null);
  
    const calculatePremium = async () => {
      const response = await fetch('/premium', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          SumInsured,
          Age,
          CityTier,
          Tenure,
          PremiumPlan
        })
      });
  
      const data = await response.json();
      setPremiumplan(data.PremiumPlan);
    };
  
    return (
      <div>
        <h2>Health Insurance Premium Calculator</h2>
        
        <div>
    <label>Enter Ages of Insured Members (comma-separated):</label>
    <input
      type="text"
      value={Age.join(', ')}
      onChange={e => setAge(e.target.value.split(',').map(age => age.trim()))}
    />
  </div>
  
  
        
        <div>
          <label>Sum Insured:</label>
          <select value={SumInsured} onChange={e => setSumInsured(parseInt(e.target.value, 10))}>
            <option value={300000}>300000</option>
            <option value={400000}>400000</option>
            <option value={500000}>500000</option>
          </select>
        </div>
        
        <div>
          <label>City Tier:</label>
          <select value={CityTier} onChange={e => setCityTier(e.target.value)}>
            <option value="tier-1">Tier 1</option>
            <option value="tier-2">Tier 2</option>
          </select>
        </div>
        
        <div>
          <label>Tenure:</label>
          <select value={Tenure} onChange={e => setTenure(e.target.value)}>
            <option value="1 yr">1 Year</option>
            <option value="2 yr">2 Years</option>
          </select>
        </div>
        
        <button onClick={calculatePremium}>Calculate Premium</button>
        
        {PremiumPlan !== null && <p>Calculated Premium: {PremiumPlan}</p>}
      </div>)
}

export default Planpage