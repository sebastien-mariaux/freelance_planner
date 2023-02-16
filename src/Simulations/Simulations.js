import { useState } from 'react';
import { Simulation } from '../models/simulation';
import InputRow from './SimulationRow/InputRow';
import PercentTextRow from './SimulationRow/PercentTextRow';
import TextRow from './SimulationRow/TextRow';


const styles = {
  endOfSection: {
    fontWeight: 'bold',
    borderBottom: '2px solid black',
    paddingBottom: '15px'
  },
  mainIndicator: {
    fontWeight: 'bold',
    fontSize: '1.2em'
  }
}

const defaultSimulations = [
  (new Simulation()).serialize(),
]

const incomes = [
  { label: 'yearlyIncome', title: 'CA annuel', style: styles.mainIndicator },
  { label: 'monthlyIncome', title: 'CA moyen mensuel', style: { fontWeight: 'bold', borderBottom: '2px solid black', paddingBottom: '15px' } },
];

const workload = [
  // { label: 'name', title: 'Titre', style: {} },
  { label: 'dailyRate', title: 'TJM', style: {} },
  { label: 'daysPerWeek', title: 'Jours par semaine', style: {} },
  { label: 'weeksOff', title: 'Semaines off', style: {} },
  { label: 'weeksOn', title: 'Semaines travaillées', style: {} },
]

// const expenses = [
//   { label: 'dailyFoodCost', title: 'Prix moyen repas', style: {} },
//   { label: 'yearlyFoodCost', title: 'Coût annuel repas', style: {} },
//   { label: 'yearlyRent', title: 'Coût annuel loyer', style: {} },
//   { label: 'yearlyAccountingCost', title: 'Coût annuel comptabilité', style: {} },
//   { label: 'yearlyPhoneCost', title: 'Coût annuel téléphone', style: {} },
//   { label: 'yearlyProInsuranceCost', title: 'Coût annuel RC Pro', style: {} },
//   { label: 'yearlyOtherInsuranceCost', title: 'Coût annuel autres assurances', style: {} },
//   { label: 'yearlyBankingCost', title: 'Frais bancaires annuels', style: {} },
//   { label: 'yearlyFurnitureCost', title: 'Coût annuel fournitures', style: {} },
//   { label: 'yearlyOtherCost', title: 'Autres coûts annuels', style: {} },
// ]

// const repayableFees = [
//   { label: 'yearlyRentRepayed', title: 'Remboursement loyer', style: {} },
//   { label: 'yearlyInternetCostRepayed', title: 'Remboursement internet', style: {} },
//   { label: 'yearlyPowerCostRepayed', title: 'Remboursement électricité', style: {} },
// ]

// const totalExpenses = [
//   { label: 'yearlyTotalCost', title: 'Total des charges', style: { fontWeight: 'bold', fontSize: '1.2em' } },
//   { label: 'monthlyExpenses', title: 'Charges moyennes mensuelles', style: { fontWeight: 'bold', borderBottom: '2px solid black', paddingBottom: '15px' } },
// ]

const salaries = [
  { label: 'yearlyNetSalary', title: 'Salaire annuel net', style: {} },
  { label: 'yearlyRawSalary', title: 'Salaire annuel chargé', style: {} },
]

const totals = [
  { label: 'rawEarnings', title: 'Bénéfice brut', style: {} },
  { label: 'earningsTax', title: 'Impôts sur les sociétés', style: {} },
  { label: 'netEarnings', title: 'Bénéfice net', style: { fontWeight: 'bold' } },
  { label: 'dividend', title: 'Dividende versé', style: {} },
  { label: 'netResult', title: 'Résultat net', style: { ...styles.mainIndicator, ...styles.endOfSection } },
  // { label: 'managerMonthlyIncome', title: 'Revenu mensuel moyen du dirigeant', style: { fontWeight: 'bold', fontSize: '1.2rem' } },
]

const managerIncomes = [
  { label: 'yearlyNetSalary', title: 'Salaire annuel net', style: {} },
  { label: 'incomeTax', title: 'IR (estimation)', style: {} },
  { label: 'netDividend', title: 'Dividende perçu', style: {} },
  { label: 'managerYearlyIncome', title: 'Revenu annuel ', style: { fontWeight: 'bold' } },
  { label: 'managerMonthlyIncome', title: 'Revenu mensuel moyen', style: { ...styles.endOfSection, ...styles.mainIndicator } },
]





export default function Simulations()  {
  const [simulations, setSimulations] = useState(defaultSimulations);

  const updateSimulation = (index, label, value) => {
    let newSimulations = simulations.map(simulation => new Simulation(simulation));
    newSimulations[index][label] = value;
    newSimulations = newSimulations.map(simulation => simulation.serialize());
    setSimulations([...newSimulations]);
  }


  return (
    <>
      <header style={{ textAlign: 'center' }}>
        <h1>FREELANCE PLANNER</h1>
      </header>
      <div style={{ margin: '50px' }}>
        <h2>SASU</h2>
        <button
          onClick={() => setSimulations([...simulations, (new Simulation()).serialize()])}
        >
          Ajouter une simulation
        </button>

        <div>
          <h3>Revenus</h3>
          {workload.map((w) => (
            <InputRow
              title={w.title}
              updateSimulation={updateSimulation}
              simulations={simulations}
              label={w.label}
            />
          ))}

          {incomes.map((income) => (
            <TextRow
              title={income.title}
              simulations={simulations}
              label={income.label}
              style={income.style}
            />
          ))}

          <h3>Charges</h3>
          {/* {expenses.map((expense, index) => (
            <section style={styles.row}>
              <div style={{ ...expense.style, ...styles.leftCol }} >
                {expense.title}
              </div>
              {simulations.map((simulation, index) => (
                <div key={index} style={styles.col} >
                  <input
                    style={{ width: '100%' }}
                    type="text"
                    value={simulation[expense.label]}
                    onChange={(e) => updateSimulation(index, expense.label, e.target.value)}
                  />
                </div>
              ))}
            </section>
          ))}


          <h4 style={{ marginBottom: '0', marginTop: '0.5em' }}>Frais remboursables</h4>
          <div style={{ fontSize: '0.75rem', fontStyle: 'italic', marginBottom: '0.5em' }}>
            *Frais avancés par l'employeur mais remboursables en partie. Indiquer le montant remboursé.
          </div>


          {repayableFees.map((expense, index) => (
            <section style={styles.row}>
              <div style={{ ...expense.style, ...styles.leftCol }} >
                {expense.title}
              </div>
              {simulations.map((simulation, index) => (
                <div key={index} style={styles.col} >
                  <input
                    style={{ width: '100%' }}
                    type="text"
                    value={simulation[expense.label]}
                    onChange={(e) => updateSimulation(index, expense.label, e.target.value)}
                  />
                </div>
              ))}
            </section>
          ))}
          <div style={{ height: '1em' }}></div> */}

          {/* {totalExpenses.map((expense, index) => (
            <section style={styles.row}>
              <div style={{ ...expense.style, ...styles.leftCol }} >
                {expense.title}
              </div>
              {simulations.map((simulation, index) => (
                <div key={index} style={styles.col} >
                  <div style={expense.style}>
                    {displayAmount(simulation[expense.label])}
                  </div>
                </div>
              ))}
            </section>
          ))} */}
          <InputRow
            title="Charges annuelles"
            simulations={simulations}
            label="yearlyExpenses"
            updateSimulation={updateSimulation}
          />
          {/* <section style={styles.row}>
            <div style={styles.leftCol} >
              Charges mensuelles moyennes
            </div>
            {simulations.map((simulation, index) => (
              <div key={index} style={styles.col} >

                <div >
                    {displayAmount(simulation['monthlyNetSalary'])}
                  </div>
              </div>
            ))}
          </section> */}

          <InputRow
            title="Salaire net mensuel (avant IR)"
            updateSimulation={updateSimulation}
            simulations={simulations}
            label="monthlyNetSalary"
          />

          {salaries.map((salary, index) => (
            <TextRow
              title={salary.title}
              simulations={simulations}
              label={salary.label}
              style={salary.style}
            />
          ))}
          <TextRow
            title="Total des charges"
            simulations={simulations}
            label="yearlyTotalCost"
            style={{ fontWeight: 'bold', borderBottom: '2px solid black', paddingBottom: '15px' }}
          />


          <h3>Soldes</h3>
          {totals.map((expense) => (
            <TextRow
              title={expense.title}
              simulations={simulations}
              label={expense.label}
              style={expense.style}
            />
          ))}

          <h3>Revenus dirigeant.e</h3>
          <InputRow
            title="Taux d'IR"
            updateSimulation={updateSimulation}
            simulations={simulations}
            label="incomeTaxRate"
          />

          {managerIncomes.map((expense) => (
            <TextRow
              title={expense.title}
              simulations={simulations}
              label={expense.label}
              style={expense.style}
            />
          ))}

          <PercentTextRow
            title='Ratio revenu / CA'
            simulations={simulations}
            label='manageIncomeRevenuRatio'
            style={{ fontWeight: 'bold' }}
          />
        </div>

        <section style={styles.row}>
          <div style={{ ...styles.leftCol }} ></div>
          {simulations.map((simulation, index) => (
            <div key={index} style={styles.col} >
              <button
                onClick={() => {
                  let newSimulation = new Simulation(simulation);
                  newSimulation.name = newSimulation.name + ' (copie)';
                  setSimulations([...simulations, newSimulation.serialize()]);
                }}
              >
                Dupliquer
              </button>
              <button
                onClick={() => {
                  let newSimulations = [...simulations];
                  newSimulations.splice(index, 1);
                  setSimulations(newSimulations);
                }}
              >
                Supprimer
              </button>
            </div>
          ))}
        </section>
      </div>
    </>
  )
}