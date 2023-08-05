import React from "react";
import { displayAmount } from "../Simulations/simulationsHelper";

export default function ExpensesTotal({ expenses }) {
  const totalMonthly = expenses.reduce((total, expense) => {
    if (expense.periodicity === "M") {
      return total + parseFloat(expense.amount);
    } else {
      return total + parseFloat(expense.amount) / 12;
    }
  }, 0);

  const totalAnnual = expenses.reduce((total, expense) => {
    if (expense.periodicity === "Y") {
      return total + parseFloat(expense.amount);
    } else {
      return total + parseFloat(expense.amount) * 12;
    }

  }, 0);

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
  );
}

const styles = {
  amountLabels: {
    fontWeight: "bold",
    lineHeight: "1.8",
  },
  amount: {
    display: "inline-block",
    minWidth: "150px",
  },
  container: {
    textAlign: "right",
  },
};
