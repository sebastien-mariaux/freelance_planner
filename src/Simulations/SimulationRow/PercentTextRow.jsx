import React from "react";
import { displayPercent } from "../simulationsHelper";
import { simulationStyles } from "../simulationStyles";
import { getDeepValue } from "../../helpers";



export default function PercentTextRow({ title, simulations, label, style }) {
  return (
    <section style={simulationStyles.row} >
      <div style={{ ...style, ...simulationStyles.leftCol }} >
        {title}
      </div>
      {simulations.map((simulation, index) => (
        <div key={index} style={simulationStyles.col} >
          <div style={style} data-testid={label} >
            {displayPercent(getDeepValue(simulation, label))}
          </div>
        </div>
      ))}
    </section>
  )
}