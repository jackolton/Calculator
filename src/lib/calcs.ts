import type { CalcSpec } from './types';

const modules = import.meta.glob<CalcSpec>('../calcs/*.json', { eager: true });

export function getAllCalcs(): CalcSpec[] {
  return Object.values(modules) as CalcSpec[];
}

export function getCalcBySlug(slug: string): CalcSpec | undefined {
  return getAllCalcs().find((c) => c.slug === slug);
}

export function getCalcMeta(slug: string): { slug: string; title: string } | undefined {
  const calc = getCalcBySlug(slug);
  if (!calc) return undefined;
  return { slug: calc.slug, title: calc.title };
}
