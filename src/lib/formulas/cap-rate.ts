export function calculate(inputs: Record<string, number>) {
  const { price, grossRent, expenseRatio } = inputs;
  if (price <= 0) return { capRate: 0, noi: 0 };
  const annualGross = grossRent * 12;
  const noi = annualGross * (1 - expenseRatio / 100);
  const capRate = (noi / price) * 100;
  return { capRate, noi };
}
