import React, { useEffect, useState } from "react";
import { simulationStyles } from "../simulationStyles";
import DisplayTitle from "./DisplayTitle";
import { getDeepValue } from "../../helpers";

export default function InputRow({
  title,
  simulations,
  updateSimulation,
  label,
  style,
}) {
  return (
    <section style={simulationStyles.row}>
      <div style={{ ...simulationStyles.leftCol, ...style }}>
        <DisplayTitle title={title} />
      </div>
      {simulations.map((simulation, index) => (
        <SingleInput
          key={index}
          data={simulation}
          index={index}
          label={label}
          updateData={updateSimulation}
        />
      ))}
    </section>
  );
}

export function SingleInput({
  data,
  index,
  label,
  style = {},
  updateData,
}) {
  const [value, setValue] = useState(data[label]);
  useEffect(() => {
    setValue(getDeepValue(data, label));
  }, [data, label]);


  const field = label.split(".").pop() || label;
  return (
    <div key={index} style={simulationStyles.col}>
      <input
        data-testid={label}
        style={{ width: "100%", ...style }}
        type="text"
        inputMode="numeric"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={(e) => updateData(index, field, e.target.value)}
      />
    </div>
  );
}
