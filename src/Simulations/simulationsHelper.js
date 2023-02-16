export const displayAmount = (amount) => {
  return amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
}

export const displayPercent = (amount) => {
  return amount.toLocaleString('fr-FR', { style: 'percent', minimumFractionDigits: 2 });
}
