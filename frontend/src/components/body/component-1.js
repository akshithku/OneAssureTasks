import React from "react";
import "./body.css";
import hero2 from "../..//Assets/img-2.png";
function component() {
  return (
    <div className="compo-main">
      <div>
        <img id="compo-img" src={hero2} alt="l"></img>
      </div>
      <div className="compo-sub">
        <div className="compContainer">
          <h1 id="compo-h1">Unlock Premium Plans</h1>
        </div>
        <div className="pCompContainer">
          <p id="compo-para">
            Get exclusive access to a wide range of premium insurance plans
            tailored just for your unique needs. It’s time to protect yourself
            and your family from life’s unforeseen twists and turns.
          </p>
        </div>
      </div>
    </div>
  );
}

export default component;
