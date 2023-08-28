export const displayAmount = (amount) => {
  if (amount === undefined || amount === null) return '-';

  return amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
}

export const displayPercent = (amount) => {
  if (amount === undefined || amount === null) return '???';

  return amount.toLocaleString('fr-FR', { style: 'percent', minimumFractionDigits: 2 });
}
