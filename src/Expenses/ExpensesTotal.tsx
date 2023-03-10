import React from "react";
import { Expense } from "../models/expense";

interface ExpensesTotalProps {
  expenses: Expense[]
}
export default function ExpensesTotal({ expenses }: ExpensesTotalProps) {

  const totalMonthly = expenses.reduce((total, expense) => {
    console.log(expense.name, expense.monthlyAmount)
    return total + expense.monthlyAmount
  }, 0)

  const totalAnnual = expenses.reduce((total, expense) => {
    console.log(expense.name, expense.yearlyAmount)
    return total + expense.yearlyAmount
  }, 0)

  return (
    <div>
      <div>
        Total mensuel: {totalMonthly}
      </div>
      <div>
        Total annuel: {totalAnnual}
      </div>
    </div>
  )
}