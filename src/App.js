import React, { useMemo, useState } from 'react';
import './App.css';
import { renderClinicalStep } from './components/ClinicalStepSections';
import { RecordSummary } from './components/RecordSummary';

const STORAGE_KEY = 'expediente-medico-records';

const steps = [
  { id: 'ficha', number: '01', label: 'Ficha del paciente', description: 'Datos de identificación' },
  { id: 'consulta', number: '02', label: 'Consulta', description: 'Motivo e historia actual' },
  { id: 'revision', number: '03', label: 'Revisión por sistemas', description: 'Síntomas referidos' },
  { id: 'familiares', number: '04', label: 'Antecedentes familiares', description: 'Patológicos y hereditarios' },
  { id: 'noPatologicos', number: '05', label: 'Antecedentes personales', description: 'Hábitos y medicamentos' },
  { id: 'patologicos', number: '06', label: 'Antecedentes patológicos', description: 'Enfermedades y cirugías' },
  { id: 'gineco', number: '07', label: 'Gineco-obstétricos', description: 'Historia laboral y reproductiva' },
  { id: 'examen', number: '08', label: 'Examen físico', description: 'Signos, observaciones y diagnóstico' },
];

const emptyForm = {
  patient: { name: '', recordNumber: '', idNumber: '', birthDate: '', age: '', sex: '', phone: '', address: '', occupation: '', religion: '', facility: '', service: '', room: '', bed: '', NombrePadreMadre: '', reliability: 'Confiable' },
  consultation: { reason: '', currentIllness: '' },
  review: { selected: [], findings: '' },
  family: { infectious: [], hereditary: [], other: '' },
  personal: { immunizations: '', sleepHours: '', activity: '', nutrition: '', smoking: false, smokingDetails: '', alcohol: false, alcoholDetails: '', drugs: false, drugsDetails: '', medications: false, medicationDetails: '', otherHabits: '' },
  pathology: { infectious: '', chronic: '', surgeries: '', hospitalizations: '' },
  gineco: { menarche: '', activeSexualLife: '', partners: '', pregnancies: '', births: '', cesareans: '', abortions: '', livingChildren: '', contraception: '', pap: '', work: '', workplace: '', occupation: '', exposure: '', workHistory: '' },
  examination: { vitals: { fc: '', fr: '', bp: '', temperature: '' }, anthropometry: { weight: '', height: '', bmi: '' }, general: '', skin: '', headNeck: '', thorax: '', abdomen: '', extremities: '', neurologic: '', observations: '', diagnoses: '' },
};

export function validateRequiredPatientFields(form) {
  const patient = form?.patient || {};
  const requiredFields = [
    { key: 'name', label: 'Nombre y apellido', value: patient.name },
    { key: 'idNumber', label: 'No. de cédula', value: patient.idNumber },
    { key: 'sex', label: 'Sexo', value: patient.sex },
  ];

  return requiredFields
    .filter(({ value }) => !String(value ?? '').trim())
    .map(({ label }) => label);
}

function createRecordNumber(records) {
  const now = new Date();
  const date = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0'),
  ].join('');
  const prefix = `EXP-${date}-`;
  const usedNumbers = new Set(
    records
      .map((record) => (record.patient && record.patient.recordNumber) || '')
      .filter(Boolean),
  );
  let nextNumber = 1;
  let candidate = `${prefix}${String(nextNumber).padStart(4, '0')}`;

  while (usedNumbers.has(candidate)) {
    nextNumber += 1;
    candidate = `${prefix}${String(nextNumber).padStart(4, '0')}`;
  }

  return candidate;
}

function App() {
  const [records, setRecords] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
  });
  const [form, setForm] = useState(emptyForm);
  const [activeStep, setActiveStep] = useState(0);
  const [mode, setMode] = useState('list');
  const [query, setQuery] = useState('');
  const [notice, setNotice] = useState('');
  const [selectedRecord, setSelectedRecord] = useState(null);

  const update = (section, field, value) => setForm((current) => ({ ...current, [section]: { ...current[section], [field]: value } }));
  const filteredRecords = useMemo(() => records.filter((record) => `${record.patient.name} ${record.patient.idNumber} ${record.patient.recordNumber}`.toLowerCase().includes(query.toLowerCase())), [records, query]);
  const current = steps[activeStep];

  const startNew = () => {
    setForm({
      ...JSON.parse(JSON.stringify(emptyForm)),
      patient: {
        ...emptyForm.patient,
        recordNumber: createRecordNumber(records),
      },
    });
    setActiveStep(0);
    setMode('wizard');
    setNotice('');
  };
  const saveRecord = async () => {
    const missingRequiredFields = validateRequiredPatientFields(form);
    if (missingRequiredFields.length) {
      setNotice(`Completa los campos requeridos: ${missingRequiredFields.join(', ')}.`);
      setActiveStep(0);
      return;
    }

    const recordNumberInUse = records.some((record) => record.id !== form.id && record.patient && record.patient.recordNumber === form.patient.recordNumber);
    if (recordNumberInUse) {
      setNotice('El número de expediente ya existe. Inicia un expediente nuevo para generar otro número.');
      setActiveStep(0);
      return;
    }
    const record = { ...form, id: form.id || (crypto.randomUUID ? crypto.randomUUID() : String(Date.now())), createdAt: form.createdAt || new Date().toISOString() };
    const next = form.id ? records.map((item) => item.id === form.id ? record : item) : [record, ...records];
    setForm(record);
    setRecords(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    if (window.__TAURI_INTERNALS__) {
      try {
        const { invoke } = await import('@tauri-apps/api/core');
        await invoke('save_patient', { patient: record });
      } catch (error) { console.error('No fue posible guardar en SQLite:', error); setNotice('El expediente quedó guardado localmente, pero SQLite no respondió.'); return; }
    }
    setNotice('Expediente guardado correctamente.');
    setMode('list');
  };
  const openRecord = (record) => { setSelectedRecord(record); setMode('summary'); };
  const editRecord = () => { setForm(selectedRecord); setActiveStep(0); setMode('wizard'); setNotice(''); };

  const renderStep = () => renderClinicalStep({ current, form, update });

  if (mode === 'summary') return <RecordSummary record={selectedRecord} onBack={() => setMode('list')} onEdit={editRecord} />;

  if (mode === 'list') return <div className="app-shell"><aside className="sidebar"><div className="brand"><span className="brand-mark">+</span><div><strong>Clínica</strong><small>Historia médica</small></div></div><div className="sidebar-status"><span className="status-dot" /> Base local SQLite<br /><small>Datos bajo tu control</small></div><div className="sidebar-footer">Versión inicial<br />Expedientes clínicos</div></aside><main className="main-area"><header className="topbar"><div><p className="kicker">GESTIÓN CLÍNICA</p><h1>Expedientes</h1><p className="muted">Administra las historias clínicas de tus pacientes.</p></div><button className="button button-primary" onClick={startNew}><span>＋</span> Nuevo expediente</button></header><div className="metrics"><div><span>Expedientes registrados</span><strong>{records.length}</strong></div><div><span>Último registro</span><strong>{records[0] ? new Date(records[0].createdAt).toLocaleDateString('es-NI') : '—'}</strong></div><div><span>Estado de almacenamiento</span><strong className="storage-ok">● Local</strong></div></div><div className="table-card"><div className="table-toolbar"><div><h2>Pacientes</h2><p>{records.length ? 'Consulta y continúa trabajando en un expediente.' : 'Comienza registrando el primer expediente.'}</p></div><label className="search"><span>⌕</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar por nombre o cédula" /></label></div>{filteredRecords.length ? <div className="record-list">{filteredRecords.map((record) => <div className="record-row" key={record.id}><div className="avatar">{record.patient.name.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase() || 'P'}</div><div className="record-name"><strong>{record.patient.name}</strong><span>{record.patient.idNumber || 'Sin cédula'}</span></div><div className="record-meta"><span>Expediente</span><strong>{record.patient.recordNumber || 'Sin número'}</strong></div><div className="record-meta"><span>Registrado</span><strong>{new Date(record.createdAt).toLocaleDateString('es-NI')}</strong></div>  <button className="row-action" onClick={() => openRecord(record)}>Abrir →</button><button className="row-action row-edit" onClick={() => { setForm(record); setActiveStep(0); setMode('wizard'); setNotice(''); }}>Editar ✎</button></div>)}</div> : <div className="empty-state"><div className="empty-icon">＋</div><h3>No hay expedientes todavía</h3><p>Registra los datos de tu primer paciente en unos minutos.</p><button className="button button-secondary" onClick={startNew}>Crear expediente</button></div>}</div>{notice && <div className="toast">{notice}</div>}</main></div>;

  return <div className="wizard-shell"><header className="wizard-topbar"><button className="back-link" onClick={() => setMode('list')}>← Expedientes</button><div className="wizard-title"><span>Nuevo expediente</span><small>Guardado local automático al finalizar</small></div><div className="step-counter">Paso <strong>{activeStep + 1}</strong> de {steps.length}</div></header><div className="wizard-layout"><nav className="step-nav"><div className="step-nav-caption">HISTORIA CLÍNICA</div>{steps.map((step, index) => <button className={`step-item ${activeStep === index ? 'active' : ''} ${activeStep > index ? 'complete' : ''}`} key={step.id} onClick={() => setActiveStep(index)}><span className="step-number">{activeStep > index ? '✓' : step.number}</span><span><strong>{step.label}</strong><small>{step.description}</small></span></button>)}</nav><main className="wizard-content"><div className="content-intro"><div><p className="kicker">PASO {current.number}</p><h1>{current.label}</h1><p className="muted">{current.description}</p></div><div className="progress"><span style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }} /></div></div>{renderStep()}<div className="wizard-actions"><button className="button button-ghost" onClick={() => activeStep ? setActiveStep(activeStep - 1) : setMode('list')}>← Atrás</button>{activeStep < steps.length - 1 ? <button className="button button-primary" onClick={() => setActiveStep(activeStep + 1)}>Continuar <span>→</span></button> : <button className="button button-primary" onClick={saveRecord}>Guardar expediente <span>✓</span></button>}</div>{notice && <div className="inline-notice">{notice}</div>}</main></div></div>;
}

export default App;
