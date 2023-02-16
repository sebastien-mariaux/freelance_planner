import { useState } from 'react';
import './App.css';
import { Simulation } from './models/simulation';

const defaultSimulations = [
  (new Simulation()).serialize(),
]

const incomes = [
  { label: 'yearlyIncome', title: 'CA annuel', style: { fontWeight: 'bold', fontSize: '1.2em' } },
  { label: 'monthlyIncome', title: 'CA moyen mensuel', style: { fontWeight: 'bold', borderBottom: '2px solid black', paddingBottom: '15px' } },
];

const workload = [
  // { label: 'name', title: 'Titre', style: {} },
  { label: 'dailyRate', title: 'TJM', style: {} },
  { label: 'daysPerWeek', title: 'Jours par semaine', style: {} },
  { label: 'weeksOff', title: 'Semaines off', style: {} },
  { label: 'weeksOn', title: 'Semaines travaillées', style: {} },
]

const expenses = [
  { label: 'dailyFoodCost', title: 'Prix moyen repas', style: {} },
  { label: 'yearlyFoodCost', title: 'Coût annuel repas', style: {} },
  { label: 'yearlyRent', title: 'Coût annuel loyer', style: {} },
  { label: 'yearlyAccountingCost', title: 'Coût annuel comptabilité', style: {} },
  { label: 'yearlyPhoneCost', title: 'Coût annuel téléphone', style: {} },
  { label: 'yearlyProInsuranceCost', title: 'Coût annuel RC Pro', style: {} },
  { label: 'yearlyOtherInsuranceCost', title: 'Coût annuel autres assurances', style: {} },
  { label: 'yearlyBankingCost', title: 'Frais bancaires annuels', style: {} },
  { label: 'yearlyFurnitureCost', title: 'Coût annuel fournitures', style: {} },
  { label: 'yearlyOtherCost', title: 'Autres coûts annuels', style: {} },
]

const repayableFees = [
  { label: 'yearlyRentRepayed', title: 'Remboursement loyer', style: {} },
  { label: 'yearlyInternetCostRepayed', title: 'Remboursement internet', style: {} },
  { label: 'yearlyPowerCostRepayed', title: 'Remboursement électricité', style: {} },
]

const totalExpenses = [
  { label: 'yearlyTotalCost', title: 'Total des charges', style: { fontWeight: 'bold', fontSize: '1.2em' } },
  { label: 'montlyAverageCost', title: 'Charges moyennes mensuelles', style: { fontWeight: 'bold', borderBottom: '2px solid black', paddingBottom: '15px' } },
]

const salaries = [
  { label: 'yearlyNetSalary', title: 'Salaire annuel net', style: {fontWeight: 'bold' } },
  { label: 'yearlyRawSalary', title: 'Salaire annuel chargé', style: {fontWeight: 'bold' } },
]


const totals = [
  { label: 'rawEarnings', title: 'Bénéfice brut', style: {} },
  { label: 'earningsTax', title: 'Impôts sur les sociétés', style: {} },
  { label: 'netEarnings', title: 'Bénéfice net', style: { fontWeight: 'bold' } },
  { label: 'dividend', title: 'Dividende versé', style: {} },
  { label: 'netDividend', title: 'Dividende perçu', style: { fontWeight: 'bold' } },
  { label: 'netResult', title: 'Résultat net', style: { fontWeight: 'bold', fontSize: '1.2rem', borderBottom: '2px solid black', paddingBottom: '15px' } },
  { label: 'managerMonthlyIncome', title: 'Revenu mensuel moyen du dirigeant', style: { fontWeight: 'bold', fontSize: '1.2rem' } },
]

const ratios = [
  { label: 'manageIncomeRevenuRatio', title: 'Ratio revenu / CA', style: { fontWeight: 'bold' } },
]

const displayAmount = (amount) => {
  return amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
}

const displayPercent = (amount) => {
  return amount.toLocaleString('fr-FR', { style: 'percent', minimumFractionDigits: 2 });
}

function App() {
  const [simulations, setSimulations] = useState(defaultSimulations);

  const updateSimulation = (index, label, value) => {
    let newSimulations = simulations.map(simulation => new Simulation(simulation));
    newSimulations[index][label] = value;
    newSimulations = newSimulations.map(simulation => simulation.serialize());
    console.log(newSimulations)
    setSimulations([...newSimulations]);
  }

  return (
    <>
      <header style={{ textAlign: 'center' }}>
        <h1>FREELANCE PLANNER</h1>
      </header>
      <div style={{ margin: '50px' }}>

        <h2>SASU - paiement en dividendes</h2>

        <button
          onClick={() => setSimulations([...simulations, (new Simulation()).serialize()])}
        >
          Ajouter une simulation
        </button>

        <div>
          <h3>Revenus</h3>
          {workload.map((w, index) => (
            <section style={styles.row}>
              <div style={styles.leftCol}>
                {w.title}
              </div>
              {simulations.map((simulation, index) => (
                <div key={index} style={styles.col}>
                  <input
                    style={{ width: '100%' }}
                    type="text" inputmode="numeric"
                    value={simulation[w.label]}
                    onChange={(e) => updateSimulation(index, w.label, e.target.value)}
                  />
                </div>
              ))}
            </section>
          ))}

          {incomes.map((income, index) => (
            <section style={styles.row}>
              <div style={{ ...income.style, ...styles.leftCol }} >
                {income.title}
              </div>
              {simulations.map((simulation, index) => (
                <div key={index} style={styles.col} >
                  <div style={income.style}>
                    {displayAmount(simulation[income.label])}
                  </div>
                </div>
              ))}
            </section>
          ))}

          <h3>Charges</h3>
          {expenses.map((expense, index) => (
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
          <div style={{ height: '1em' }}></div>

          {totalExpenses.map((expense, index) => (
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
          ))}

          <h3>Salaire</h3>
          <section style={styles.row}>
            <div style={styles.leftCol} >
              Salaire net mensuel (avant IR)
            </div>
            {simulations.map((simulation, index) => (
              <div key={index} style={styles.col} >
                <input
                  style={{ width: '100%' }}
                  type="text"
                  value={simulation['monthlyNetSalary']}
                  onChange={(e) => updateSimulation(index, 'monthlyNetSalary', e.target.value)}
                />
              </div>
            ))}
          </section>
          {salaries.map((salary, index) => (
            <section style={styles.row}>
              <div style={{ ...salary.style, ...styles.leftCol }} >
                {salary.title}
              </div>
              {simulations.map((simulation, index) => (
                <div key={index} style={styles.col} >
                  <div style={salary.style}>
                    {displayAmount(simulation[salary.label])}
                  </div>
                </div>
              ))}
            </section>
          ))}


          <h3>Soldes</h3>

          {totals.map((expense, index) => (
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
          ))}
          {ratios.map((expense, index) => (
            <section style={styles.row}>
              <div style={{ ...expense.style, ...styles.leftCol }} >
                {expense.title}
              </div>
              {simulations.map((simulation, index) => (
                <div key={index} style={styles.col} >
                  <div style={expense.style}>
                    {displayPercent(simulation[expense.label])}
                  </div>
                </div>
              ))}
            </section>
          ))}
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

const styles = {
  col: {
    width: '150px',
    marginLeft: '1em',
    textAlign: 'right',
  },
  leftCol: {
    width: '250px',
  },
  row: {
    display: 'flex', flexDirection: 'row'
  }
}

export default App;
