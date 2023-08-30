import { useEffect, useState } from "react";
import { urlDelete, urlGet } from "../api/base";
import { routes } from "../api/routes";
import { useParams } from "react-router-dom";
import { tableStyle } from "../Expenses/ExpensesTable";
import { displayAmount } from "../Simulations/simulationsHelper";
import { formStyle } from "../mainStyles";
import TransactionsForm from "./TransactionsForm";
import { colors } from "../colors";

export default function TransactionPanel({year, setYear}) {
  const [transactions, setTransactions] = useState([]);
  const { companyId } = useParams();
  const [pagination, setPagination] = useState({});
  const [page_number, setPageNumber] = useState(1);

  const getTransactions = async () => {
    urlGet(routes.yearTransactions(companyId, year, page_number)).then(
      (data) => {
        setTransactions(data.results);
        setPagination(data.pagination);
      }
    );
  };


  useEffect(() => {
    console.log('useEffect')
    getTransactions();
  }, [page_number, year]);

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
      return `- ${value}`;
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
      <div style={{ ...formStyle.inlineForm, marginBottom: "1em", padding: '0.1em 0.5em' }}>
        <TransactionsForm afterCreate={afterCreate} companyId={companyId} />
      </div>
      {transactions.length > 0 &&<table
        style={{ ...tableStyle.table, maxWidth: "800px" }}
        className="bordered-table"
      >
        <thead style={tableStyle.thead}>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th style={{ textAlign: "right", paddingRight: "0.5em" }}>
              Dépenses
            </th>
            <th style={{ textAlign: "right", paddingRight: "0.5em" }}>
              Revenus
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {transactions
            .sort((a, b) => {
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
                <td style={styles.actions}>
                  <button
                    className="small table-button"
                    onClick={() => deleteExpense(transaction.id)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>}
      {pagination?.num_pages > 1 && (
        <div style={styles.pagination}>
          {pagination.previous && <button
            onClick={()=>setPageNumber(pagination.previous)}
            style={styles.paginationButton(false)}
          > &lt; </button>}
          {
            Array(pagination.num_pages).fill().map((_, i) => {
              return (
                <button
                  style={styles.paginationButton(i + 1 === page_number)}
                  onClick={() => setPageNumber(i+1)}
                >{i+1}</button>
              )
            })
          }
         {pagination.next && <button
          onClick={()=>setPageNumber(pagination.next)}
            style={styles.paginationButton(false)}
            > &gt; </button>}
        </div>
      )}
    </div>
  );
}

const styles = {
  paginationButton: (active) => {
    const style = { padding: '0.5em', margin: '0.1em' }
    if (active) {
      style.color = colors.secondary
    }
    return style
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1em'
  },
  actions: {
    textAlign: "end",
  }
}