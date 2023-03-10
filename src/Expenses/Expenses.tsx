import React, { useState } from "react";
import { Expense } from "../models/expense";
import NavMenu from "../NavMenu/NavMenu";
import ExpensesForm from "./ExpensesForm";
import ExpensesTable from "./ExpensesTable";
import ExpensesTotal from "./ExpensesTotal";


export default function Expenses() {
  const [expenses, setExpenses] = useState<Expense[]>([])

  // const saveSimulations = (simulations: any[]) => {
  //   localStorage.setItem('simulations', JSON.stringify(simulations));
  // }

  const saveExpenses = (expenses: any[]) => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }

  const deleteExpense = (index: number) => () => {
    let newExpenses = [...expenses];
    newExpenses.splice(index, 1);
    setExpenses(newExpenses);
    saveExpenses(newExpenses)
  }

  console.log('expenses', expenses)
  return (
    <div>
      <NavMenu activeItem='expenses' />
      <h2>Expenses</h2>
      <ExpensesForm expenses={expenses} setExpenses={setExpenses} saveExpenses={saveExpenses}/>
      <ExpensesTable expenses={expenses} deleteExpense={deleteExpense} />
      <ExpensesTotal expenses={expenses} />
    </div>
  )
}

