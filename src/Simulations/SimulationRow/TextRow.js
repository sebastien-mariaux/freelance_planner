import { displayAmount } from "../simulationsHelper";
import { simulationStyles } from "../simulationStyles";

export default function TextRow({ title, simulations, label, style }) {
  return (
    <section style={simulationStyles.row}>
      <div style={{ ...style, ...simulationStyles.leftCol }} >
        {title}
      </div>
      {simulations.map((simulation, index) => (
        <div key={index} style={simulationStyles.col} >
          <div style={style}>
            {displayAmount(simulation[label])}
          </div>
        </div>
      ))}
    </section>
  )
}