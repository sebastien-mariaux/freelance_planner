import React from "react";
import { useForm } from "react-hook-form";
import { urlPost } from "../api/base";
import { routes } from "../api/routes";

export default function SalaryForm({ afterCreate, companyId }) {
  const { register, handleSubmit,  reset } = useForm({
    shouldUseNativeValidation: true,
  });

  const createSalary = (data) => {
    urlPost(
      routes.salaries(companyId),
      data,
      afterCreate,
      () => {});

  }
  const curr = new Date();
  const date = curr.toISOString().substring(0,10);

  return (
    <form onSubmit={handleSubmit(createSalary)}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex" }}>
          <label style={styles.label}>
            <input
              type="number"
              placeholder="Montant net"
              {...register("net_amount", { min: 0, required: true })}
            />
          </label>
          <label style={styles.label}>
            <input
              type="number"
              placeholder="Montant brut"
              {...register("gross_amount", { min: 0, required: true })}
            />
          </label>
          <label style={styles.label}>
            <input type="date" {...register("date", { required: true })} defaultValue={date} />
          </label>

        </div>
        <input type="submit" value="Ajouter" style={styles.submit} />
      </div>
    </form>
  );
}

const styles = {
  label: {
    padding: "0.5em",
  },
  submit: {
    height: 'fit-content',
    alignSelf: 'center',
  }
};
