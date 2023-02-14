import { useState } from 'react';
import './App.css';
import { Simulation } from './models/simulation';

const WEEKS_IN_YEAR = 52;



const defaultSimulations = [
  (new Simulation()).serialize(),
]


const fields = [
  { label: 'name', title: 'Titre', style: {} },
  { label: 'dailyRate', title: 'TJM', style: {} },
  { label: 'daysPerWeek', title: 'Jours par semaine', style: {} },
  { label: 'weeksOff', title: 'Semaines off', style: {} },
  { label: 'weeksOn', title: 'Semaines travaillées', style: {} },
  { label: 'yearlyIncome', title: 'CA annuel', style: { fontWeight: 'bold', fontSize: '1.2em' } },
  { label: 'monthlyIncome', title: 'CA moyen mensuel', style: { fontWeight: 'bold', borderBottom: '2px solid black', paddingBottom: '15px' } },
];

const expenses = [
  { label: 'dailyFoodCost', title: 'Prix moyen repas', style: {} },
  { label: 'yearlyFoodCost', title: 'Coût annuel repas', style: {} },
  { label: 'yearlyRent', title: 'Coût annuel loyer', style: {} },
  { label: 'yearlyAccountingCost', title: 'Coût annuel comptabilité', style: {} },
  { label: 'yearlyInternetCost', title: 'Coût annuel internet', style: {} },
  { label: 'yearlyPhoneCost', title: 'Coût annuel téléphone', style: {} },
  { label: 'yearlyProInsuranceCost', title: 'Coût annuel RC Pro', style: {} },
  { label: 'yearlyOtherInsuranceCost', title: 'Coût annuel autres assurances', style: {} },
  { label: 'yearlyBankingCost', title: 'Frais bancaires annuels', style: {} },
  { label: 'yearlyFurnitureCost', title: 'Coût annuel fournitures', style: {} },
  { label: 'yearlyOtherCost', title: 'Autres coûts annuels', style: {} },
  { label: 'yearlyTotalCost', title: 'Total des charges', style: { fontWeight: 'bold', fontSize: '1.2em' } },
  { label: 'montlyAverageCost', title: 'Charges moyennes mensuelles', style: { fontWeight: 'bold', borderBottom: '2px solid black', paddingBottom: '15px' } },
]

const totals = [
  { label: 'rawIncome', title: 'Bénéfice brut', style: {} },
  { label: 'incomeTax', title: 'Impôts sur les sociétés', style: {} },
  { label: 'netIncome', title: 'Bénéfice net', style: { fontWeight: 'bold' } },
  { label: 'dividend', title: 'Dividende versé', style: {} },
  { label: 'netDividend', title: 'Dividende perçu', style: { fontWeight: 'bold' } },
  { label: 'managerMonthlyIncome', title: 'Revenu mensuel moyen du dirigeant', style: { fontWeight: 'bold', fontSize: '1.2rem' } },
  { label: 'manageIncomeRevenuRatio', title: 'Ratio revenu / CA', style: { fontWeight: 'bold' } },
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
      case 'yearlyTotalCost':
      case 'montlyAverageCost':
      case 'rawIncome':
      case 'incomeTax':
      case 'netIncome':
      case 'dividend':
      case 'netDividend':
      case 'managerMonthlyIncome':
      case 'manageIncomeRevenuRatio':
      case 'yearlyFoodCost':
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
          <div key={index} style={{ ...field.style, gridColumn: 1, gridRow: index + 1 }} className={field.label}>
            {field.title}
          </div>
        ))}
        < h3>Charges</h3>
        {expenses.map((expense, index) => (
          <div key={index} style={{ ...expense.style, gridColumn: 1, gridRow: index + fields.length + 1 + 1 }} className={expense.label}>
            {expense.title}
          </div>
        ))}
        {totals.map((total, index) => (
          <div key={index} style={{ ...total.style, gridColumn: 1, gridRow: index + fields.length + expenses.length + 1 + 1 }} className={total.label}>
            {total.title}
          </div>
        ))}


        {simulations.map((simulation, simulationIndex) => (
          fields.map((field, fieldIndex) => {
            return displayField(field, simulation, fieldIndex, simulationIndex)
          })
        ))}

        {simulations.map((simulation, simulationIndex) => (
          expenses.map((expense, expenseIndex) => {
            return displayField(expense, simulation, expenseIndex + fields.length + 1, simulationIndex)
          })
        ))}

        {simulations.map((simulation, simulationIndex) => (
          totals.map((total, totalIndex) => {
            return displayField(total, simulation, totalIndex + fields.length + expenses.length + 1, simulationIndex)
          })
        ))}
      </div>
    </>
  )
}

const styles = {
  wrapper: {
    display: "grid",
    // gridTemplateColumns: "repeat(3, 1fr)",
    gridGap: "2px",
    // gridAutoRows: "minmax(100px, auto)"
  }
}

export default App;
