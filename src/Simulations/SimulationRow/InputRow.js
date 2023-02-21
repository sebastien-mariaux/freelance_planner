import { useState } from "react";
import { simulationStyles } from "../simulationStyles";

export default function InputRow({ title, simulations, updateSimulation, label, style }) {
  return (
    <section style={simulationStyles.row} >
      <div style={{ ...simulationStyles.leftCol, ...style }} >
        {title}
      </div>
      {simulations.map((simulation, index) => (
        <SingleInput key={index} simulation={simulation} index={index} label={label} updateSimulation={updateSimulation} />
      ))}
    </section>
  )
}

function SingleInput({ simulation, index, label, style = {}, updateSimulation}) {
  const [value, setValue] = useState(simulation[label]);

  return (
    <div key={index} style={simulationStyles.col}>
      <input
        style={{ width: '100%', ...style }}
        type="text" inputMode="numeric"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={(e) => updateSimulation(index, label, e.target.value)}
      />
    </div>
  )
}

