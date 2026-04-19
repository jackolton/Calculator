export type InputSpec = {
  id: string;
  label: string;
  type: 'currency' | 'percent' | 'number';
  default: number;
  min?: number;
  max?: number;
};

export type OutputSpec = {
  id: string;
  label: string;
  format: 'currency' | 'percent' | 'number';
  highlight: boolean;
};

export type CalcSpec = {
  slug: string;
  title: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  tagline: string;
  relatedCalcs: string[];
  inputs: InputSpec[];
  outputs: OutputSpec[];
  formula: string;
  faq: { question: string; answer: string }[];
  affiliate: {
    partner: string;
    headline: string;
    cta: string;
    url: string;
  };
};
