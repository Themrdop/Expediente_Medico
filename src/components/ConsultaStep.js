import React from 'react';
import { Section, Textarea } from './ClinicalFormControls';

export function ConsultaStep({ form, update }) {
  return <>
    <Section eyebrow="V. Motivo de consulta" title="Razón de la visita">
      <Textarea label="Motivo de consulta"
        value={form.consultation.reason}
        onChange={(v) => update('consultation', 'reason', v)}
        placeholder="Describe el motivo principal de la consulta..." />
    </Section>
    <Section eyebrow="VI. Historia de la enfermedad actual"
      title="Evolución del padecimiento">
      <Textarea label="Historia de la enfermedad actual"
        value={form.consultation.currentIllness}
        onChange={(v) => update('consultation', 'currentIllness', v)}
        placeholder="Inicio, evolución, síntomas asociados y tratamientos previos..." />
    </Section>
  </>;
}
