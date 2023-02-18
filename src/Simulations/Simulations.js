
import { useState } from 'react';
import { Simulation } from '../models/simulation';
import InputRow from './SimulationRow/InputRow';
import PercentTextRow from './SimulationRow/PercentTextRow';
import TextRow from './SimulationRow/TextRow';
import { simulationStyles } from './simulationStyles';

const styles = {
  endOfSection: {
    fontWeight: 'bold',
    borderBottom: '2px solid black',
    paddingBottom: '15px'
  },
  mainIndicator: {
    fontWeight: 'bold',
    fontSize: '1.2em'
  },
  titleButton: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: '25px'
  }
}

const defaultSimulations = [
  (new Simulation({
    name: '100% dividendes',
    dailyRate: 500,
    daysPerWeek: 5,
    weeksOff: 5,
    incomeTaxRate: 12
  })).serialize(),
  (new Simulation({
    name: 'Avec salaire',
    dailyRate: 500,
    daysPerWeek: 5,
    weeksOff: 5,
    incomeTaxRate: 12,
    monthlyNetSalary: 4750
  })).serialize(),
  (new Simulation({
    name: 'Mix salaire/dividendes',
    dailyRate: 500,
    daysPerWeek: 5,
    weeksOff: 5,
    incomeTaxRate: 10,
    monthlyNetSalary: 2000
  })).serialize(),
]

const incomes = [
  { label: 'yearlyIncome', title: 'CA annuel', style: styles.mainIndicator },
  { label: 'monthlyIncome', title: 'CA moyen mensuel', style: { fontWeight: 'bold', borderBottom: '2px solid black', paddingBottom: '15px' } },
];

const workload = [
  { label: 'name', title: 'Titre', style: styles.mainIndicator },
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
  // { label: 'dividend', title: 'Dividende versé', style: {} },
  // { label: 'netResult', title: 'Résultat net', style: { ...styles.mainIndicator, ...styles.endOfSection } },
  // { label: 'managerMonthlyIncome', title: 'Revenu mensuel moyen du dirigeant', style: { fontWeight: 'bold', fontSize: '1.2rem' } },
]

const managerIncomes = [
  { label: 'yearlyNetSalary', title: 'Salaire annuel net', style: {} },
  { label: 'incomeTax', title: 'IR (estimation)', style: {} },
  { label: 'netDividend', title: 'Dividende perçu', style: {} },
  { label: 'managerYearlyIncome', title: 'Revenu annuel ', style: { fontWeight: 'bold' } },
  { label: 'managerMonthlyIncome', title: 'Revenu mensuel moyen', style: { ...styles.endOfSection, ...styles.mainIndicator } },
]


export default function Simulations() {
  const savedSimulations = JSON.parse(localStorage.getItem('simulations'));
  const [simulations, setSimulations] = useState(savedSimulations || defaultSimulations);


  const updateSimulation = (index, label, value) => {
    let newSimulations = simulations.map(simulation => new Simulation(simulation));
    newSimulations[index][label] = value;
    newSimulations = newSimulations.map(simulation => simulation.serialize());
    setSimulations([...newSimulations]);
  }

  const saveSimulations = () => {
    localStorage.setItem('simulations', JSON.stringify(simulations));
    alert("Les données ont bien été enregistrées")
  }

  const resetSimulations = () => {
    localStorage.removeItem('simulations');
    setSimulations(defaultSimulations);
  }

  const displayRow = (label, title, style, type) => {
    const RowCompoment = {
      'text': TextRow,
      'input': InputRow,
      'percent': PercentTextRow,
    }[type || 'text'];

    return (
      <RowCompoment
        key={label}
        title={title}
        updateSimulation={updateSimulation}
        simulations={simulations}
        label={label}
        style={style}
      />
    )
  }

  return (
    <div className='simulations'>
      <div style={{ display: 'flex' }}>
        <h2>SASU</h2>
        <button
          style={styles.titleButton}
          onClick={() => setSimulations([...simulations, (new Simulation()).serialize()])}
        >
          Ajouter une simulation
        </button>
        <button
          style={styles.titleButton}
          onClick={saveSimulations}
        >
          Enregistrer les données
        </button>
        <button
          style={styles.titleButton}
          onClick={resetSimulations}
        >
          Réinitialiser les données
        </button>
      </div>

      <div className='div'>
        <h3>Revenus</h3>
        {workload.map((w) => (
          displayRow(w.label, w.title, w.style, 'input')
        ))}
        {incomes.map((income) => (
          displayRow(income.label, income.title, income.style, 'text')
        ))}

        <h3>Charges</h3>
        {displayRow('yearlyExpenses', 'Charges annuelles', {}, 'input')}
        {displayRow('monthlyNetSalary', 'Salaire net mensuel (avant IR)', {}, 'input')}
        {salaries.map((salary, index) => (
          displayRow(salary.label, salary.title, salary.style, 'text')
        ))}
        {displayRow(
          'yearlyTotalCost',
          'Total des charges',
          { fontWeight: 'bold', borderBottom: '2px solid black', paddingBottom: '15px' },
          'text'
        )}

        <h3>Soldes</h3>
        {totals.map((expense) => (
          displayRow(expense.label, expense.title, expense.style, 'text')
        ))}
        {displayRow("percentDividend", "Pourcentage de divende", {}, 'input')}
        {displayRow("dividend", "Dividende versé", {}, 'text')}
        {displayRow("netResult", "Résultat net", { fontWeight: 'bold' }, 'text')}

        <h3>Revenus dirigeant.e</h3>
        {displayRow('incomeTaxRate', "Taux d'IR", {}, 'input')}
        {managerIncomes.map((expense) => (
          displayRow(expense.label, expense.title, expense.style, 'text')
        ))}
        {displayRow('manageIncomeRevenuRatio', 'Ratio revenu / CA', { fontWeight: 'bold' }, 'percent')}

        <section style={simulationStyles.row}>
          <div style={{ ...simulationStyles.leftCol }} ></div>
          {simulations.map((simulation, index) => (
            <div key={index} style={simulationStyles.col} >
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

    </div>
  )
}
