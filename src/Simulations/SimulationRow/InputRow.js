import { simulationStyles } from "../simulationStyles";

export default function InputRow({ title, simulations, updateSimulation, label }) {
  return (
    <section style={simulationStyles.row} >
      <div style={simulationStyles.leftCol} >
        {title}
      </div>
      {simulations.map((simulation, index) => (
        <div key={index} style={simulationStyles.col}>
          <input
            style={{ width: '100%' }}
            type="text" inputMode="numeric"
            value={simulation[label]}
            onChange={(e) => updateSimulation(index, label, e.target.value)}
          />
        </div>
      ))}
    </section>
  )
}

