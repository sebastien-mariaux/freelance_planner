import React from "react";
import { Expense } from "../models/expense";
import { displayAmount } from "../Simulations/simulationsHelper";

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
    <div style={styles.container}>
      <div>
        <span style={styles.amountLabels}> Total mensuel :</span>
        <span style={styles.amount}> {displayAmount(totalMonthly)}</span>
      </div>
      <div>
        <span style={styles.amountLabels}> Total annuel :</span>
        <span style={styles.amount}> {displayAmount(totalAnnual)}</span>
      </div>
    </div>
  )
}

const styles = {
  amountLabels: {
    fontWeight: 'bold',
    lineHeight: '1.8',
  },
  amount: {
    display: 'inline-block',
    minWidth: '150px',
  },
  container: {
    textAlign: 'right' as 'right'
  }
}