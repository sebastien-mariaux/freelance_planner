import React from "react";
import { displayPercent } from "../simulationsHelper";
import { simulationStyles } from "../simulationStyles";


interface PercentTextRowProps {
  title: string,
  simulations: { [key: string]: any }[],
  label: string,
  style?: React.CSSProperties
}
export default function PercentTextRow({ title, simulations, label, style }: PercentTextRowProps) {
  return (
    <section style={simulationStyles.row} >
      <div style={{ ...style, ...simulationStyles.leftCol }} >
        {title}
      </div>
      {simulations.map((simulation, index) => (
        <div key={index} style={simulationStyles.col} >
          <div style={style}>
            {displayPercent(simulation[label])}
          </div>
        </div>
      ))}
    </section>
  )
}