import React, { useEffect } from "react";
import { useState } from "react";
import { Simulation } from "../models/simulation";
import NavMenu from "../NavMenu/NavMenu";
import InputRow from "./SimulationRow/InputRow";
import PercentTextRow from "./SimulationRow/PercentTextRow";
import SelectRow from "./SimulationRow/SelectRow";
import TextRow from "./SimulationRow/TextRow";
import { mainStyles } from "../mainStyles";
import { useParams } from "react-router-dom";
import { urlGet, urlPatch } from "../api/base";
import { routes } from "../api/routes";
import { simulationStyles } from "./simulationStyles";
import ExpensesModal from "../Expenses/ExpensesModal";

const styles = {
  endOfSection: {
    fontWeight: "bold",
    borderBottom: "2px solid black",
    paddingBottom: "5px",
  },
  mainIndicator: {
    fontWeight: "bold",
    fontSize: "1.2em",
  },
  indicator: {
    fontWeight: "bold",
  },
  indication: {
    fontStyle: "italic",
    fontSize: "0.8em",
  },
  infoSection: {
    marginTop: "20px",
    fontStyle: "italic",
    fontSize: "0.8em",
  },
};

export const defaultSimulations = [
  new Simulation({
    companyType: "SASU",
    name: "SASU",
    dailyRate: 500,
    daysPerWeek: 5,
    weeksOff: 10,
    monthlyRepayableExpenses: 50,
    monthlyTaxableRepayableExpenses: 300,
  }).serialize(),
  new Simulation({
    companyType: "EURL",
    name: "EURL",
    dailyRate: 500,
    daysPerWeek: 5,
    weeksOff: 10,
    monthlyRepayableExpenses: 50,
    monthlyTaxableRepayableExpenses: 300,
    monthlyNetSalary: 4500,
  }).serialize(),
];

interface ApiSimulation {
  id: string;
  name: string;
  company_type: string;
  daily_rate: number;
  days_per_week: number;
  weeks_on: number;
  sales: {
    sales: number;
    average_monthly_sales: number;
  };
  expenses: {
    monthly_expenses: number;
    yearly_expenses: number;
    repayed_non_taxable_monthly_expenses: number;
    repayed_non_taxable_yearly_expenses: number;
    repayed_taxable_monthly_expenses: number;
    repayed_taxable_yearly_expenses: number;
  };
  salary: {
    monthly_net_salary: number;
    yearly_charged_salary: number;
    yearly_salary_taxes: number;
    yearly_net_salary: number;
  };
  spendings: {
    total_yearly_spendings: number;
  };
  earnings: {
    raw_yearly_earnings: number;
    earning_taxes: number;
    net_earnings: number;
  };
  dividend: {
    raw_dividend: number;
    dividend_cotisations: number;
    net_dividend: number;
    taxes_on_dividend: number;
  };
  retained_earnings: number;
  yearly_manager_income: number;
  monthly_manager_income: number;
  income_sales_ratio: number;
  taxable_yearly_manager_income: number;
}

export default function Simulations() {
  const [simulations, setSimulations] = useState(defaultSimulations);
  // const [highlight, setHighlight] = useState(false);
  // const location = useLocation();
  // const { importData } = location?.state || false
  const [fullView, setFullView] = useState(true);
  const [apiSimulations, setApiSimulations] = useState<ApiSimulation[]>([]);
  const { companyId } = useParams();
  console.log('companyId', companyId);
  const [simulationId, setSimulationId] = useState<string>('0');
  const [displayExpensesModal, setDisplayExpensesModal] = useState(false);

  // useEffect(() => {
  //   if (importData) {
  //     setHighlight(true);
  //     setTimeout(() => {
  //       setHighlight(false);
  //     }, 5000);
  //   }
  // }, [importData])

  const getSimulations = async () => {
    urlGet(routes.companyDetailedSimulations(companyId)).then((data: any) => {
      setApiSimulations(data);
    });
  };

  useEffect(() => {
    getSimulations();
  }, [displayExpensesModal]);

  const openExpensesModal = (id: string) => {
    setSimulationId(id);
    setDisplayExpensesModal(true);
  };

  console.log(apiSimulations);

  // const duplicateSimulation = (simulation: SimulationData) => {
  //   let newSimulation = new Simulation(simulation);
  //   newSimulation.name = newSimulation.name + ' (copie)';
  //   setSimulations([...simulations, newSimulation.serialize()]);
  // }

  // const deleteSimulation = (index: number) => {
  //   let newSimulations = [...simulations];
  //   newSimulations.splice(index, 1);
  //   setSimulations(newSimulations);
  // }

  // const updateSimulation = (index: number, label: string, value: any) => {
  //   let newSimulations: any = simulations.map((simulation: SimulationData) => new Simulation(simulation));
  //   newSimulations[index][label] = value;
  //   newSimulations = newSimulations.map((simulation: Simulation) => simulation.serialize());
  //   setSimulations([...newSimulations]);
  //   saveSimulations(newSimulations)
  // }

  // const resetSimulations = () => {
  //   localStorage.removeItem('simulations');
  //   setSimulations(defaultSimulations);
  // }

  const toggleFullView = () => {
    setFullView(!fullView);
  };

  const updateSimulation = (index: number, label: string, value: any) => {
    let data: any = {}
    data[label] = value
    urlPatch(
      routes.companySimulation(companyId, apiSimulations[index].id),
      data,
      () => getSimulations(),
      ()=>{}
    )
  }

  return (
    <div className="simulations">
      <NavMenu activeItem="simulations" />
      <div style={{ display: "flex" }}>
        <h2>Comparateur</h2>
        <button
          style={mainStyles.titleButton}
          onClick={() =>
            setSimulations([...simulations, new Simulation().serialize()])
          }
          data-testid="add-simulation"
        >
          Ajouter une simulation
        </button>
        {/* <button
          data-testid='reset-data'
          style={mainStyles.titleButton}
          onClick={resetSimulations}
        >
          Réinitialiser les données
        </button> */}
        <button style={mainStyles.titleButton} onClick={toggleFullView}>
          {fullView ? "Vue simplifiée" : "Vue détaillée"}
        </button>
      </div>

      <div style={{ width: "fit-content" }}>
        <InputRow
          label="name"
          title="Titre"
          style={styles.mainIndicator}
          simulations={apiSimulations}
          updateSimulation={updateSimulation}
        />
        <SelectRow
          label="company_type"
          simulations={apiSimulations}
          updateSimulation={updateSimulation}
          title="Type de société"
          options={["SASU", "EURL"]}
        />

        <h3>Revenus</h3>
        <InputRow
          simulations={apiSimulations}
          updateSimulation={updateSimulation}
          label="daily_rate"
          title={
            <>
              TJM <span style={styles.indication}>(Hors taxes)</span>
            </>
          }
        />
        <InputRow
          simulations={apiSimulations}
          updateSimulation={updateSimulation}
          label="days_per_week"
          title="Jours par semaine"
        />
        {/* {fullView && <InputRow
          simulations={apiSimulations}
          updateSimulation={()=>{}}
          label='weeks'
          title='Semaines off'
        />} */}
        <InputRow
          simulations={apiSimulations}
          updateSimulation={updateSimulation}
          label="weeks_on"
          title="Semaines travaillées"
        />

        <TextRow
          label="sales.sales"
          title="CA annuel"
          style={styles.indicator}
          simulations={apiSimulations}
        />
        {fullView && (
          <TextRow
            label="sales.average_monthly_sales"
            title="CA moyen mensuel"
            style={styles.indicator}
            simulations={apiSimulations}
          />
        )}

        <div style={styles.endOfSection} />

        <section style={simulationStyles.row}>
          <div style={{ ...simulationStyles.leftCol}}>
            <h3>Charges</h3>
          </div>
          {apiSimulations.map((simulation: any, index: number) => (
            <div
              style={{...simulationStyles.col, alignItems: 'center', color:'blue', fontStyle: 'italic'} }
              key={index}
              onClick={()=>openExpensesModal(simulation.id)}
            >
              Sélection{simulation.id}
            </div>
          ))}
        </section>
        {/* <InputRow
          label='expenses.monthly_expenses'
          title='Charges mensuelles'
          simulations={apiSimulations}
          updateSimulation={()=>{}}
          highlight={highlight}
        /> */}
        {fullView && (
          <TextRow
            label="expenses.yearly_expenses"
            title="Charges annuelles"
            simulations={apiSimulations}
          />
        )}
        {/* <InputRow
          label='expenses.repayed_non_taxable_monthly_expenses'
          title={<>Rbt Frais* <span style={styles.indication}>(mensuels)</span></>}
          simulations={apiSimulations}
          highlight={highlight}
          updateSimulation={()=>{}}
        /> */}
        {fullView && (
          <TextRow
            label="expenses.repayed_non_taxable_yearly_expenses"
            title={<>Rbt Frais </>}
            simulations={apiSimulations}
          />
        )}
        {/* <InputRow
          label='expenses.repayed_taxable_monthly_expenses'
          title={<>Rbt Frais imposables** <span style={styles.indication}>(mensuels)</span></>}
          simulations={apiSimulations}
          highlight={highlight}
          updateSimulation={()=>{}}
        /> */}
        {fullView && (
          <TextRow
            label="expenses.repayed_taxable_yearly_expenses"
            title={<>Rbt Frais imposables </>}
            simulations={apiSimulations}
          />
        )}
        <InputRow
          label="salary.monthly_net_salary"
          title={
            <>
              Salaire net mensuel{" "}
              <span style={styles.indication}>(avant IR)</span>
            </>
          }
          simulations={apiSimulations}
          updateSimulation={updateSimulation}
        />

        {fullView && (
          <>
            <TextRow
              label="salary.yearly_charged_salary"
              title="Salaire annuel chargé"
              simulations={apiSimulations}
            />
            <TextRow
              label="salary.yearly_salary_taxes"
              title="Cotisations sur salaire"
              simulations={apiSimulations}
            />
          </>
        )}

        <TextRow
          label="spendings.total_yearly_spendings"
          title="Charges annuelles"
          style={styles.indicator}
          simulations={apiSimulations}
        />

        <div style={styles.endOfSection} />

        <h3>Soldes</h3>
        <TextRow
          label="earnings.raw_yearly_earnings"
          title="Bénéfice brut"
          simulations={apiSimulations}
        />
        {fullView && (
          <TextRow
            label="earnings.earning_taxes"
            title="Impôts sur les sociétés"
            simulations={apiSimulations}
          />
        )}
        <TextRow
          label="earnings.net_earnings"
          title="Bénéfice après IS"
          style={styles.indicator}
          simulations={apiSimulations}
        />
        <div style={styles.endOfSection} />

        <h3>Affectation du résultat</h3>
        <InputRow
          label="dividend_rate"
          title="Pourcentage de divende"
          simulations={apiSimulations}
          updateSimulation={updateSimulation}
        />
        {fullView && (
          <>
            <TextRow
              simulations={apiSimulations}
              label="dividend.raw_dividend"
              title="Dividende chargé"
            />
            <TextRow
              simulations={apiSimulations}
              label="dividend.dividend_cotisations"
              title="Cotisations sur dividende"
            />
          </>
        )}
        <TextRow
          simulations={apiSimulations}
          label="retained_earnings"
          title="Résultat mis en réserve"
          style={styles.indicator}
        />
        <div style={styles.endOfSection} />

        <h3>Revenus dirigeant·e</h3>

        {fullView && (
          <>
            <TextRow
              label="salary.yearly_net_salary"
              title="Salaire annuel net"
              simulations={apiSimulations}
            />
            <TextRow
              label="dividend.net_dividend"
              title="Dividende reçu"
              simulations={apiSimulations}
            />
            <TextRow
              label="dividend.taxes_on_dividend"
              title={
                <>
                  IR sur dividendes{" "}
                  <span style={styles.indication}>(taux fixe 12.8)</span>
                </>
              }
              simulations={apiSimulations}
            />
            <TextRow
              label="expenses.repayed_yearly_expenses"
              title="Frais remboursés"
              simulations={apiSimulations}
            />
          </>
        )}
        <TextRow
          label="yearly_manager_income"
          title="Revenu annuel "
          style={{ fontWeight: "bold" }}
          simulations={apiSimulations}
        />
        <TextRow
          label="monthly_manager_income"
          title="Revenu mensuel moyen"
          style={styles.mainIndicator}
          simulations={apiSimulations}
        />
        <div style={styles.endOfSection} />

        <PercentTextRow
          label="income_sales_ratio"
          title="Ratio revenu / CA"
          style={{ fontWeight: "bold" }}
          simulations={apiSimulations}
        />
        <TextRow
          label="taxable_yearly_manager_income"
          title="Revenu imposable à l'IR"
          simulations={apiSimulations}
        />

        {/* <section style={simulationStyles.row}>
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
        </section> */}
      </div>

      <section style={styles.infoSection}>
        <div>
          * Frais remboursés par l'entreprise et non soumis à l'impôt sur le
          revenu (électricité, box internet...)
        </div>
        <div>
          ** Frais remboursés par l'entreprise et soumis à l'impôt sur le revenu
          (principalement les loyers versés au dirigeant·e)
        </div>
      </section>

      {(displayExpensesModal && companyId) &&  <ExpensesModal
      simulationId={simulationId}
      companyId={companyId}
      setDisplayExpensesModal={setDisplayExpensesModal}
      />}
    </div>
  );
}
