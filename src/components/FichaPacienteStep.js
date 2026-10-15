import React, { useEffect, useRef, useState } from 'react';
import { Field, Section, SelectField } from './ClinicalFormControls';

function calculateAge(birthDate) {
  if (!birthDate) return '';

  const [year, month, day] = birthDate.split('-').map(Number);
  const today = new Date();
  let age = today.getFullYear() - year;

  if (
    today.getMonth() + 1 < month ||
    (today.getMonth() + 1 === month && today.getDate() < day)
  ) {
    age -= 1;
  }

  return age >= 0 ? String(age) : '';
}

export function FichaPacienteStep({ form, update }) {
  const [idLookupState, setIdLookupState] = useState('idle');
  const retryTimerRef = useRef(null);

  const clearRetryTimer = () => {
    if (retryTimerRef.current) {
      clearTimeout(retryTimerRef.current);
      retryTimerRef.current = null;
    }
  };

  useEffect(() => () => clearRetryTimer(), []);

  const lookupCedula = async (cedula) => {
    if (!/^\d{9}$/.test(cedula)) {
      setIdLookupState('idle');
      return;
    }

    setIdLookupState('loading');

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    try {
      const response = await fetch(`https://api.hacienda.go.cr/fe/ae?identificacion=${cedula}`, {
        method: 'GET',
        headers: { Accept: 'application/json' },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error('Consulta fallida');
      }

      const data = await response.json();

      if (!data || typeof data.nombre !== 'string' || !data.nombre.trim()) {
        throw new Error('Sin nombre en la respuesta');
      }

      update('patient', 'name', data.nombre.trim());
      setIdLookupState('success');
    } catch (error) {
      clearTimeout(timeoutId);
      setIdLookupState('error');
      retryTimerRef.current = setTimeout(() => setIdLookupState('retry'), 2000);
    }
  };

  const handleBirthDateChange = (birthDate) => {
    update('patient', 'birthDate', birthDate);
    update('patient', 'age', calculateAge(birthDate));
  };

  const handleIdNumberChange = (value) => {
    const sanitized = value.replace(/\D/g, '').slice(0, 9);
    update('patient', 'idNumber', sanitized);
    clearRetryTimer();

    if (sanitized.length !== 9) {
      setIdLookupState('idle');
      return;
    }

    lookupCedula(sanitized);
  };

  const renderLookupState = () => {
    if (idLookupState === 'loading') {
      return <span className="field-status field-status-loading" aria-label="Consultando cédula" title="Consultando cédula"><span className="spinner" /></span>;
    }

    if (idLookupState === 'error') {
      return <span className="field-status field-status-error" aria-label="Error en la consulta" title="Error en la consulta">✕</span>;
    }

    if (idLookupState === 'retry') {
      return <button type="button" className="field-status field-status-retry" aria-label="Reintentar consulta" title="Reintentar consulta" onClick={() => lookupCedula(form.patient.idNumber)}><span>↻</span></button>;
    }

    if (idLookupState === 'success') {
      return <span className="field-status field-status-success" aria-label="Consulta exitosa" title="Consulta exitosa">✓</span>;
    }

    return null;
  };

  return <>
    <style>{`
      .field-input-wrap {
        position: relative;
        display: flex;
        align-items: center;
      }
      .field-input-wrap input {
        padding-right: 42px;
      }
      .field-input-suffix {
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .field-status {
        width: 20px;
        height: 20px;
        border: none;
        background: transparent;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        line-height: 1;
        padding: 0;
      }
      .field-status-loading {
        color: var(--teal);
      }
      .field-status-error {
        color: #d93025;
        font-weight: 700;
      }
      .field-status-success {
        color: #1f9d6a;
        font-weight: 700;
      }
      .field-status-retry {
        color: var(--teal);
        cursor: pointer;
        font-size: 18px;
      }
      .spinner {
        width: 14px;
        height: 14px;
        border: 2px solid rgba(21, 122, 120, 0.25);
        border-top-color: var(--teal);
        border-radius: 50%;
        display: inline-block;
        animation: spin 0.8s linear infinite;
      }
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `}</style>
    <Section eyebrow="IV. Datos personales" title="Identificación del paciente">
      <div className="form-grid">
        <Field label="No. de cédula" required value={form.patient.idNumber} inputMode="numeric" maxLength={9} onChange={handleIdNumberChange} rightElement={renderLookupState()} />
        <Field label="Nombre y apellido" required value={form.patient.name} onChange={(v) => update('patient', 'name', v)} />
        <Field label="No. de expediente" value={form.patient.recordNumber} readOnly onChange={() => { }} />
        <Field label="Fecha de nacimiento" type="date" value={form.patient.birthDate} onChange={handleBirthDateChange} />
        <Field label="Edad" type="number" value={form.patient.age} readOnly onChange={() => { }} />
        <Field label="Teléfono" value={form.patient.phone} onChange={(v) => update('patient', 'phone', v)} />
        <Field label="Establecimiento de salud" value={form.patient.facility} onChange={(v) => update('patient', 'facility', v)} />
        <Field label="Servicio y sala" value={form.patient.service} onChange={(v) => update('patient', 'service', v)} />
        <Field label="No. de cama" value={form.patient.bed} onChange={(v) => update('patient', 'bed', v)} />
        <SelectField label="Sexo" value={form.patient.sex} onChange={(v) => update('patient', 'sex', v)} options={['Masculino', 'Femenino']} required />
        <Field label="Procedencia" value={form.patient.address} onChange={(v) => update('patient', 'address', v)} />
        <Field label="Profesión u oficio" value={form.patient.occupation} onChange={(v) => update('patient', 'occupation', v)} />
        <Field label="Religión" value={form.patient.religion} onChange={(v) => update('patient', 'religion', v)} />
        <Field label="Nombre del padre / madre" value={form.patient.NombrePadreMadre} onChange={(v) => update('patient', 'NombrePadreMadre', v)} />
        <Field label="Confiabilidad de la información" value={form.patient.reliability} onChange={(v) => update('patient', 'reliability', v)} />
      </div>
    </Section>
  </>;
}
