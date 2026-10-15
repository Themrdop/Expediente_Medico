import React from 'react';
import { CheckboxGroup, Section, Textarea, systemGroups } from './ClinicalFormControls';

export function RevisionSistemasStep({ form, update }) {
  return <Section eyebrow="VII. Revisión por aparatos y sistemas" title="Síntomas referidos">
    <div className="system-list">
      {Object.entries(systemGroups).map(([group, options]) =>
        <div className="system-row" key={group}>
          <h3>{group}</h3>
          <CheckboxGroup options={options} selected={form.review.selected} onChange={(value) => update('review', 'selected', value)} />
        </div>)}
    </div>
    <Textarea label="Otros hallazgos en el interrogatorio" value={form.review.findings} onChange={(v) => update('review', 'findings', v)} />
  </Section>;
}
