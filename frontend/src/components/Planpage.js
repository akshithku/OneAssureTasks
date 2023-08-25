import React, { useState,useEffect } from "react";
// import { useParams } from "react-router-dom";
import "./Planpage.css"
import Icon from "../Assets/icon.png"
function Planpage() {
  // const { id } = useParams();
  const [Age, setAge] = useState([]);
  const [SumInsured, setSumInsured] = useState(500000);
  const [CityTier, setCityTier] = useState("tier-1");
  const [Tenure, setTenure] = useState("1 yr");
  const [PremiumPlan, setPremiumplan] = useState([]);


useEffect(()=>{
  console.log(PremiumPlan)
},[PremiumPlan])

  const PremiumPrice = async () => {
    const response = await fetch("http://localhost:3000/premium", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        member_csv:Age, 
        tier:CityTier,
        price:SumInsured,
        // _id:id
      }),
    });

    const premiumlist = await response.json();
    setPremiumplan(premiumlist);
  };


  const AddedtoCart = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/addtocart/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response);
      if (response.ok) {
        // eslint-disable-next-line no-unused-vars
        const updatedData = await response.json();
        // Update the 'premium' state with the updated data
        setPremiumplan((prevPremium) => {
          const updatedPremium = prevPremium.map((data) => {
            if (data._id === id) {
              return { ...data, AddedtoCart: !data.AddedtoCart };
            }
            return data;
          });
          return updatedPremium;
        });
      } else {
        console.error('Failed to toggle added status');
      }
    } catch (error) {
      console.error('An error occurred while toggling added status', error);
    }
  };


  return (
      <div className="prem-main">
        <h2>Health Insurance Premium Calculator</h2>
        
        <div>
          <label>Select number of Insured Members: </label>
          <select value={Age} onChange={e => setAge(e.target.value)}>
            <option value={"1a"}>1 Adult</option>
            <option value={"2a"}>2 Adult</option>
          </select>
        </div>
        
        <div>
          <label>Sum Insured:</label>
          <select value={SumInsured} onChange={e => setSumInsured(parseInt(e.target.value, 10))}>
            <option value={500000}>500,000</option>
            <option value={700000}>700,000</option>
            <option value={1000000}>1000,000</option>
            <option value={1500000}>1500,000</option>
            <option value={2000000}>2000,000</option>
            <option value={2500000}>2500,000</option>
            <option value={3000000}>3000,000</option>
            <option value={4000000}>4000,000</option>
            <option value={5000000}>5000,000</option>
            <option value={6000000}>6000,000</option>
            <option value={7500000}>7500,000</option>
          </select>
        </div>
        <div>
        <label>City Tier:</label>
        <select value={CityTier} onChange={e => setCityTier(e.target.value)}>
          <option value="tier-1">Tier 1</option>
          {/* <option value="tier-2">Tier 2</option> */}
        </select>
      </div>
      
      <div>
        <label>Tenure:</label>
        <select value={Tenure} onChange={e => setTenure(e.target.value)}>
          <option >1 Year</option>
          {/* <option value="2 yr">2 Years</option> */}
        </select>
      </div>
      
      <button onClick={PremiumPrice}>Calculate Premium</button>

      <div className="prem-card-main">
      {PremiumPlan.map((data)=>{
        return (
      
          <div className="prem-card">
          <div className='prem-component'>
            <div className='prem-heading'>
            <h1 className='prem-age'>Age:{data.ageRange}</h1>
            <h3 className='prem-amount'>-/RS:{data.sumInsured}</h3>
            </div>
            
            <img onClick={()=>AddedtoCart()} className='cart' src={Icon} alt="l"></img>
          </div>
          </div>
          )
        })}
</div>
    </div>
  );
}

export default Planpage;
