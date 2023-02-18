import { displayAmount } from "../simulationsHelper";
import { simulationStyles } from "../simulationStyles";

export default function TextRow({ title, simulations, label, style }) {
  return (
    <section style={simulationStyles.row}>
      <div style={{ ...style, ...simulationStyles.leftCol }} >
        {title}
      </div>
      {simulations.map((simulation, index) => {
        const value = simulation[label]
        return (
        <div style={simulationStyles.col} key={index}>
          <div style={{...style, color: value < 0 ? 'red' : ''}}>
            {displayAmount(value)}
          </div>
        </div>
      )})}
    </section>
  )
}