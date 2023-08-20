import React, { useEffect } from "react";
import { urlGet, urlPost } from "../api/base";
import { routes } from "../api/routes";
import ExpensesTable from "./ExpensesTable";
import ExpensesForm from "./ExpensesForm";
import { formStyle, mainStyles } from "../mainStyles";
import ExpensesTotal from "./ExpensesTotal";

export default function ExpensesModal({
  simulationId,
  companyId,
  setDisplayExpensesModal,
}) {
  const [expenses, setExpenses] = React.useState([]);
  const [simulation, setSimulation] = React.useState({
    expenses: [],
  });

  useEffect(() => {
    loadExpenses();
    loadSimulation();
  }, []);

  const loadExpenses = async () => {
    urlGet(routes.expenses).then((data) => {
      setExpenses(data);
    });
  };

  const loadSimulation = async () => {
    urlGet(routes.companySimulation(companyId, simulationId)).then((data) => {
      setSimulation(data);
    });
  };

  const linkExpense = (expenseId) => {
    urlPost(
      routes.linkExpense(companyId, simulationId),
      { expense_id: expenseId },
      loadSimulation,
      () => {}
    );
  };

  const afterCreate = (id) => {
    linkExpense(id);
    loadExpenses();
  };

  const deleteExpense = (index) => () => {
    console.log(index);
  };

  return (
    <div style={styles.modal}>
      <div style={styles.innerModal}>
        <h2>
          Sélection des charges
          <button
            onClick={() => setDisplayExpensesModal(false)}
            style={{ float: "right" }}
          >
            X
          </button>
        </h2>

        <div style={formStyle.inlineForm}>
          <ExpensesForm afterCreate={afterCreate} />
        </div>

        <div style={mainStyles.info}>
        <div style={mainStyles.infoSection}>
          <div>
            (?) Les charges remboursables sont les charges payées par
            l'entreprise au dirigeant·e (remboursement de frais, loyer...).
            Elles peuvent être imposables à l'IR (cas du loyer par exemple).
          </div>
        </div>
      </div>

        <ExpensesTable
          expenses={expenses}
          simulation={simulation}
          deleteExpense={deleteExpense}
          simulationId={simulationId}
          companyId={companyId}
          loadSimulation={loadSimulation}
        />
        {expenses.length > 0 && (
        <>
          {/* <ExpensesTable expenses={expenses} deleteExpense={deleteExpense} /> */}
          <div style={styles.totals}>
            <ExpensesTotal expenses={simulation.expenses} />
          </div>
        </>
      )}
      </div>
    </div>
  );
}

const styles = {
  modal: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    zIndex: 1000,
    overflow: "auto",
    backgroundColor: "rgb(0,0,0, 0.8)",
  },
  innerModal: {
    backgroundColor: "#fefefe",
    opacity: 1,
    padding: "20px",
    border: "1px solid #888",
    width: "70%",
    height: "70%",
    margin: "7.5% auto",
    borderRadius: "10px",
  },
  totals: {
    padding: "0.5em",
    marginTop: "1em",
  },
};
