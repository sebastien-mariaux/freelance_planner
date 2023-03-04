import React from "react";
import { displayAmount } from "../simulationsHelper";
import { simulationStyles } from "../simulationStyles";

interface TextRowProps {
  title: string,
  simulations: { [key: string]: any }[],
  label: string,
  style?: React.CSSProperties
}

export default function TextRow({ title, simulations, label, style }: TextRowProps) {
  return (
    <section style={simulationStyles.row}>
      <div style={{ ...style, ...simulationStyles.leftCol }} >
        {title}
      </div>
      {simulations.map((simulation, index) => {
        const value = simulation[label]
        return (
        <div style={simulationStyles.col} key={index}>
          <div style={{...style, color: value < 0 ? 'red' : ''}} data-testid={label}>
            {displayAmount(value)}
          </div>
        </div>
      )})}
    </section>
  )
}