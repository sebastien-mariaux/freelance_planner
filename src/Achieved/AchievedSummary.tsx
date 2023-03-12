import React from 'react';
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

        </tbody>
      </table>
    </div>)
}