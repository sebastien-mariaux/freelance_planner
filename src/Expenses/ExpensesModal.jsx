import React, { useEffect } from "react";
import { urlDelete, urlGet, urlPost } from "../api/base";
import { routes } from "../api/routes";
import { useForm } from "react-hook-form";

export default function ExpensesModal({
  simulationId,
  companyId,
  setDisplayExpensesModal,
}) {
  console.log(simulationId);
  const [expenses, setExpenses] = React.useState([]);
  const [simulation, setSimulation] = React.useState({
    expenses: [],
  });
  const { register, getValues } = useForm({ shouldUseNativeValidation: true });

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

  const displayPeriodicity = (expense) => {
    switch (expense.periodicity) {
      case "M":
        return "Mensuelle";
      case "Y":
        return "Annuelle";
      default:
        return "Mensuelle";
    }
  };

  const toggleExpense = (event, expenseId) => {
    if (event.target.checked) {
      linkExpense(expenseId);
    } else {
      unlinkExpense(expenseId);
    }
  };

  const linkExpense = (expenseId) => {
    urlPost(
      routes.linkExpense(companyId, simulationId),
      { expense_id: expenseId },
      loadSimulation,
      () => {}
    );
  };

  const unlinkExpense = (expenseId) => {
    urlDelete(
      routes.unlinkExpense(companyId, simulationId),
      { expense_id: expenseId },
      loadSimulation,
      () => {}
    );
  };

  const createExpense = () => {
    console.log(getValues());
    urlPost(
      routes.expenses,
      getValues(),
      (data) => {
        linkExpense(data.id);
        loadExpenses();
      },
      () => {}
    );
  };

  // const deleteExpense = (index: number) => () => {
  //   console.log(index)
  // }

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

        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th></th>
              <th>Nom</th>
              <th>Montant</th>
              <th>Périodicité</th>
              <th>Remboursable</th>
              <th>Imposable</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td>
                <input {...register("name")} style={{ width: "100%" }} />
              </td>
              <td>
                <input {...register("amount")} style={{ width: "100%" }} />
              </td>
              <td>
                <select {...register("periodicity")} style={{ width: "100%" }}>
                  <option value="M">Mensuelle</option>
                  <option value="Y">Annuelle</option>
                </select>
              </td>
              <td>
                <input
                  {...register("is_repayed")}
                  type="checkbox"
                  style={{ width: "100%" }}
                />
              </td>
              <td>
                <input
                  {...register("is_taxable")}
                  type="checkbox"
                  style={{ width: "100%" }}
                />
              </td>
              <td>
                <button onClick={createExpense}>Ajouter</button>
              </td>
            </tr>
            {expenses.map((expense) => {
              return (
                <tr key={expense.id}>
                  <td>
                    <input
                      type="checkbox"
                      onChange={(event) =>
                        toggleExpense(event, expense.id || "")
                      }
                      checked={simulation.expenses
                        .map((exp) => exp.id)
                        .includes(expense.id)}
                    />
                  </td>
                  <td>{expense.name}</td>
                  <td>{expense.amount}</td>
                  <td>{displayPeriodicity(expense)}</td>
                  <td>{expense.is_repayed ? "Oui" : "Non"}</td>
                  <td>{expense.is_taxable ? "Oui" : "Non"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* <ExpensesTable
            expenses={expenses}
            simulation={simulation}
            deleteExpense={deleteExpense}
            simulationId={simulationId}
            companyId={companyId}
            loadSimulation={loadSimulation}
            /> */}
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
};
