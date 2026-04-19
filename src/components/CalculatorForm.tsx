import { useState, useMemo, useRef, useEffect } from 'preact/hooks';
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

function useFlash(value: unknown) {
  const ref = useRef<HTMLParagraphElement>(null);
  const prev = useRef(value);
  useEffect(() => {
    if (prev.current !== value && ref.current) {
      ref.current.animate(
        [{ opacity: 0.3, transform: 'scale(0.97)' }, { opacity: 1, transform: 'scale(1)' }],
        { duration: 220, easing: 'cubic-bezier(0.22,1,0.36,1)', fill: 'forwards' }
      );
    }
    prev.current = value;
  }, [value]);
  return ref;
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

  const primaryOutputs   = outputs.filter((o) => o.highlight);
  const secondaryOutputs = outputs.filter((o) => !o.highlight);

  const primaryValue = primaryOutputs[0] ? fmt(results[primaryOutputs[0].id] ?? 0, primaryOutputs[0].format) : '—';
  const flashRef = useFlash(primaryValue);

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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Inputs */}
      <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
        {inputs.map((input) => (
          <div key={input.id}>
            <label class="label" for={`field-${input.id}`}>{input.label}</label>
            <div style={{ position: 'relative' }}>
              {input.type === 'currency' && (
                <span style={{ position: 'absolute', inset: '0 auto 0 11px', display: 'flex', alignItems: 'center', pointerEvents: 'none', color: 'var(--color-text-muted)', fontSize: '14px', userSelect: 'none' }}>$</span>
              )}
              <input
                id={`field-${input.id}`}
                type="text"
                inputMode="decimal"
                class="input-field"
                style={{ paddingLeft: input.type === 'currency' ? '22px' : '12px', paddingRight: input.type === 'percent' ? '22px' : '12px' }}
                value={rawValues[input.id] ?? ''}
                onInput={(e) => handleChange(input.id, (e.target as HTMLInputElement).value)}
                onBlur={() => handleBlur(input.id, input.type)}
                onFocus={() => handleFocus(input.id)}
              />
              {input.type === 'percent' && (
                <span style={{ position: 'absolute', inset: '0 11px 0 auto', display: 'flex', alignItems: 'center', pointerEvents: 'none', color: 'var(--color-text-muted)', fontSize: '14px', userSelect: 'none' }}>%</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Results panel */}
      <div style={{
        background: 'var(--color-primary-lt)',
        border: '1px solid var(--color-primary-border)',
        borderRadius: 'var(--radius-lg)',
        borderTop: '3px solid var(--color-primary)',
        overflow: 'hidden',
        padding: '24px',
      }}>
        {/* Primary output */}
        {primaryOutputs.map((output) => (
          <div key={output.id} style={{ textAlign: 'center', paddingBottom: secondaryOutputs.length ? '20px' : '0' }}>
            <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '8px', fontFamily: 'var(--font-body)' }}>
              {output.label}
            </p>
            <p class="result-primary" ref={output === primaryOutputs[0] ? flashRef : undefined}>
              {fmt(results[output.id] ?? 0, output.format)}
            </p>
          </div>
        ))}

        {/* Secondary outputs */}
        {secondaryOutputs.length > 0 && (
          <div style={{ borderTop: '1px solid var(--color-primary-border)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {secondaryOutputs.map((output) => (
              <div key={output.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', margin: 0, fontFamily: 'var(--font-body)' }}>{output.label}</p>
                <p class="result-secondary" style={{ margin: 0 }}>
                  {fmt(results[output.id] ?? 0, output.format)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
