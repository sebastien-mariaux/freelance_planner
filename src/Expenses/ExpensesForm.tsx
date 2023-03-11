import React from "react";
import { useForm } from "react-hook-form";
import { Expense } from "../models/expense";

interface ExpensesFormProps {
  expenses: Expense[]
  setExpenses: (expenses: Expense[]) => void
  saveExpenses: (expenses: Expense[]) => void
}

export default function ExpensesForm({ expenses, setExpenses, saveExpenses }: ExpensesFormProps) {
  const { register, handleSubmit } = useForm({ shouldUseNativeValidation: true })
  const [displayTaxable, setDisplayTaxable] = React.useState(false)

  const addExpense = (data: any) => {
    const expenseData = {
      name: data.name,
      amount: parseFloat(data.amount),
      frequency: data.frequency,
      taxable: data.taxable,
      repayable: data.repayable,
    }
    const expense = new Expense(expenseData)
    if (expense.isValid()) {
      setExpenses([...expenses, expense])
      saveExpenses([...expenses, expense])
    }
  }

  const displayOrHideTaxable = (event: any) => {
    setDisplayTaxable(event.target.checked)
  }


  return (
    <form onSubmit={handleSubmit(addExpense)}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>

        <div style={{ display: 'flex' }}>
          <label style={styles.label}>
            <input type="text" placeholder="Description" {...register('name', { required: true })} />
          </label>
          <label style={styles.label}>
            <input type="number" placeholder="Montant" {...register("amount", { min: 0, required: true })} />
          </label>
          <label style={styles.label}>
            <select  {...register("frequency")} >
              <option value="monthly">Mensuel</option>
              <option value="yearly">Annuel</option>
            </select>
          </label>
          <label style={styles.label}>
            Remboursement de frais
            <input type="checkbox" {...register("repayable")} onChange={displayOrHideTaxable} />
          </label>
          {displayTaxable && <label style={styles.label}>
            Imposable à l'IR
            <input type="checkbox" {...register("taxable")} />
          </label>}
        </div>
        <input type="submit" value="Ajouter" />
      </div>
    </form>
  )
}

const styles = {
  label: {
    padding: '0.5em'
  }
}