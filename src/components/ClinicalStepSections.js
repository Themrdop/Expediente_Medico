import React from 'react';
import { FichaPacienteStep } from './FichaPacienteStep';
import { ConsultaStep } from './ConsultaStep';
import { RevisionSistemasStep } from './RevisionSistemasStep';
import { AntecedentesFamiliaresStep } from './AntecedentesFamiliaresStep';
import { AntecedentesNoPatologicosStep } from './AntecedentesNoPatologicosStep';
import { AntecedentesPatologicosStep } from './AntecedentesPatologicosStep';
import { GinecoObstetricoStep } from './GinecoObstetricoStep';
import { ExamenFisicoStep } from './ExamenFisicoStep';

const stepComponents = {
  ficha: FichaPacienteStep,
  consulta: ConsultaStep,
  revision: RevisionSistemasStep,
  familiares: AntecedentesFamiliaresStep,
  noPatologicos: AntecedentesNoPatologicosStep,
  patologicos: AntecedentesPatologicosStep,
  gineco: GinecoObstetricoStep,
  examen: ExamenFisicoStep,
};

export function renderClinicalStep({ current, form, update }) {
  const StepComponent = stepComponents[current.id];
  return StepComponent ? <StepComponent form={form} update={update} /> : null;
}
