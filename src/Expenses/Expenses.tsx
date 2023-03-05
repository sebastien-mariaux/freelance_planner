import React from "react";
import NavMenu from "../NavMenu/NavMenu";


export default function Expenses() {
  return(
    <div>
      <NavMenu activeItem='expenses' />
      <h2>Expenses</h2>
    </div>
  )
}