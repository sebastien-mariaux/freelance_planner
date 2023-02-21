import { simulationStyles } from "../simulationStyles";

export default function SelectRow({ title, simulations, updateSimulation, label, style, options }) {
  return (
    <section style={simulationStyles.row} >
      <div style={{ ...simulationStyles.leftCol, ...style }} >
        {title}
      </div>
      {simulations.map((simulation, index) => (
        <div key={index} style={simulationStyles.col}>
          <select onChange={(e)=>{updateSimulation(index, label, e.target.value)}} value={simulation.companyType}>
            {options.map(option => (
              <option value={option} >{option}</option>
            ))}
          </select>
        </div>
      ))}
    </section>
  )
}

