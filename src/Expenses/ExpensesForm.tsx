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

  const addExpense = (data: any) => {
    console.log('addExpense', data)
    const expense = new Expense(data)
    if (expense.isValid()) {
      setExpenses([...expenses, expense])
      saveExpenses([...expenses, expense])
    }
  }

  return (
    <form onSubmit={handleSubmit(addExpense)}>
      <div style={{ display: 'flex' }}>
        <label style={styles.label}>
          <input type="text" placeholder="Description" {...register('name', { required: true })} />
        </label>
        <label style={styles.label}>
          <input type="number" placeholder="Montant" {...register("amount", { min: 0, required: true })} />
        </label>
        <label style={styles.label}>
          Remboursement de frais
          <input type="checkbox" {...register("repayable")} />
        </label>
        <label style={styles.label}>
          <select  {...register("frequency")} >
            <option value="monthly">Mensuel</option>
            <option value="yearly">Annuel</option>
          </select>
        </label>
        <label style={styles.label}>
          Imposable à l'IR
          <input type="checkbox" {...register("taxable")} />
        </label>
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