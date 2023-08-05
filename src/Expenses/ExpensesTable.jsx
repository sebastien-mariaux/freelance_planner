import React from "react";
import { displayAmount } from "../Simulations/simulationsHelper";
import { urlDelete, urlPost } from "../api/base";
import { routes } from "../api/routes";

export default function ExpensesTable({
  expenses,
  deleteExpense,
  companyId,
  simulationId,
  loadSimulation,
  simulation,
}) {
  const frequencyLabel = (frequency) => {
    // TODO: Maybe it's time to use I18n...
    switch (frequency) {
      case "monthly":
        return "Mensuel";
      case "yearly":
        return "Annuel";
      default:
        return "";
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

  return (
    <table style={styles.table} className="bordered-table">
      <thead style={styles.thead}>
        <tr>
          <th></th>
          <th>Description</th>
          <th>Montant</th>
          <th>Fréquence</th>
          <th>Remboursable</th>
          <th>Imposable à l'IR</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense, index) => (
          <tr key={index}>
            <td>
              <input
                type="checkbox"
                onChange={(event) => toggleExpense(event, expense.id || "")}
                checked={simulation.expenses
                  .map((exp) => exp.id)
                  .includes(expense.id)}
              />
            </td>
            <td>{expense.name}</td>
            <td style={{ textAlign: "right", paddingRight: "0.5em" }}>
              {displayAmount(expense.amount)}
            </td>
            <td>{frequencyLabel(expense.periodicity)}</td>
            <td>{expense.is_repayed ? "Oui" : "Non"}</td>
            <td>{expense.is_taxable ? "Oui" : "Non"}</td>
            <td>
              <button onClick={deleteExpense(index)}>Supprimer</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const styles = {
  table: {
    width: "100%",
  },
  thead: {
    textAlign: "left",
    backgroundColor: "#000",
    color: "#fff",
  },
};
