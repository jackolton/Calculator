import { useState, useMemo } from 'preact/hooks';
import { formulas } from '../lib/formulas/index';

type InputSpec = {
  id: string;
  label: string;
  type: 'currency' | 'percent' | 'number';
  default: number;
  min?: number;
  max?: number;
};

type OutputSpec = {
  id: string;
  label: string;
  format: 'currency' | 'percent' | 'number';
  highlight: boolean;
};

type Props = {
  inputs: InputSpec[];
  outputs: OutputSpec[];
  formulaId: string;
};

function fmt(value: number, format: string): string {
  if (!isFinite(value)) return '—';
  if (format === 'currency') {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
  }
  if (format === 'percent') return value.toFixed(2) + '%';
  return value.toLocaleString('en-US');
}

function parseRaw(raw: string): number {
  return parseFloat(raw.replace(/[^0-9.]/g, '')) || 0;
}

function fmtInput(value: number, type: string): string {
  if (type === 'currency') {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
  }
  return String(value);
}

export default function CalculatorForm({ inputs, outputs, formulaId }: Props) {
  const [values, setValues] = useState<Record<string, number>>(
    () => Object.fromEntries(inputs.map((i) => [i.id, i.default]))
  );
  const [rawValues, setRawValues] = useState<Record<string, string>>(
    () => Object.fromEntries(inputs.map((i) => [i.id, fmtInput(i.default, i.type)]))
  );

  const results = useMemo(() => {
    const fn = formulas[formulaId];
    return fn ? fn(values) : {};
  }, [values, formulaId]);

  function handleChange(id: string, raw: string) {
    setRawValues((prev) => ({ ...prev, [id]: raw }));
    setValues((prev) => ({ ...prev, [id]: parseRaw(raw) }));
  }

  function handleBlur(id: string, type: string) {
    setRawValues((prev) => ({ ...prev, [id]: fmtInput(values[id] ?? 0, type) }));
  }

  function handleFocus(id: string) {
    setRawValues((prev) => ({ ...prev, [id]: String(values[id] ?? '') }));
  }

  return (
    <div class="space-y-6">
      <div class="grid gap-4 sm:grid-cols-2">
        {inputs.map((input) => (
          <div key={input.id}>
            <label class="label" for={`field-${input.id}`}>{input.label}</label>
            <div class="relative">
              {input.type === 'currency' && (
                <span class="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400 text-sm select-none">$</span>
              )}
              <input
                id={`field-${input.id}`}
                type="text"
                inputMode="decimal"
                class={`input-field ${input.type === 'currency' ? 'pl-7' : ''} ${input.type === 'percent' ? 'pr-7' : ''}`}
                value={rawValues[input.id] ?? ''}
                onInput={(e) => handleChange(input.id, (e.target as HTMLInputElement).value)}
                onBlur={() => handleBlur(input.id, input.type)}
                onFocus={() => handleFocus(input.id)}
              />
              {input.type === 'percent' && (
                <span class="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400 text-sm select-none">%</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div class="rounded-xl bg-navy-950 p-6 space-y-4">
        {outputs.filter((o) => o.highlight).map((output) => (
          <div key={output.id} class="text-center pb-2">
            <p class="text-sm font-medium text-blue-300 mb-1">{output.label}</p>
            <p class="text-5xl font-bold text-white tabular-nums">{fmt(results[output.id] ?? 0, output.format)}</p>
          </div>
        ))}
        {outputs.filter((o) => !o.highlight).length > 0 && (
          <div class="border-t border-white/10 pt-4 space-y-3">
            {outputs.filter((o) => !o.highlight).map((output) => (
              <div key={output.id} class="flex items-center justify-between">
                <p class="text-sm text-blue-200">{output.label}</p>
                <p class="text-base font-semibold text-white tabular-nums">{fmt(results[output.id] ?? 0, output.format)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
