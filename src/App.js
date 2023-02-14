import { useState } from 'react';
import './App.css';
import { Simulation } from './models/simulation';

const WEEKS_IN_YEAR = 52;



const defaultSimulations = [
  (new Simulation()).serialize(),
  (new Simulation()).serialize()
]


const fields = [
 {label: 'name', title: 'Titre', style: {}},
 {label: 'dailyRate', title: 'TJM', style: {}},
 {label: 'daysPerWeek', title: 'Jours par semaine', style: {}},
 {label: 'weeksOff', title: 'Semaines off', style: {}},
 {label: 'weeksOn', title: 'Semaines travaillées', style: {}},
 {label: 'yearlyIncome', title: 'CA annuel', style: {fontWeight: 'bold', fontSize: '1.2em'}},
 {label: 'monthlyIncome', title: 'CA moyen mensuel', style: {fontWeight:'bold', borderBottom: '2px solid black', paddingBottom: '15px'  }},
];

const expenses = [
 {label: 'charges', title: 'Charges', style: {fontWeight: 'bold', fontSize: '1.2em'}},
]

function ControlledField({ field, simulation, fieldIndex, simulationIndex, updateSimulation, checker }) {
  const [isError, setIsError] = useState(false)

  const onChange = (e) => {
    if (checker(e.target.value)) {
      setIsError(false)
      updateSimulation(simulationIndex, field, e.target.value)
    } else {
      setIsError(true)
    }
  }

  return (
    <div
      style={{ gridColumn: simulationIndex + 2, gridRow: fieldIndex + 1 }}
      className={field.label}
    >
      <input type="text"
        defaultValue={simulation[field.label]}
        onChange={onChange}
        style={{ color: isError ? 'red' : 'inherit' }}
      />
    </div>
  )
}

const checkDaysPerWeek = (value) => {
  if (value < 0 || value > 7) {
    return false
  }
  return true
}

function App() {
  const [simulations, setSimulations] = useState(defaultSimulations);

  const updateSimulation = (index, field, value) => {
    let newSimulations = simulations.map(simulation => new Simulation(simulation));
    newSimulations[index][field.label] = value;
    newSimulations = newSimulations.map(simulation => simulation.serialize());
    console.log(newSimulations)
    setSimulations([...newSimulations]);
  }

  const displayField = (field, simulation, fieldIndex, simulationIndex) => {
    switch (field.label) {
      case 'daysPerWeek':
        return (<ControlledField
          key={`${fieldIndex}-${simulationIndex}`}
          field={field}
          simulation={simulation}
          fieldIndex={fieldIndex}
          simulationIndex={simulationIndex}
          updateSimulation={updateSimulation}
          checker={checkDaysPerWeek}
        />)
        case 'yearlyIncome':
        case 'monthlyIncome':
          return (
            <div
              key={`${fieldIndex}-${simulationIndex}`}
              style={{ ...field.style, gridColumn: simulationIndex + 2, gridRow: fieldIndex + 1 }}
              className={field.label}
            >
              {simulation[field.label]}
            </div>
          )

      default:
        console.log({ ...field.style, gridColumn: simulationIndex + 2, gridRow: fieldIndex + 1 })
        return (
          <div
            key={`${fieldIndex}-${simulationIndex}`}
            style={{ ...field.style, gridColumn: simulationIndex + 2, gridRow: fieldIndex + 1 }}
            className={field.label}
          >
            <input type="text"
              value={simulation[field.label]}
              onChange={(e) => updateSimulation(simulationIndex, field, e.target.value)}
            />
          </div>
        )
    }
  }







  return (
    <>
      <h1>STARTUP PLANNER</h1>
      <h2>SASU</h2>
      <h3>Revenus</h3>

      <div className="wrapper" style={styles.wrapper}>
        {fields.map((field, index) => (
          <div key={index} style={{...field.style, gridColumn: 1, gridRow: index + 1 }} className={field.label}>
            {field.title}
          </div>
        ))}
        < h3>Charges</h3>
        {expenses.map((expense, index) => (
          <div key={index} style={{ gridColumn: 1, gridRow: index + fields.length + 1 + 1 }} className={expense.label}>
            {expense.title}
          </div>
        ))}


        {simulations.map((simulation, simulationIndex) => (
          fields.map((field, fieldIndex) => {
            return displayField(field, simulation, fieldIndex, simulationIndex)
          })
        ))}
      </div>
    </>
  )
}

const styles = {
  wrapper: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridGap: "10px",
    // gridAutoRows: "minmax(100px, auto)"
  }
}

export default App;
