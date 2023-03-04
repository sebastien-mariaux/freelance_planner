
import React from 'react';
import { useState } from 'react';
import { Simulation, SimulationData } from '../models/simulation';
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
  indicator: {
    fontWeight: 'bold'
  },
  titleButton: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: '25px'
  }
}

export const defaultSimulations = [
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

const getStoredData = (): SimulationData[] => {
  const jsonString = localStorage.getItem('simulations')
  if (jsonString) {
    return JSON.parse(jsonString);
  }
  return defaultSimulations;
}

export default function Simulations() {
  const [simulations, setSimulations] = useState(getStoredData);

  const duplicateSimulation = (simulation: SimulationData) => {
    let newSimulation = new Simulation(simulation);
    newSimulation.name = newSimulation.name + ' (copie)';
    setSimulations([...simulations, newSimulation.serialize()]);
  }

  const deleteSimulation = (index: number) => {
    let newSimulations = [...simulations];
    newSimulations.splice(index, 1);
    setSimulations(newSimulations);
  }

  const updateSimulation = (index: number, label: string, value: any) => {
    let newSimulations: any = simulations.map((simulation: SimulationData) => new Simulation(simulation));
    newSimulations[index][label] = value;
    newSimulations = newSimulations.map((simulation: Simulation) => simulation.serialize());
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
        <InputRow
          label='name'
          title='Titre'
          style={styles.mainIndicator}
          simulations={simulations}
          updateSimulation={updateSimulation}
        />
        <SelectRow
          label='companyType'
          simulations={simulations}
          updateSimulation={updateSimulation}
          title='Type de société'
          options={['SASU', 'EURL']}
        />

        <h3>Revenus</h3>
        <InputRow
          simulations={simulations}
          updateSimulation={updateSimulation}
          label='dailyRate'
          title='TJM'
        />
        <InputRow
          simulations={simulations}
          updateSimulation={updateSimulation}
          label='daysPerWeek'
          title='Jours par semaine'
        />
        <InputRow
          simulations={simulations}
          updateSimulation={updateSimulation}
          label='weeksOff'
          title='Semaines off'
        />
        <InputRow
          simulations={simulations}
          updateSimulation={updateSimulation}
          label='weeksOn'
          title='Semaines travaillées'
        />

        <TextRow
          label='yearlyRevenu'
          title='CA annuel'
          style={styles.indicator}
          simulations={simulations}
        />
        <TextRow
          label='monthlyRevenu'
          title='CA moyen mensuel'
          style={styles.endOfSection}
          simulations={simulations}
        />

        <h3>Charges</h3>
        <InputRow
          label='yearlyExpenses'
          title='Charges annuelles'
          simulations={simulations}
          updateSimulation={updateSimulation}
        />
        <InputRow
          label='monthlyNetSalary'
          title='Salaire net mensuel (avant IR)'
          simulations={simulations}
          updateSimulation={updateSimulation}
        />

        <TextRow
          label='yearlyChargedSalary'
          title='Salaire annuel chargé'
          simulations={simulations}
        />
        <TextRow
          label='yearlySalaryCotisations'
          title='Cotisations sur salaire'
          simulations={simulations}
        />

        <TextRow
          label='yearlyTotalCost'
          title='Total des charges'
          style={styles.endOfSection}
          simulations={simulations}
        />

        <h3>Soldes</h3>
        <TextRow
          label='rawEarnings'
          title='Bénéfice brut'
          simulations={simulations}
        />
        <TextRow
          label='earningsTax'
          title="Impôts sur les sociétés"
          simulations={simulations}
        />
        <TextRow
          label='netEarnings'
          title='Bénéfice net'
          style={styles.endOfSection}
          simulations={simulations}
        />

        <h3>Affectation du résultat</h3>
        <InputRow
          label="percentDividend"
          title="Pourcentage de divende"
          simulations={simulations}
          updateSimulation={updateSimulation}
        />
        <TextRow
          simulations={simulations}
          label="dividend"
          title="Dividende chargé"
        />
        <TextRow
          simulations={simulations}
          label="dividendCotisations"
          title="Cotisations sur dividende"
        />
        <TextRow
          simulations={simulations}
          label="netResult"
          title="Résultat mis en réserve"
          style={styles.endOfSection}
        />

        <h3>Revenus dirigeant.e</h3>
        <InputRow
          label='incomeTaxRate'
          title="Taux d'IR"
          simulations={simulations}
          updateSimulation={updateSimulation}
        />

        <TextRow
          label='yearlyNetSalary'
          title='Salaire annuel net'
          simulations={simulations}
        />
        <TextRow
          label='incomeTax'
          title="IR sur salaire (estimation)"
          simulations={simulations}
        />
        <TextRow
          label='netDividend'
          title='Dividende reçu'
          simulations={simulations}
        />
        <TextRow
          label='incomeTaxOnDividend'
          title='IR sur dividendes (taux fixe 12.8)'
          simulations={simulations}
        />
        <TextRow
          label='managerYearlyRevenu'
          title='Revenu annuel '
          style={{ fontWeight: 'bold' }}
          simulations={simulations}
        />
        <TextRow
          label='managerMonthlyRevenu'
          title='Revenu mensuel moyen'
          style={{ ...styles.endOfSection, ...styles.mainIndicator }}
          simulations={simulations}
        />
        <PercentTextRow
          label='manageIncomeRevenuRatio'
          title='Ratio revenu / CA'
          style={{ fontWeight: 'bold' }}
          simulations={simulations}
        />

        <section style={simulationStyles.row}>
          <div style={{ ...simulationStyles.leftCol }} ></div>
          {simulations.map((simulation: SimulationData, index: number) => (
            <div key={index} style={simulationStyles.col} >
              <button onClick={() => duplicateSimulation(simulation)} >
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
