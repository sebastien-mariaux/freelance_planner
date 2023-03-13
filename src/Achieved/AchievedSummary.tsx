import React from 'react';
import { Achieved } from '../models/achieved';
import { displayAmount } from '../Simulations/simulationsHelper';
import { CompletedMonth } from './Achieved';

interface AchievedSummaryProps {
  completedMonths: CompletedMonth[]
}

export default function AchievedSummary({ completedMonths }: AchievedSummaryProps) {
  const completedRevenu = completedMonths.filter((e) => e.completed).reduce((acc, month) => acc + month.revenu, 0)
  const completedSalaries = completedMonths.filter((e) => e.completed).reduce((acc, month) => acc + month.netSalary, 0)
  const repayedExpenses = completedMonths.filter((e) => e.completed).reduce((acc, month) => acc + month.repayableExpenses, 0)
  const otherCompletedExpenses = completedMonths.filter((e) => e.completed).reduce((acc, month) => acc + month.otherExpenses, 0)
  const completedMonthCount = completedMonths.filter((e) => e.completed).length


  const getComputer = () => {
    return new Achieved({
      companyType: 'SASU',
      expenses: otherCompletedExpenses,
      completedSalaries: completedSalaries,
      incomeTaxRate: 0,
      percentDividend: 100,
      repayableExpenses: repayedExpenses,
      revenu: completedRevenu,
      monthesCount: completedMonthCount,
    })
  }

  const computer = getComputer().run()
  console.log(computer)

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td style={{ textAlign: 'left', fontWeight: 'bold', paddingRight: '2em' }}>Mois clôturés</td>
            <td style={{ textAlign: 'right' }}>{completedMonthCount}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'left', fontWeight: 'bold', paddingRight: '2em' }}>Chiffre d'affaires réalisé</td>
            <td style={{ textAlign: 'right' }}>{displayAmount(completedRevenu)}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'left', fontWeight: 'bold', paddingRight: '2em' }}>Salaires nets versés</td>
            <td style={{ textAlign: 'right' }}>{displayAmount(completedSalaries)}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'left', fontWeight: 'bold', paddingRight: '2em' }}>Charges remboursées</td>
            <td style={{ textAlign: 'right' }}>{displayAmount(repayedExpenses)}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'left', fontWeight: 'bold', paddingRight: '2em' }}>Autres charges payées</td>
            <td style={{ textAlign: 'right' }}>{displayAmount(otherCompletedExpenses)}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'left', fontWeight: 'bold', paddingRight: '2em' }}>Bénéfice après IS</td>
            <td style={{ textAlign: 'right' }}>{displayAmount(computer.netEarnings)}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'left', fontWeight: 'bold', paddingRight: '2em' }}>Dividende à verser</td>
            <td style={{ textAlign: 'right' }}>{displayAmount(computer.netDividend)}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'left', fontWeight: 'bold', paddingRight: '2em' }}>Revenu mensuel net moyen </td>
            <td style={{ textAlign: 'right' }}>{displayAmount(computer.managerMonthlyRevenu)}</td>
          </tr>
        </tbody>
      </table>
    </div>)
}