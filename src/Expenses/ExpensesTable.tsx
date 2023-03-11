import React from "react";
import { Expense } from "../models/expense";
import { displayAmount } from "../Simulations/simulationsHelper";

interface ExpensesTableProps {
  expenses: Expense[]
  deleteExpense: (index: number) => () => void
}

export default function ExpensesTable({expenses, deleteExpense}: ExpensesTableProps) {
  const frequencyLabel = (frequency: string) => {
    // TODO: Maybe it's time to use I18n...
    switch (frequency) {
      case 'monthly':
        return 'Mensuel'
      case 'yearly':
        return 'Annuel'
      default:
        return ''
    }
  }

  return (
    <table style={styles.table} className="bordered-table">
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
          <td style={{textAlign: 'right', paddingRight: '0.5em'}}>{displayAmount(expense.amount)}</td>
          <td>{frequencyLabel(expense.frequency)}</td>
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
    textAlign: 'left' as 'left',
    backgroundColor: '#000',
    color: '#fff',
  }
}