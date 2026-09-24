import React from 'react';
import { CheckboxGroup, Field, Section, infectiousOptions, hereditaryOptions } from './ClinicalFormControls';

export function AntecedentesFamiliaresStep({ form, update }) {
  return <>
    <Section eyebrow="VIII. Antecedentes familiares patológicos" title="Enfermedades infecto-contagiosas">
      <CheckboxGroup
        options={infectiousOptions}
        selected={form.family.infectious}
        onChange={(value) => update('family', 'infectious', value)} />
    </Section>
    <Section eyebrow="Antecedentes familiares" title="Enfermedades hereditarias">
      <CheckboxGroup
        options={hereditaryOptions}
        selected={form.family.hereditary}
        onChange={(value) => update('family', 'hereditary', value)} />
      <Field
        label="Otros antecedentes"
        value={form.family.other}
        onChange={(v) => update('family', 'other', v)} />
    </Section></>;
}
