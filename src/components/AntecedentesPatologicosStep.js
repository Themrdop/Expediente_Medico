import React from 'react';
import { Section, Textarea } from './ClinicalFormControls';

export function AntecedentesPatologicosStep({ form, update }) {
  return   <Section eyebrow="X. Antecedentes personales patológicos" title="Historial clínico">
    <Textarea label="Enfermedades infecto-contagiosas previas (registrar fecha)"
      value={form.pathology.infectious}
      onChange={(v) => update('pathology', 'infectious', v)} />
    <Textarea label="Enfermedades crónicas"
      value={form.pathology.chronic}
      onChange={(v) => update('pathology', 'chronic', v)} />
    <Textarea label="Cirugías previas realizadas"
      value={form.pathology.surgeries}
      onChange={(v) => update('pathology', 'surgeries', v)} />
    <Textarea label="Hospitalizaciones (fecha y causa)"
      value={form.pathology.hospitalizations}
      onChange={(v) => update('pathology', 'hospitalizations', v)} />
  </Section>;
}
