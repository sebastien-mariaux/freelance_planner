import React from "react";
import { useForm } from "react-hook-form";
import { urlPost } from "../api/base";
import { routes } from "../api/routes";

export default function TransactionsForm({ afterCreate, companyId }) {
  const { register, handleSubmit,  reset } = useForm({
    shouldUseNativeValidation: true,
  });

  const createTransaction = (data) => {
    urlPost(
      routes.transactions(companyId),
      data,
      afterCreate,
      () => {});

  }


  return (
    <form onSubmit={handleSubmit(createTransaction)}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex" }}>
          <label style={styles.label}>
            <input
              type="text"
              placeholder="Libellé"
              {...register("name", { required: true })}
            />
          </label>
          <label style={styles.label}>
            <input
              type="number"
              placeholder="Montant"
              {...register("amount", { min: 0, required: true })}
            />
          </label>
          <label style={styles.label}>
            <select {...register("transaction_type")}>
              <option value="I">Revenu</option>
              <option value="E">Dépense</option>
            </select>
          </label>
          <label style={styles.label}>
            <input type="date" {...register("date", { required: true })} />
          </label>

        </div>
        <input type="submit" value="Ajouter" />
      </div>
    </form>
  );
}

const styles = {
  label: {
    padding: "0.5em",
  },
};
