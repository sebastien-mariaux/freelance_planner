import { useEffect, useState } from "react";
import { urlDelete, urlGet } from "../api/base";
import { routes } from "../api/routes";
import { useParams } from "react-router-dom";
import { tableStyle } from "../Expenses/ExpensesTable";
import { displayAmount } from "../Simulations/simulationsHelper";
import ExpensesForm from "../Expenses/ExpensesForm";
import { formStyle } from "../mainStyles";
import TransactionsForm from "./TransactionsForm";

export default function TransactionPanel() {
  const [transactions, setTransactions] = useState([]);
  const { companyId } = useParams();
  console.log(transactions);

  const getTransactions = async () => {
    const currentYear = new Date().getFullYear();
    urlGet(routes.yearTransactions(companyId, currentYear)).then((data) => {
      setTransactions(data);
    });
  };

  useEffect(() => {
    getTransactions();
  }, []);

  // const getSignedAmount = (transaction) => {
  //   let value = displayAmount(parseFloat(transaction.amount));

  //   if (transaction.transaction_type === "I") {
  //     return value;
  //   } else {
  //     return `- ${value}`;
  //   }
  // };

  const getIncome = (transaction) => {
    if (transaction.transaction_type === "I") {
      return displayAmount(parseFloat(transaction.amount));
    }
  };

  const getExpense = (transaction) => {
    if (transaction.transaction_type === "E") {
      const value = displayAmount(parseFloat(transaction.amount));
      return `- ${value}`
    }
  };

  const deleteExpense = (id) => {
    urlDelete(routes.transaction(companyId, id), {}, getTransactions, () => {});
  };

  const afterCreate = () => {
    getTransactions();
  };

  return (
    <div>
      <div style={{ ...formStyle.inlineForm, marginBottom: "1em" }}>
        <TransactionsForm afterCreate={afterCreate} companyId={companyId} />
      </div>
      <table
        style={{ ...tableStyle.table, maxWidth: "800px" }}
        className="bordered-table"
      >
        <thead style={tableStyle.thead}>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th style={{ textAlign: "right", paddingRight: "0.5em" }}>Dépenses</th>
            <th style={{ textAlign: "right", paddingRight: "0.5em" }}>Revenus</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {transactions
            .sort((a, b) =>{
              return new Date(b.date) - new Date(a.date);

            })
            .map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.name}</td>
                <td>{transaction.date}</td>
                <td style={{ textAlign: "right", paddingRight: "0.5em" }}>
                  {getExpense(transaction)}
                </td>
                <td style={{ textAlign: "right", paddingRight: "0.5em" }}>
                  {getIncome(transaction)}
                </td>
                <td>
                  <button
                  className="small"
              onClick={() => deleteExpense(transaction.id)}
                  >Supprimer</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
