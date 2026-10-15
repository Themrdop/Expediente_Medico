import React from 'react';
import { Field, Section, Textarea } from './ClinicalFormControls';

export function GinecoObstetricoStep({ form, update }) {
  return <>
    <Section eyebrow="XI. Antecedentes gineco-obstétricos" title="Historia reproductiva">
      <div className="form-grid">
        <Field label="Menarca" value={form.gineco.menarche} onChange={(v) => update('gineco', 'menarche', v)} />
        <Field label="Inicio de vida sexual activa" value={form.gineco.activeSexualLife} onChange={(v) => update('gineco', 'activeSexualLife', v)} />
        <Field label="Número de compañeros sexuales" value={form.gineco.partners} onChange={(v) => update('gineco', 'partners', v)} />
        <Field label="Gestaciones" value={form.gineco.pregnancies} onChange={(v) => update('gineco', 'pregnancies', v)} />
        <Field label="Partos" value={form.gineco.births} onChange={(v) => update('gineco', 'births', v)} />
        <Field label="Cesáreas" value={form.gineco.cesareans} onChange={(v) => update('gineco', 'cesareans', v)} />
        <Field label="Abortos" value={form.gineco.abortions} onChange={(v) => update('gineco', 'abortions', v)} />
        <Field label="Hijos vivos" value={form.gineco.livingChildren} onChange={(v) => update('gineco', 'livingChildren', v)} />
        <Field label="Planificación familiar / método" value={form.gineco.contraception} onChange={(v) => update('gineco', 'contraception', v)} />
        <Field label="Resultado y fecha del último PAP" value={form.gineco.pap} onChange={(v) => update('gineco', 'pap', v)} />
      </div>
    </Section>
    <Section eyebrow="XII. Historia laboral" title="Exposición ocupacional">
      <div className="form-grid">
        <Field label="Trabajo actual" value={form.gineco.work} onChange={(v) => update('gineco', 'work', v)} />
        <Field label="Lugar de trabajo" value={form.gineco.workplace} onChange={(v) => update('gineco', 'workplace', v)} />
        <Field label="Oficio o actividad" value={form.gineco.occupation} onChange={(v) => update('gineco', 'occupation', v)} />
        <Field label="Exposición a sustancias" value={form.gineco.exposure} onChange={(v) => update('gineco', 'exposure', v)} />
      </div>
      <Textarea label="Descripción de la actividad y antecedentes laborales" value={form.gineco.workHistory} onChange={(v) => update('gineco', 'workHistory', v)} />
    </Section>
  </>;
}
