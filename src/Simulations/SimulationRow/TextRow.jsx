import React from "react";
import { displayAmount } from "../simulationsHelper";
import { simulationStyles } from "../simulationStyles";
import DisplayTitle from "./DisplayTitle";
import { getDeepValue } from "../../helpers";

export default function TextRow({ title, simulations, label, style }) {
  return (
    <section style={simulationStyles.row}>
      <div style={{ ...style, ...simulationStyles.leftCol }}>
        <DisplayTitle title={title} />
      </div>
      {simulations.map((simulation, index) => {
        const value = getDeepValue(simulation, label);
        return (
          <div style={simulationStyles.col} key={index}>
            <div
              style={{ ...style, color: value < 0 ? "red" : "" }}
              data-testid={label}
            >
              {displayAmount(value)}
            </div>
          </div>
        );
      })}
    </section>
  );
}