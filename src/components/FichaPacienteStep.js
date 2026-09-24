import React from 'react';
import { Field, Section } from './ClinicalFormControls';

export function FichaPacienteStep({ form, update }) {
  return <Section eyebrow="IV. Datos personales" title="Identificación del paciente">
    <div className="form-grid">
      <Field label="Nombre y apellido" required value={form.patient.name} onChange={(v) => update('patient', 'name', v)} />
      <Field label="No. de expediente" value={form.patient.recordNumber} readOnly onChange={() => { }} />
      <Field label="No. de cédula" required value={form.patient.idNumber} onChange={(v) => update('patient', 'idNumber', v)} />
      <Field label="Fecha de nacimiento" type="date" value={form.patient.birthDate} onChange={(v) => update('patient', 'birthDate', v)} />
      <Field label="Edad" type="number" value={form.patient.age} onChange={(v) => update('patient', 'age', v)} />
      <Field label="Teléfono" value={form.patient.phone} onChange={(v) => update('patient', 'phone', v)} />
      <Field label="Establecimiento de salud" value={form.patient.facility} onChange={(v) => update('patient', 'facility', v)} />
      <Field label="Servicio y sala" value={form.patient.service} onChange={(v) => update('patient', 'service', v)} />
      <Field label="No. de cama" value={form.patient.bed} onChange={(v) => update('patient', 'bed', v)} />
      <Field label="Sexo" value={form.patient.sex} onChange={(v) => update('patient', 'sex', v)} />
      <Field label="Procedencia" value={form.patient.address} onChange={(v) => update('patient', 'address', v)} />
      <Field label="Profesión u oficio" value={form.patient.occupation} onChange={(v) => update('patient', 'occupation', v)} />
      <Field label="Religión" value={form.patient.religion} onChange={(v) => update('patient', 'religion', v)} />
      <Field label="Nombre del padre / madre" value={form.patient.source} onChange={(v) => update('patient', 'source', v)} />
      <Field label="Confiabilidad de la información" value={form.patient.reliability} onChange={(v) => update('patient', 'reliability', v)} />
    </div>
  </Section>;
}
