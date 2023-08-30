import React, { useEffect } from "react";
import { useState } from "react";
import NavMenu from "../NavMenu/NavMenu";
import InputRow from "./SimulationRow/InputRow";
import PercentTextRow from "./SimulationRow/PercentTextRow";
import SelectRow from "./SimulationRow/SelectRow";
import TextRow from "./SimulationRow/TextRow";
import { mainStyles } from "../mainStyles";
import { useParams } from "react-router-dom";
import { urlDelete, urlGet, urlPatch, urlPost } from "../api/base";
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

export default function Simulations() {
  const [fullView, setFullView] = useState(false);
  const [apiSimulations, setApiSimulations] = useState([]);
  const { companyId } = useParams();
  const [simulationId, setSimulationId] = useState();
  const [displayExpensesModal, setDisplayExpensesModal] = useState(false);

  const getSimulations = async () => {
    urlGet(routes.companyDetailedSimulations(companyId)).then((data) => {
      setApiSimulations(data);
    });
  };

  useEffect(() => {
    getSimulations();
  }, [displayExpensesModal]);

  const openExpensesModal = (id) => {
    setSimulationId(id);
    setDisplayExpensesModal(true);
  };

  const toggleFullView = () => {
    setFullView(!fullView);
  };

  const addSimulation = async () => {
    urlPost(
      routes.companySimulations(companyId),
      { name: getNewName("Ma simulation") },
      () => getSimulations(),
      () => {}
    );
  };

  const getNewName = (newName) => {
    const existingNames = apiSimulations.map((simulation) => simulation.name);
    let i = 1;
    while (existingNames.includes(newName)) {
      newName = `${newName} ${i}`;
      i++;
    }
    return newName;
  };

  const updateSimulation = (index, label, value) => {
    let data = {};
    data[label] = value;
    urlPatch(
      routes.companySimulation(companyId, apiSimulations[index].id),
      data,
      () => getSimulations(),
      () => {}
    );
  };

  const deleteSimulation = async (index) => {
    urlDelete(
      routes.companySimulation(companyId, apiSimulations[index].id),
      {},
      () => getSimulations(),
      () => {}
    );
  };

  const duplicateSimulation = async (index) => {
    const currentSimulation = apiSimulations[index];
    urlPost(
      routes.companySimulations(companyId),
      {
        name: getNewName(`${currentSimulation.name} - copie`),
        description: currentSimulation.description,
        company_type: currentSimulation.company_type,
        daily_rate: currentSimulation.daily_rate,
        days_per_week: currentSimulation.days_per_week,
        weeks_on: currentSimulation.weeks_on,
        dividend_rate: currentSimulation.dividend_rate,
        monthly_net_salary: currentSimulation.monthly_net_salary,
      },
      (data) => onDuplicateSuccess(currentSimulation, data),
      () => {}
    );
  };

  const onDuplicateSuccess = async (currentSimulation, data) => {
    urlPost(
      routes.linkExpenses(companyId, data.id),
      { expense_ids: currentSimulation.expenses.map((expense) => expense.id) },
      getSimulations,
      () => {}
    );
  };

  const runActions = (index, event) => {
    const action = event.target.value;
    switch (action) {
      case "delete":
        deleteSimulation(index);
        break;
      case "duplicate":
        duplicateSimulation(index);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <div className="simulations">
        <NavMenu activeItem="simulations" />
        <div style={{ display: "flex" }}>
          <h2>Comparateur</h2>
          <button
            style={mainStyles.titleButton}
            onClick={addSimulation}
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

        <p style={{ fontStyle: "italic" }}>
          Modifiez les champs en bleu pour faire varier vos simulations.
        </p>

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
          {/* <InputRow
            label="description"
            title="Description"
            simulations={apiSimulations}
            updateSimulation={updateSimulation}
          /> */}

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
          {fullView && (
            <InputRow
              simulations={apiSimulations}
              updateSimulation={updateSimulation}
              label="weeks_off"
              title="Semaines non travaillées"
            />
          )}
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
            <div style={{ ...simulationStyles.leftCol }}>
              <h3>Charges</h3>
            </div>
            {apiSimulations.map((simulation, index) => (
              <div
                style={{
                  ...simulationStyles.col,
                  alignItems: "center",
                  color: "blue",
                  fontStyle: "italic",
                }}
                key={index}
                onClick={() => openExpensesModal(simulation.id)}
              >
                Sélection
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
              label="expenses_data.yearly_expenses"
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
              label="expenses_data.repayed_non_taxable_yearly_expenses"
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
              label="expenses_data.repayed_taxable_yearly_expenses"
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
                label="expenses_data.repayed_yearly_expenses"
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

          <section style={{ ...simulationStyles.row, marginTop: "1em" }}>
            <div style={{ ...simulationStyles.leftCol }}></div>
            {apiSimulations.map((simulation, index) => (
              <div key={index} style={simulationStyles.col}>
                {/* <button
                onClick={() => duplicateSimulation(simulation)}
                data-testid='duplicate-simulation'
              >
                Dupliquer
              </button> */}
                <select onChange={(event) => runActions(index, event)} value="">
                  <option value="">Actions</option>
                  <option value="delete">Supprimer</option>
                  <option value="duplicate">Dupliquer</option>
                </select>
                {/* <button
                  className="small"
                  onClick={() => deleteSimulation(index)}
                  data-testid="remove-simulation"
                >
                  Supprimer
                </button> */}
              </div>
            ))}
          </section>
        </div>

        {/* <section style={styles.infoSection}>
          <div>
            * Frais remboursés par l'entreprise et non soumis à l'impôt sur le
            revenu (électricité, box internet...)
          </div>
          <div>
            ** Frais remboursés par l'entreprise et soumis à l'impôt sur le
            revenu (principalement les loyers versés au dirigeant·e)
          </div>
        </section> */}
      </div>
      {displayExpensesModal && companyId && (
        <ExpensesModal
          simulationId={simulationId}
          companyId={companyId}
          setDisplayExpensesModal={setDisplayExpensesModal}
        />
      )}
    </div>
  );
}
