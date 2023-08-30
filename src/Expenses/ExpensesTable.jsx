import React from "react";
import { displayAmount } from "../Simulations/simulationsHelper";
import { urlDelete, urlPost } from "../api/base";
import { routes } from "../api/routes";
import { colors } from "../colors";

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
      case "M":
        return "Mensuel";
      case "Y":
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

  const linkExpenses = () => {
    urlPost(
      routes.linkExpenses(companyId, simulationId),
      { expense_ids: expenses.map((expense) => expense.id) },
      loadSimulation,
      () => {}
    );
  };

  const toggleExpenses = (event) => {
    if (event.target.checked) {
      linkExpenses();
    } else {
      unlinkExpenses();
    }
  };

  const unlinkExpenses = () => {
    urlDelete(
      routes.unlinkExpenses(companyId, simulationId),
      { expense_ids: expenses.map((expense) => expense.id) },
      loadSimulation,
      () => {}
    );
  };

  return (
    <table style={tableStyle.table} className="bordered-table">
      <thead style={tableStyle.thead}>
        <tr>
          <th>
            <input
            type="checkbox"
            onChange={toggleExpenses}
            checked={expenses.map((expense) => expense.id).sort().join() === simulation.expenses.map((expense) => expense.id).sort().join()}
            />
          </th>
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
            <td >
              <button className="table-button small" onClick={deleteExpense(index)}>Supprimer</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export const tableStyle = {
  table: {
    width: "100%",
  },
  thead: {
    textAlign: "left",
    backgroundColor: colors.primary,
    color: "#fff",
  },
};
