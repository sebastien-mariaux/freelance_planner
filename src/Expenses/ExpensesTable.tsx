import React from "react";
import { Expense } from "../models/expense";

interface ExpensesTableProps {
  expenses: Expense[]
  deleteExpense: (index: number) => () => void
}

export default function ExpensesTable({expenses, deleteExpense}: ExpensesTableProps) {

  return (
    <table style={styles.table}>
      <thead style={styles.thead}>
        <tr>
          <th>Description</th>
          <th>Montant</th>
          <th>Fréquence</th>
          <th>Imposable à l'IR</th>
          <th>Remboursement de frais</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
      {expenses.map((expense, index) => (
        <tr key={index}>
          <td>{expense.name}</td>
          <td>{expense.amount}</td>
          <td>{expense.frequency}</td>
          <td>{expense.taxable ? 'Oui' : 'Non'}</td>
          <td>{expense.repayable ? 'Oui' : 'Non'}</td>
          <td>
            <button
              onClick={deleteExpense(index)}
            >
              Supprimer
              </button>
            </td>
        </tr>
      ))}
      </tbody>
    </table>
  )
}

const styles = {
  table: {
    width: '100%',
  },
  thead: {
    textAlign: 'left' as 'left'
  }
}