import React, { useEffect, useState } from "react";
// import { useState } from "react";
import { simulationStyles } from "../simulationStyles";


interface InputRowProps {
  title: string,
  simulations: Object[],
  updateSimulation: (index: number, label: string, value: string) => void,
  label: string,
  style?: React.CSSProperties,
  highlight?: boolean
}

export default function InputRow({ title, simulations, updateSimulation, label, style, highlight=false }: InputRowProps) {
  return (
    <section style={simulationStyles.row} >
      <div style={{ ...simulationStyles.leftCol, ...style }} >
        {title}
      </div>
      {simulations.map((simulation, index) => (
        <SingleInput
          key={index}
          simulation={simulation}
          index={index}
          label={label}
          updateSimulation={updateSimulation}
          highlight={highlight}
           />
      ))}
    </section>
  )
}

interface SingleInputProps {
  simulation: { [key: string]: any },
  index: number,
  label: string,
  style?: React.CSSProperties,
  updateSimulation: (index: number, label: string, value: string) => void,
  highlight?: boolean
}

function SingleInput({ simulation, index, label, style = {}, updateSimulation, highlight }: SingleInputProps) {
  const [value, setValue] = useState(simulation[label]);
  useEffect(() => {
    setValue(simulation[label]);
  }, [simulation, label])


  const extraStyle = highlight ? { backgroundColor: 'antiquewhite'} : {};
  return (
    <div key={index} style={simulationStyles.col} >
      <input
        data-testid={label}
        style={{ width: '100%', ...style, ...extraStyle }}
        type="text" inputMode="numeric"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={(e) => updateSimulation(index, label, e.target.value)}
      />
    </div>
  )
}

