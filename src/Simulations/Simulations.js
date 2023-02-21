
import { useState } from 'react';
import { Simulation } from '../models/simulation';
import InputRow from './SimulationRow/InputRow';
import PercentTextRow from './SimulationRow/PercentTextRow';
import SelectRow from './SimulationRow/SelectRow';
import TextRow from './SimulationRow/TextRow';
import { simulationStyles } from './simulationStyles';

const styles = {
  endOfSection: {
    fontWeight: 'bold',
    borderBottom: '2px solid black',
    paddingBottom: '5px'
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
    companyType: 'SASU',
    name: 'SASU 100% dividendes',
    dailyRate: 500,
    daysPerWeek: 5,
    weeksOff: 10,
    incomeTaxRate: 20
  })).serialize(),
  (new Simulation({
    companyType: 'EURL',
    name: 'EURL',
    dailyRate: 500,
    daysPerWeek: 5,
    weeksOff: 10,
    incomeTaxRate: 20,
    monthlyNetSalary: 4500
  })).serialize(),

]



export default function Simulations() {
  const savedSimulations = JSON.parse(localStorage.getItem('simulations'));
  const [simulations, setSimulations] = useState(savedSimulations || defaultSimulations);

  const duplicateSimulation = (simulation) => {
    let newSimulation = new Simulation(simulation);
    newSimulation.name = newSimulation.name + ' (copie)';
    setSimulations([...simulations, newSimulation.serialize()]);
  }

  const deleteSimulation = (index) => {
    let newSimulations = [...simulations];
    newSimulations.splice(index, 1);
    setSimulations(newSimulations);
  }

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

  const DisplayRow = ({ label, title, style = {}, type, options }) => {
    const RowCompoment = {
      'text': TextRow,
      'input': InputRow,
      'percent': PercentTextRow,
      'select': SelectRow,
    }[type || 'text'];

    return (
      <RowCompoment
        key={label}
        title={title}
        updateSimulation={updateSimulation}
        simulations={simulations}
        label={label}
        options={options}
        style={style}
      />
    )
  }


  return (
    <div className='simulations'>
      <div style={{ display: 'flex' }}>
        <h2>Comparateur</h2>
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



      <div >
        <DisplayRow label='name' title='Titre' style={styles.mainIndicator} type='input' />
        <DisplayRow label='companyType' title='Type de société' type='select' options={['SASU', 'EURL']} />

        <h3>Revenus</h3>
        <DisplayRow label='dailyRate' title='TJM' type='input' />
        <DisplayRow label='daysPerWeek' title='Jours par semaine' type='input' />
        <DisplayRow label='weeksOff' titl6e='Semaines off' type='input' />
        <DisplayRow label='weeksOn' title='Semaines travaillées' type='input' />

        <DisplayRow label='yearlyRevenu' title='CA annuel' style={styles.mainIndicator} type='text' />
        <DisplayRow
          label='montlyRevenu'
          title='CA moyen mensuel'
          style={styles.endOfSection}
          type='text'
        />

        <h3>Charges</h3>
        <DisplayRow label='yearlyExpenses' title='Charges annuelles' type='input' />
        <DisplayRow label='monthlyNetSalary' title='Salaire net mensuel (avant IR)' type='input' />

        <DisplayRow label='yearlyNetSalary' title='Salaire net annuel' type='text' />
        <DisplayRow label='yearlySalaryCotisations' title='Cotisations sur salaire' type='text' />

        <DisplayRow
          label='yearlyTotalCost'
          title='Total des charges'
          style={styles.endOfSection}
          type='text' />

        <h3>Soldes</h3>
        <DisplayRow label='rawEarnings' title='Bénéfice brut' type='text' />
        <DisplayRow label='earningsTax' title="Impôts sur les sociétés" type='text' />
        <DisplayRow label='netEarnings' title='Bénéfice net' styles={styles.endOfSection} type='text' />

        <h3>Affectation du résultat</h3>
        <DisplayRow label="percentDividend" title="Pourcentage de divende" type='input' />
        <DisplayRow label="netDividend" title="Dividende versé" type='text' />
        <DisplayRow label="dividendCotisations" title="Cotisations sur dividende" type='text' />
        <DisplayRow label="netResult" title="Résultat mis en réserve" style={styles.endOfSection} type='text' />

        <h3>Revenus dirigeant.e</h3>
        <DisplayRow label='incomeTaxRate' title="Taux d'IR" type='input' />

        <DisplayRow label='yearlyNetSalary' title='Salaire annuel net' type='text' />
        <DisplayRow label='incomeTax' title="IR sur salaire (estimation)" type='text' />
        <DisplayRow label='netDividend' title='Dividende reçu' type='text' />
        <DisplayRow label='incomeTaxOnDividend' title='IR sur dividendes (taux fixe 12.8)' type='text' />
        <DisplayRow label='manageryearlyRevenu' title='Revenu annuel ' style={{ fontWeight: 'bold' }} type='text' />
        <DisplayRow label='managermontlyRevenu' title='Revenu mensuel moyen' style={{ ...styles.endOfSection, ...styles.mainIndicator }} type='text' />

        <DisplayRow label='manageIncomeRevenuRatio' title='Ratio revenu / CA' style={{ fontWeight: 'bold' }} type='percent' />

        <section style={simulationStyles.row}>
          <div style={{ ...simulationStyles.leftCol }} ></div>
          {simulations.map((simulation, index) => (
            <div key={index} style={simulationStyles.col} >
              <button onClick={duplicateSimulation} >
                Dupliquer
              </button>
              <button onClick={() => deleteSimulation(index)} >
                Supprimer
              </button>
            </div>
          ))}
        </section>
      </div>

    </div>
  )
}
