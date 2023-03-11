import { Expense } from "../models/expense"
import { monthlyRepayableExpenses, yearlyExpenses } from "./Expenses"

const rentExpense = new Expense({ name: 'rent', amount: 1200, repayable: true, taxable: true, frequency: 'yearly' })
const powerExpense = new Expense({ name: 'power', amount: 100, repayable: true, taxable: false, frequency: 'monthly' })
const accountantExpense = new Expense({ name: 'accountant', amount: 100, repayable: false, taxable: false, frequency: 'monthly' })
const insuranceExpense = new Expense({ name: 'insurance', amount: 500, repayable: false, taxable: false, frequency: 'yearly' })

describe('monthlyRepayableExpenses', () => {
  it('should return 0 when no expenses', () => {
    expect(monthlyRepayableExpenses([])).toEqual(0)
  })
  it('should return 0 when no repayable expenses', () => {
    expect(monthlyRepayableExpenses([accountantExpense, insuranceExpense])).toEqual(0)
  })
  it('should return monthly repayable expenses', () => {
    expect(monthlyRepayableExpenses([accountantExpense, insuranceExpense, rentExpense, powerExpense])).toEqual(200)
  })
})

describe('yearlyExpenses', () => {
  it('should return 0 when no expenses', () => {
    expect(yearlyExpenses([])).toEqual(0)
  })
  it('should return 0 when only repayable expenses', () => {
    expect(yearlyExpenses([rentExpense, powerExpense])).toEqual(0)
  })
  it('should return yearly non repayable expenses', () => {
    expect(yearlyExpenses([accountantExpense, insuranceExpense, rentExpense, powerExpense])).toEqual(500 + 100*12)
  })
})