import React from 'react';
import { Field, Section, Textarea } from './ClinicalFormControls';

export function ExamenFisicoStep({ form, update }) {
  return <>
  <Section eyebrow="XIII. Examen físico" title="Signos vitales y antropometría">
    <div className="form-grid">
      <Field label="Frecuencia cardíaca (FC)" 
      value={form.examination.vitals.fc} 
      onChange={(v) => update('examination', 'vitals', { ...form.examination.vitals, fc: v })} />
      <Field label="Frecuencia respiratoria (FR)" value={form.examination.vitals.fr} onChange={(v) => update('examination', 'vitals', { ...form.examination.vitals, fr: v })} />
      <Field label="Presión arterial" value={form.examination.vitals.bp} onChange={(v) => update('examination', 'vitals', { ...form.examination.vitals, bp: v })} />
      <Field label="Temperatura" value={form.examination.vitals.temperature} onChange={(v) => update('examination', 'vitals', { ...form.examination.vitals, temperature: v })} />
      <Field label="Peso (kg)" value={form.examination.anthropometry.weight} onChange={(v) => update('examination', 'anthropometry', { ...form.examination.anthropometry, weight: v })} />
      <Field label="Talla (cm)" value={form.examination.anthropometry.height} onChange={(v) => update('examination', 'anthropometry', { ...form.examination.anthropometry, height: v })} />
      <Field label="IMC" value={form.examination.anthropometry.bmi} onChange={(v) => update('examination', 'anthropometry', { ...form.examination.anthropometry, bmi: v })} />
    </div>
  </Section>
  <Section eyebrow="Examen físico" title="Hallazgos clínicos">
    <div className="exam-grid">
      {[['general', 'Estado general'], ['skin', 'Piel y mucosas'], ['headNeck', 'Cabeza y cuello'], ['thorax', 'Tórax y campos pulmonares'], ['abdomen', 'Abdomen y pelvis'], ['extremities', 'Extremidades'], ['neurologic', 'Examen neurológico']].map(([key, label]) => (
        <Textarea key={key} label={label} value={form.examination[key]} onChange={(v) => update('examination', key, v)} />
      ))}
    </div>
    <Textarea label="XIV. Observaciones y análisis" value={form.examination.observations} onChange={(v) => update('examination', 'observations', v)} />
    <Textarea label="XV. Diagnósticos o problemas" value={form.examination.diagnoses} onChange={(v) => update('examination', 'diagnoses', v)} />
  </Section>
</>
}