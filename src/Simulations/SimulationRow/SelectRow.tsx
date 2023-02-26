import React from "react";
import { simulationStyles } from "../simulationStyles";


interface SelectRowProps {
  title: string,
  simulations: { [key: string]: any }[],
  updateSimulation: (index: number, label: string, value: string) => void,
  options: string[],
  label: string,
  style?: React.CSSProperties
}

export default function SelectRow({ title, simulations, updateSimulation, label, style, options }: SelectRowProps) {
  return (
    <section style={simulationStyles.row} >
      <div style={{ ...simulationStyles.leftCol, ...style }} >
        {title}
      </div>
      {simulations.map((simulation, index) => (
        <div key={index} style={simulationStyles.col}>
          <select onChange={(e)=>{updateSimulation(index, label, e.target.value)}} value={simulation.companyType}>
            {options.map(option => (
              <option value={option} key={option} >{option}</option>
            ))}
          </select>
        </div>
      ))}
    </section>
  )
}

