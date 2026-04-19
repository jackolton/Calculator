import { calculate as capRate } from './cap-rate';

export const formulas: Record<string, (inputs: Record<string, number>) => Record<string, number>> = {
  'cap-rate': capRate,
};
