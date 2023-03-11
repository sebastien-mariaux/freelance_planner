import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { mainStyles } from "../mainStyles";
import { Expense } from "../models/expense";
import NavMenu from "../NavMenu/NavMenu";
import ExpensesForm from "./ExpensesForm";
import ExpensesTable from "./ExpensesTable";
import ExpensesTotal from "./ExpensesTotal";
import { defaultSimulations } from "../Simulations/Simulations";
import { SimulationData } from "../models/simulation";


const defaultExpenses = [
  new Expense({ name: 'Loyer', amount: 300, frequency: 'monthly', taxable: true, repayable: false }),
  new Expense({ name: 'Comptable', amount: 100, frequency: 'monthly', taxable: false, repayable: false }),
  new Expense({ name: 'Repas', amount: 2000, frequency: 'yearly', taxable: false, repayable: false }),
  new Expense({ name: 'Electricité', amount: 90, frequency: 'monthly', taxable: false, repayable: true }),
  new Expense({ name: 'Transport', amount: 80, frequency: 'monthly', taxable: false, repayable: false }),
  new Expense({ name: 'Assurance Pro', amount: 500, frequency: 'yearly', taxable: false, repayable: false }),
  new Expense({ name: 'Divers', amount: 150, frequency: 'monthly', taxable: false, repayable: false }),
]

const monthlyRepayableExpenses = (expenses: Expense[]) => {
  return expenses
    .filter(expense => expense.repayable)
    .reduce((total, expense) => total + expense.monthlyAmount, 0)
}

const yearlyExpenses = (expenses: Expense[]) => {
  return expenses
    .filter(expense => !expense.repayable)
    .reduce((total, expense) => total + expense.yearlyAmount, 0)
}

export default function Expenses() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const expenses = localStorage.getItem('expenses');
    if (expenses) {
      console.log(expenses)
      setExpenses(JSON.parse(expenses).map((expense: any) => new Expense(expense)))
    } else {
      setExpenses(defaultExpenses)
    }
  }, [])

  const saveExpenses = (expenses: any[]) => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }

  const resetExpensesToDefault = () => {
    setExpenses(defaultExpenses)
    saveExpenses(defaultExpenses)
  }

  const deleteExpense = (index: number) => () => {
    let newExpenses = [...expenses];
    newExpenses.splice(index, 1);
    setExpenses(newExpenses);
    saveExpenses(newExpenses)
  }

  console.log('expenses', expenses)

  const getSimulations = (): SimulationData[] => {
    const simulationsData = localStorage.getItem('simulations');
    if (simulationsData) {
      return JSON.parse(simulationsData)
    } else {
      return defaultSimulations
    }
  }
  const useForSimulations = () => {
    const simulations: SimulationData[] = getSimulations()

    const newSimulations = simulations.map((simulation: SimulationData) => {
      simulation.yearlyExpenses = yearlyExpenses(expenses)
      simulation.monthlyRepayableExpenses = monthlyRepayableExpenses(expenses)
      return simulation
    })
    localStorage.setItem('simulations', JSON.stringify(newSimulations));
    navigate('/simulations')
  }

  return (
    <div>
      <NavMenu activeItem='expenses' />
      <div style={{ display: 'flex' }}>
        <h2>Estimation des charges</h2>
        <button
          style={mainStyles.titleButton}
          data-testid='add-simulation'
          onClick={resetExpensesToDefault}
        >
          Utiliser les valeurs par défaut
        </button>
        <button
          style={mainStyles.titleButton}
          data-testid='add-simulation'
          onClick={useForSimulations}
        >
          Utiliser pour mes simulations
        </button>

      </div>
      <div style={styles.addForm}>
        <ExpensesForm expenses={expenses} setExpenses={setExpenses} saveExpenses={saveExpenses} />
      </div>
      {expenses.length > 0 && <>
        <ExpensesTable expenses={expenses} deleteExpense={deleteExpense} />
        <div style={styles.totals}>
          <ExpensesTotal expenses={expenses} />
        </div>
      </>}
    </div>
  )
}

const styles = {
  addForm: {
    padding: '0.5em',
    backgroundColor: '#eee',
    marginBottom: '1em',
    borderRadius: '5px'
  },
  totals: {
    padding: '0.5em',
    marginTop: '1em',
  },
}

