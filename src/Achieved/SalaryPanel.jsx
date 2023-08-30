import { useParams } from "react-router-dom";
import { displayAmount } from "../Simulations/simulationsHelper";
import { colors } from "../colors";
import { useEffect, useState } from "react";
import { routes } from "../api/routes";
import { urlDelete, urlGet } from "../api/base";
import { formStyle } from "../mainStyles";
import SalaryForm from "./SalaryForm";
import { tableStyle } from "../Expenses/ExpensesTable";

export default function SalaryPanel({year, company}) {
  const [salaries, setSalaries] = useState([]);
  const { companyId } = useParams();
  const [pagination, setPagination] = useState({});
  const [page_number, setPageNumber] = useState(1);

  const getSalaries = async () => {
    urlGet(routes.yearSalaries(companyId, year, page_number)).then(
      (data) => {
        setSalaries(data.results);
        setPagination(data.pagination);
      }
    );
  };


  useEffect(() => {
    console.log('useEffect')
    getSalaries();
  }, [page_number, year]);

  const deleteExpense = (id) => {
    urlDelete(routes.salary(companyId, id), {}, getSalaries, () => {});
  };

  const afterCreate = () => {
    getSalaries();
  };


  return (
    <div>
      <div style={{ ...formStyle.inlineForm, marginBottom: "1em", padding: '0.1em 0.5em' }}>
        <SalaryForm afterCreate={afterCreate} companyId={companyId} />
      </div>
      {salaries.length > 0 &&<table
        style={{ ...tableStyle.table, maxWidth: "800px" }}
        className="bordered-table"
      >
        <thead style={tableStyle.thead}>
          <tr>
            <th>Date</th>
            <th style={{ textAlign: "right", paddingRight: "0.5em" }}>
              Montant net
            </th>
            <th style={{ textAlign: "right", paddingRight: "0.5em" }}>
              Montant brut
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {salaries
            .sort((a, b) => {
              return new Date(b.date) - new Date(a.date);
            })
            .map((salary) => (
              <tr key={salary.id}>
                <td>{salary.date}</td>
                <td style={{ textAlign: "right", paddingRight: "0.5em" }}>
                  {salary.net_amount}
                </td>
                <td style={{ textAlign: "right", paddingRight: "0.5em" }}>
                  {salary.gross_amount}
                </td>
                <td style={styles.actions}>
                  <button
                    className="small table-button"
                    onClick={() => deleteExpense(salary.id)}
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