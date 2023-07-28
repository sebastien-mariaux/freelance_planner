
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Simulation, SimulationData } from '../models/simulation';
import NavMenu from '../NavMenu/NavMenu';
import InputRow from './SimulationRow/InputRow';
import PercentTextRow from './SimulationRow/PercentTextRow';
import SelectRow from './SimulationRow/SelectRow';
import TextRow from './SimulationRow/TextRow';
import { simulationStyles } from './simulationStyles';
import { mainStyles } from '../mainStyles';
import { useLocation } from 'react-router-dom';
import { urlGet } from '../api/base';

const styles = {
  endOfSection: {
    fontWeight: 'bold',
    borderBottom: '2px solid black',
    paddingBottom: '5px',

  },
  mainIndicator: {
    fontWeight: 'bold',
    fontSize: '1.2em'
  },
  indicator: {
    fontWeight: 'bold'
  },
  indication: {
    fontStyle: 'italic',
    fontSize: '0.8em'
  },
  infoSection: {
    marginTop: '20px',
    fontStyle: 'italic',
    fontSize: '0.8em'
  }
}

const saveSimulations = (simulations: any[]) => {
  localStorage.setItem('simulations', JSON.stringify(simulations));
}

export const defaultSimulations = [
  (new Simulation({
    companyType: 'SASU',
    name: 'SASU',
    dailyRate: 500,
    daysPerWeek: 5,
    weeksOff: 10,
    monthlyRepayableExpenses: 50,
    monthlyTaxableRepayableExpenses: 300,
  })).serialize(),
  (new Simulation({
    companyType: 'EURL',
    name: 'EURL',
    dailyRate: 500,
    daysPerWeek: 5,
    weeksOff: 10,
    monthlyRepayableExpenses: 50,
    monthlyTaxableRepayableExpenses: 300,
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
  const [highlight, setHighlight] = useState(false);
  const location = useLocation();
  const { importData } = location?.state || false
  const [fullView, setFullView] = useState(true);


  useEffect(() => {
    if (importData) {
      setHighlight(true);
      setTimeout(() => {
        setHighlight(false);
      }, 5000);
    }
  }, [importData])

  useEffect(() => {
    saveSimulations(simulations);
  }, [simulations])

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
    saveSimulations(newSimulations)
  }

  const resetSimulations = () => {
    localStorage.removeItem('simulations');
    setSimulations(defaultSimulations);
  }

  const toggleFullView = () => {
    setFullView(!fullView);
  }

  const apiCall = async () => {
    const res = await urlGet('/accounts/users/me/');
    console.log(res);
  }

  return (
    <div className='simulations'>
      <button
        style={mainStyles.titleButton}
        onClick={apiCall}
      >
        TEST
      </button>
      <NavMenu activeItem='simulations' />
      <div style={{ display: 'flex' }}>
        <h2>Comparateur</h2>
        <button
          style={mainStyles.titleButton}
          onClick={() => setSimulations([...simulations, (new Simulation()).serialize()])}
          data-testid='add-simulation'
        >
          Ajouter une simulation
        </button>
        <button
          data-testid='reset-data'
          style={mainStyles.titleButton}
          onClick={resetSimulations}
        >
          Réinitialiser les données
        </button>
        <button
          style={mainStyles.titleButton}
          onClick={toggleFullView}
        >
          {fullView ? 'Vue simplifiée' : 'Vue détaillée'}
        </button>
      </div>

      <div style={{ width: 'fit-content' }}>
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
          title={<>TJM <span style={styles.indication}>(Hors taxes)</span></>}
        />
        <InputRow
          simulations={simulations}
          updateSimulation={updateSimulation}
          label='daysPerWeek'
          title='Jours par semaine'
        />
        {fullView && <InputRow
          simulations={simulations}
          updateSimulation={updateSimulation}
          label='weeksOff'
          title='Semaines off'
        />}
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
        {fullView && <TextRow
          label='monthlyRevenu'
          title='CA moyen mensuel'
          style={styles.indicator}
          simulations={simulations}
        />}

        <div style={styles.endOfSection} />

        <h3>Charges</h3>
        <InputRow
          label='monthlyExpenses'
          title='Charges mensuelles'
          simulations={simulations}
          updateSimulation={updateSimulation}
          highlight={highlight}
        />
        {fullView && <TextRow
          label='yearlyExpenses'
          title='Charges annuelles'
          simulations={simulations}
        />}
        <InputRow
          label='monthlyRepayableExpenses'
          title={<>Rbt Frais* <span style={styles.indication}>(mensuels)</span></>}
          simulations={simulations}
          highlight={highlight}
          updateSimulation={updateSimulation}
        />
        {fullView && <TextRow
          label='yearlyRepayableExpenses'
          title={<>Rbt Frais <span style={styles.indication}>(annuels)</span></>}
          simulations={simulations}
        />}
        <InputRow
          label='monthlyTaxableRepayableExpenses'
          title={<>Rbt Frais imposables** <span style={styles.indication}>(mensuels)</span></>}
          simulations={simulations}
          highlight={highlight}
          updateSimulation={updateSimulation}
        />
        {fullView && <TextRow
          label='yearlyTaxableRepayableExpenses'
          title={<>Rbt Frais imposables <span style={styles.indication}>(annuels)</span></>}
          simulations={simulations}
        />}
        <InputRow
          label='monthlyNetSalary'
          title={<>Salaire net mensuel  <span style={styles.indication}>(avant IR)</span></>}
          simulations={simulations}
          updateSimulation={updateSimulation}
        />

        {fullView && <><TextRow
          label='yearlyChargedSalary'
          title='Salaire annuel chargé'
          simulations={simulations}
        />
          <TextRow
            label='yearlySalaryCotisations'
            title='Cotisations sur salaire'
            simulations={simulations}
          /></>}

        <TextRow
          label='yearlyTotalCost'
          title='Charges annuelles'
          style={styles.indicator}
          simulations={simulations}
        />


        <div style={styles.endOfSection} />


        <h3>Soldes</h3>
        <TextRow
          label='rawEarnings'
          title='Bénéfice brut'
          simulations={simulations}
        />
        {fullView && <TextRow
          label='earningsTax'
          title="Impôts sur les sociétés"
          simulations={simulations}
        />}
        <TextRow
          label='netEarnings'
          title='Bénéfice après IS'
          style={styles.indicator}
          simulations={simulations}
        />
        <div style={styles.endOfSection} />


        <h3>Affectation du résultat</h3>
        <InputRow
          label="percentDividend"
          title="Pourcentage de divende"
          simulations={simulations}
          updateSimulation={updateSimulation}
        />
        {fullView && <><TextRow
          simulations={simulations}
          label="dividend"
          title="Dividende chargé"
        />
          <TextRow
            simulations={simulations}
            label="dividendCotisations"
            title="Cotisations sur dividende"
          /></>}
        <TextRow
          simulations={simulations}
          label="netResult"
          title="Résultat mis en réserve"
          style={styles.indicator}
        />
        <div style={styles.endOfSection} />


        <h3>Revenus dirigeant·e</h3>

        {fullView && <><TextRow
          label='yearlyNetSalary'
          title='Salaire annuel net'
          simulations={simulations}
        />
          <TextRow
            label='netDividend'
            title='Dividende reçu'
            simulations={simulations}
          />
          <TextRow
            label='incomeTaxOnDividend'
            title={<>IR sur dividendes <span style={styles.indication}>(taux fixe 12.8)</span></>}
            simulations={simulations}
          />
          <TextRow
            label='yearlyRepaidExpenses'
            title='Frais remboursés'
            simulations={simulations}
          /></>}
        <TextRow
          label='managerYearlyRevenu'
          title='Revenu annuel '
          style={{ fontWeight: 'bold' }}
          simulations={simulations}
        />
        <TextRow
          label='managerMonthlyRevenu'
          title='Revenu mensuel moyen'
          style={styles.mainIndicator}
          simulations={simulations}
        />
        <div style={styles.endOfSection} />

        <PercentTextRow
          label='managerIncomeRevenuRatio'
          title='Ratio revenu / CA'
          style={{ fontWeight: 'bold' }}
          simulations={simulations}
        />
        <TextRow
          label='managerYearlyTaxableRevenu'
          title="Revenu imposable à l'IR"
          simulations={simulations}
        />

        <section style={simulationStyles.row}>
          <div style={{ ...simulationStyles.leftCol }} ></div>
          {simulations.map((simulation: SimulationData, index: number) => (
            <div key={index} style={simulationStyles.col} >
              <button
                onClick={() => duplicateSimulation(simulation)}
                data-testid='duplicate-simulation'
              >
                Dupliquer
              </button>
              <button
                onClick={() => deleteSimulation(index)}
                data-testid="remove-simulation"
              >
                Supprimer
              </button>
            </div>
          ))}
        </section>
      </div>

      <section style={styles.infoSection}>
        <div>* Frais remboursés par l'entreprise et non soumis à l'impôt sur le revenu (électricité, box internet...)</div>
        <div>** Frais remboursés par l'entreprise et soumis à l'impôt sur le revenu (principalement les loyers versés au dirigeant·e)</div>
      </section>

    </div>
  )
}
