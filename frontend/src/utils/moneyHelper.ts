const moneyFormat = (rate: number | string, money?: number): string => {
  const rateNumber: number = typeof rate === "string" ? parseFloat(rate) : rate;
  const amount = (money ? money / 60 : 1) * rateNumber;
  const moneyFormatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 2,
  }).format(amount);

  return moneyFormatter;
};

export { moneyFormat };
