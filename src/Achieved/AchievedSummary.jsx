// import React from "react";
// import { displayAmount } from "../Simulations/simulationsHelper";

// export default function AchievedSummary({ totals, companyType }) {
//   const getComputer = () => {
//     return new Achieved({
//       companyType: companyType,
//       expenses: totals.otherCompletedExpenses,
//       completedSalaries: totals.completedSalaries,
//       percentDividend: 100,
//       repayableExpenses: totals.repayedExpenses,
//       revenu: totals.completedRevenu,
//       monthesCount: totals.completedMonthCount,
//       taxableRepayableExpenses: totals.taxableRepayedExpenses,
//     });
//   };

//   const computer = getComputer().run();

//   return (
//     <div style={styles.container}>
//       <table>
//         <tbody>
//           <tr>
//             <td style={{ textAlign: "left", paddingRight: "2em" }}>
//               Bénéfice après IS
//             </td>
//             <td style={{ textAlign: "right", fontWeight: "bold" }}>
//               {displayAmount(computer.netEarnings)}
//             </td>
//           </tr>
//           <tr>
//             <td style={{ textAlign: "left", paddingRight: "2em" }}>
//               Dividende à verser
//             </td>
//             <td style={{ textAlign: "right", fontWeight: "bold" }}>
//               {displayAmount(computer.netDividend)}
//             </td>
//           </tr>
//           <tr>
//             <td style={{ textAlign: "left", paddingRight: "2em" }}>
//               Revenu mensuel net moyen{" "}
//             </td>
//             <td style={{ textAlign: "right", fontWeight: "bold" }}>
//               {displayAmount(computer.managerMonthlyRevenu)}
//             </td>
//           </tr>
//           <tr>
//             <td style={{ textAlign: "left", paddingRight: "2em" }}>
//               Revenu soumis à l'IR (annuel)
//             </td>
//             <td style={{ textAlign: "right", fontWeight: "bold" }}>
//               {displayAmount(computer.managerYearlyTaxableRevenu)}
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     marginTop: "2em",
//     border: "1px solid #000",
//     backgroundColor: "#ebebeb",
//     width: "fit-content",
//     padding: "0.5em",
//   },
// };
