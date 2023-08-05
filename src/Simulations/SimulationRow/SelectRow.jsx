import React from "react";
import { simulationStyles } from "../simulationStyles";
import { getDeepValue } from "../../helpers";

export default function SelectRow({
  title,
  simulations,
  updateSimulation,
  label,
  style,
  options,
}) {
  return (
    <section style={simulationStyles.row}>
      <div style={{ ...simulationStyles.leftCol, ...style }}>{title}</div>
      {simulations.map((simulation, index) => (
        <div key={index} style={simulationStyles.col}>
          <select
            onChange={(e) => {
              updateSimulation(index, label, e.target.value);
            }}
            value={getDeepValue(simulation, label)}
          >
            {options.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      ))}
    </section>
  );
}
