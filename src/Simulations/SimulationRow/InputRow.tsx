import React, { useEffect, useState } from "react";
// import { useState } from "react";
import { simulationStyles } from "../simulationStyles";
import DisplayTitle from "./DisplayTitle";


interface InputRowProps {
  title: JSX.Element | string,
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
        <DisplayTitle title={title} />
      </div>
      {simulations.map((simulation, index) => (
        <SingleInput
          key={index}
          data={simulation}
          index={index}
          label={label}
          updateData={updateSimulation}
          highlight={highlight}
           />
      ))}
    </section>
  )
}

interface SingleInputProps {
  data: { [key: string]: any },
  index: number,
  label: string,
  style?: React.CSSProperties,
  updateData: (index: number, label: string, value: string) => void,
  highlight?: boolean
}

export function SingleInput({ data, index, label, style = {}, updateData, highlight }: SingleInputProps) {
  const [value, setValue] = useState(data[label]);
  useEffect(() => {
    setValue(data[label]);
  }, [data, label])


  const extraStyle = highlight ? { backgroundColor: 'antiquewhite'} : {};
  return (
    <div key={index} style={simulationStyles.col} >
      <input
        data-testid={label}
        style={{ width: '100%', ...style, ...extraStyle }}
        type="text" inputMode="numeric"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={(e) => updateData(index, label, e.target.value)}
      />
    </div>
  )
}

