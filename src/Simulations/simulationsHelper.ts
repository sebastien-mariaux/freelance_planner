export const displayAmount = (amount:number) => {
  return amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
}

export const displayPercent = (amount:number) => {
  return amount.toLocaleString('fr-FR', { style: 'percent', minimumFractionDigits: 2 });
}
