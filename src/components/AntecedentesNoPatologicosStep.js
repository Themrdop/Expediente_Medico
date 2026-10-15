import React from 'react';
import { Field, Section, Textarea } from './ClinicalFormControls';

export function AntecedentesNoPatologicosStep({ form, update }) {
  return   <Section
    eyebrow="IX. Antecedentes personales no patológicos"
    title="Hábitos, inmunizaciones y medicamentos">
    <div className="form-grid">
      <Field
        label="Inmunizaciones completas"
        value={form.personal.immunizations}
        onChange={(v) => update('personal', 'immunizations', v)} />
      <Field
        label="Horas de sueño"
        value={form.personal.sleepHours}
        onChange={(v) => update('personal', 'sleepHours', v)} />
      <Field
        label="Tipo y hora de actividad física"
        value={form.personal.activity}
        onChange={(v) => update('personal', 'activity', v)} />
      <Field
        label="Alimentación"
        value={form.personal.nutrition}
        onChange={(v) => update('personal', 'nutrition', v)} />
    </div>
    <div className="habit-grid">
      {
        [['smoking', 'Tabaco', 'smokingDetails'],
        ['alcohol', 'Alcohol', 'alcoholDetails'],
        ['drugs', 'Drogas ilegales', 'drugsDetails'],
        ['medications', 'Fármacos actuales', 'medicationDetails']
        ].map(([key, label, detail]) =>
          <div className="habit-card" key={key}>
            <label className="switch-row">
              <input
                type="checkbox"
                checked={form.personal[key]}
                onChange={(e) => update('personal', key, e.target.checked)} />
              <span>
                {label}
              </span>
            </label>
            {form.personal[key] &&
              <input
                aria-label={`${label}: tipo, cantidad y frecuencia`}
                value={form.personal[detail]}
                placeholder="Tipo, cantidad y frecuencia"
                onChange={(e) => update('personal', detail, e.target.value)} />}
          </div>)}
    </div>
    <Textarea
      label="Otros hábitos"
      value={form.personal.otherHabits}
      onChange={(v) => update('personal', 'otherHabits', v)} />
  </Section>;
}
