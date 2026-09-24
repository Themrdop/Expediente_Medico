import React, { useMemo, useState } from 'react';
import './App.css';

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

const systemGroups = {
  Generales: ['Cambios de peso', 'Fiebre', 'Hipotermia', 'Escalofrío', 'Sudoración', 'Debilidad', 'Mal estado general'],
  Cabeza: ['Cefalea', 'Alopecia', 'Trauma', 'Seborrea', 'Leucemia', 'Pediculosis', 'Tiña'],
  Ojos: ['Vista diplopía', 'Enfermedad inflamatoria', 'Sensación de quemazón', 'Lagrimeo', 'Fotofobia', 'Exoftalmos', 'Cuerpos extraños'],
  Respiratorio: ['Dolor en punta de costado', 'Disnea', 'Tos', 'Expectoración', 'Hemoptisis', 'Cianosis'],
  Digestivo: ['Pérdida del apetito', 'Dispepsia', 'Eructos', 'Pirosis', 'Náusea', 'Vómito', 'Diarrea', 'Ictericia'],
  Genitourinario: ['Disuria', 'Poliuria', 'Polaquiuria', 'Oliguria', 'Nicturia', 'Hematuria', 'Incontinencia'],
  Neurológico: ['Trastornos de conciencia', 'Trastornos de sueño', 'Convulsiones', 'Pérdida de memoria', 'Pérdida de sensibilidad', 'Ansiedad'],
};

const emptyForm = {
  patient: { name: '', recordNumber: '', idNumber: '', birthDate: '', age: '', sex: '', phone: '', address: '', occupation: '', religion: '', facility: '', service: '', room: '', bed: '', source: 'Paciente', reliability: 'Confiable' },
  consultation: { reason: '', currentIllness: '' },
  review: { selected: [], findings: '' },
  family: { infectious: [], hereditary: [], other: '' },
  personal: { immunizations: '', sleepHours: '', activity: '', nutrition: '', smoking: false, smokingDetails: '', alcohol: false, alcoholDetails: '', drugs: false, drugsDetails: '', medications: false, medicationDetails: '', otherHabits: '' },
  pathology: { infectious: '', chronic: '', surgeries: '', hospitalizations: '' },
  gineco: { menarche: '', activeSexualLife: '', partners: '', pregnancies: '', births: '', cesareans: '', abortions: '', livingChildren: '', contraception: '', pap: '', work: '', workplace: '', occupation: '', exposure: '', workHistory: '' },
  examination: { vitals: { fc: '', fr: '', bp: '', temperature: '' }, anthropometry: { weight: '', height: '', bmi: '' }, general: '', skin: '', headNeck: '', thorax: '', abdomen: '', extremities: '', neurologic: '', observations: '', diagnoses: '' },
};

const infectiousOptions = ['Hepatitis', 'Sífilis', 'TB', 'Cólera', 'Amebiasis', 'Tosferina', 'Sarampión', 'Varicela', 'Rubéola', 'Parotiditis', 'Meningitis', 'Impétigo', 'Fiebre tifoidea', 'Escarlatina', 'Malaria', 'Escabiosis', 'Pediculosis', 'Tiña'];
const hereditaryOptions = ['Alergias', 'Diabetes mellitus', 'Hipertensión arterial', 'Enfermedad reumática', 'Enfermedad renal', 'Enfermedades oculares', 'Enfermedades cardiacas', 'Enfermedades hepáticas', 'Enfermedades musculares', 'Malformaciones congénitas', 'Desórdenes mentales'];

function Field({ label, value, onChange, type = 'text', placeholder, required }) {
  return <label className="field"><span>{label}{required && <b> *</b>}</span><input type={type} value={value || ''} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} /></label>;
}

function Textarea({ label, value, onChange, placeholder }) {
  return <label className="field field-wide"><span>{label}</span><textarea value={value || ''} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} /></label>;
}

function CheckboxGroup({ options, selected, onChange }) {
  const toggle = (option) => onChange(selected.includes(option) ? selected.filter((item) => item !== option) : [...selected, option]);
  return <div className="check-grid">{options.map((option) => <label className="check" key={option}><input type="checkbox" checked={selected.includes(option)} onChange={() => toggle(option)} /><span>{option}</span></label>)}</div>;
}

function Section({ title, eyebrow, children }) {
  return <section className="form-section"><div className="section-heading"><div><small>{eyebrow}</small><h2>{title}</h2></div></div>{children}</section>;
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

  const update = (section, field, value) => setForm((current) => ({ ...current, [section]: { ...current[section], [field]: value } }));
  const filteredRecords = useMemo(() => records.filter((record) => `${record.patient.name} ${record.patient.idNumber} ${record.patient.recordNumber}`.toLowerCase().includes(query.toLowerCase())), [records, query]);
  const current = steps[activeStep];

  const startNew = () => { setForm(JSON.parse(JSON.stringify(emptyForm))); setActiveStep(0); setMode('wizard'); setNotice(''); };
  const saveRecord = async () => {
    if (!form.patient.name.trim() || !form.patient.idNumber.trim()) { setNotice('Completa el nombre y la cédula antes de guardar.'); setActiveStep(0); return; }
    const record = { ...form, id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()), createdAt: new Date().toISOString() };
    const next = [record, ...records];
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

  const renderStep = () => {
    if (current.id === 'ficha') return <Section eyebrow="IV. Datos personales" title="Identificación del paciente"><div className="form-grid"><Field label="Nombre y apellido" required value={form.patient.name} onChange={(v) => update('patient', 'name', v)} /><Field label="No. de expediente" value={form.patient.recordNumber} onChange={(v) => update('patient', 'recordNumber', v)} /><Field label="No. de cédula" required value={form.patient.idNumber} onChange={(v) => update('patient', 'idNumber', v)} /><Field label="Fecha de nacimiento" type="date" value={form.patient.birthDate} onChange={(v) => update('patient', 'birthDate', v)} /><Field label="Edad" type="number" value={form.patient.age} onChange={(v) => update('patient', 'age', v)} /><Field label="Teléfono" value={form.patient.phone} onChange={(v) => update('patient', 'phone', v)} /><Field label="Establecimiento de salud" value={form.patient.facility} onChange={(v) => update('patient', 'facility', v)} /><Field label="Servicio y sala" value={form.patient.service} onChange={(v) => update('patient', 'service', v)} /><Field label="No. de cama" value={form.patient.bed} onChange={(v) => update('patient', 'bed', v)} /><Field label="Sexo" value={form.patient.sex} onChange={(v) => update('patient', 'sex', v)} /><Field label="Procedencia" value={form.patient.address} onChange={(v) => update('patient', 'address', v)} /><Field label="Profesión u oficio" value={form.patient.occupation} onChange={(v) => update('patient', 'occupation', v)} /><Field label="Religión" value={form.patient.religion} onChange={(v) => update('patient', 'religion', v)} /><Field label="Nombre del padre / madre" value={form.patient.source} onChange={(v) => update('patient', 'source', v)} /><Field label="Confiabilidad de la información" value={form.patient.reliability} onChange={(v) => update('patient', 'reliability', v)} /></div></Section>;
    if (current.id === 'consulta') return <><Section eyebrow="V. Motivo de consulta" title="Razón de la visita"><Textarea label="Motivo de consulta" value={form.consultation.reason} onChange={(v) => update('consultation', 'reason', v)} placeholder="Describe el motivo principal de la consulta..." /></Section><Section eyebrow="VI. Historia de la enfermedad actual" title="Evolución del padecimiento"><Textarea label="Historia de la enfermedad actual" value={form.consultation.currentIllness} onChange={(v) => update('consultation', 'currentIllness', v)} placeholder="Inicio, evolución, síntomas asociados y tratamientos previos..." /></Section></>;
    if (current.id === 'revision') return <Section eyebrow="VII. Revisión por aparatos y sistemas" title="Síntomas referidos"><div className="system-list">{Object.entries(systemGroups).map(([group, options]) => <div className="system-row" key={group}><h3>{group}</h3><CheckboxGroup options={options} selected={form.review.selected} onChange={(value) => update('review', 'selected', value)} /></div>)}</div><Textarea label="Otros hallazgos en el interrogatorio" value={form.review.findings} onChange={(v) => update('review', 'findings', v)} /></Section>;
    if (current.id === 'familiares') return <><Section eyebrow="VIII. Antecedentes familiares patológicos" title="Enfermedades infecto-contagiosas"><CheckboxGroup options={infectiousOptions} selected={form.family.infectious} onChange={(value) => update('family', 'infectious', value)} /></Section><Section eyebrow="Antecedentes familiares" title="Enfermedades hereditarias"><CheckboxGroup options={hereditaryOptions} selected={form.family.hereditary} onChange={(value) => update('family', 'hereditary', value)} /><Field label="Otros antecedentes" value={form.family.other} onChange={(v) => update('family', 'other', v)} /></Section></>;
    if (current.id === 'noPatologicos') return <Section eyebrow="IX. Antecedentes personales no patológicos" title="Hábitos, inmunizaciones y medicamentos"><div className="form-grid"><Field label="Inmunizaciones completas" value={form.personal.immunizations} onChange={(v) => update('personal', 'immunizations', v)} /><Field label="Horas de sueño" value={form.personal.sleepHours} onChange={(v) => update('personal', 'sleepHours', v)} /><Field label="Tipo y hora de actividad física" value={form.personal.activity} onChange={(v) => update('personal', 'activity', v)} /><Field label="Alimentación" value={form.personal.nutrition} onChange={(v) => update('personal', 'nutrition', v)} /></div><div className="habit-grid">{[['smoking', 'Tabaco', 'smokingDetails'], ['alcohol', 'Alcohol', 'alcoholDetails'], ['drugs', 'Drogas ilegales', 'drugsDetails'], ['medications', 'Fármacos actuales', 'medicationDetails']].map(([key, label, detail]) => <div className="habit-card" key={key}><label className="switch-row"><input type="checkbox" checked={form.personal[key]} onChange={(e) => update('personal', key, e.target.checked)} /><span>{label}</span></label>{form.personal[key] && <input value={form.personal[detail]} placeholder="Tipo, cantidad y frecuencia" onChange={(e) => update('personal', detail, e.target.value)} />}</div>)}</div><Textarea label="Otros hábitos" value={form.personal.otherHabits} onChange={(v) => update('personal', 'otherHabits', v)} /></Section>;
    if (current.id === 'patologicos') return <Section eyebrow="X. Antecedentes personales patológicos" title="Historial clínico"><Textarea label="Enfermedades infecto-contagiosas previas (registrar fecha)" value={form.pathology.infectious} onChange={(v) => update('pathology', 'infectious', v)} /><Textarea label="Enfermedades crónicas" value={form.pathology.chronic} onChange={(v) => update('pathology', 'chronic', v)} /><Textarea label="Cirugías previas realizadas" value={form.pathology.surgeries} onChange={(v) => update('pathology', 'surgeries', v)} /><Textarea label="Hospitalizaciones (fecha y causa)" value={form.pathology.hospitalizations} onChange={(v) => update('pathology', 'hospitalizations', v)} /></Section>;
    if (current.id === 'gineco') return <><Section eyebrow="XI. Antecedentes gineco-obstétricos" title="Historia reproductiva"><div className="form-grid"><Field label="Menarca" value={form.gineco.menarche} onChange={(v) => update('gineco', 'menarche', v)} /><Field label="Inicio de vida sexual activa" value={form.gineco.activeSexualLife} onChange={(v) => update('gineco', 'activeSexualLife', v)} /><Field label="Número de compañeros sexuales" value={form.gineco.partners} onChange={(v) => update('gineco', 'partners', v)} /><Field label="Gestaciones" value={form.gineco.pregnancies} onChange={(v) => update('gineco', 'pregnancies', v)} /><Field label="Partos" value={form.gineco.births} onChange={(v) => update('gineco', 'births', v)} /><Field label="Cesáreas" value={form.gineco.cesareans} onChange={(v) => update('gineco', 'cesareans', v)} /><Field label="Abortos" value={form.gineco.abortions} onChange={(v) => update('gineco', 'abortions', v)} /><Field label="Hijos vivos" value={form.gineco.livingChildren} onChange={(v) => update('gineco', 'livingChildren', v)} /><Field label="Planificación familiar / método" value={form.gineco.contraception} onChange={(v) => update('gineco', 'contraception', v)} /><Field label="Resultado y fecha del último PAP" value={form.gineco.pap} onChange={(v) => update('gineco', 'pap', v)} /></div></Section><Section eyebrow="XII. Historia laboral" title="Exposición ocupacional"><div className="form-grid"><Field label="Trabajo actual" value={form.gineco.work} onChange={(v) => update('gineco', 'work', v)} /><Field label="Lugar de trabajo" value={form.gineco.workplace} onChange={(v) => update('gineco', 'workplace', v)} /><Field label="Oficio o actividad" value={form.gineco.occupation} onChange={(v) => update('gineco', 'occupation', v)} /><Field label="Exposición a sustancias" value={form.gineco.exposure} onChange={(v) => update('gineco', 'exposure', v)} /></div><Textarea label="Descripción de la actividad y antecedentes laborales" value={form.gineco.workHistory} onChange={(v) => update('gineco', 'workHistory', v)} /></Section></>;
    return <><Section eyebrow="XIII. Examen físico" title="Signos vitales y antropometría"><div className="form-grid"><Field label="Frecuencia cardíaca (FC)" value={form.examination.vitals.fc} onChange={(v) => update('examination', 'vitals', { ...form.examination.vitals, fc: v })} /><Field label="Frecuencia respiratoria (FR)" value={form.examination.vitals.fr} onChange={(v) => update('examination', 'vitals', { ...form.examination.vitals, fr: v })} /><Field label="Presión arterial" value={form.examination.vitals.bp} onChange={(v) => update('examination', 'vitals', { ...form.examination.vitals, bp: v })} /><Field label="Temperatura" value={form.examination.vitals.temperature} onChange={(v) => update('examination', 'vitals', { ...form.examination.vitals, temperature: v })} /><Field label="Peso (kg)" value={form.examination.anthropometry.weight} onChange={(v) => update('examination', 'anthropometry', { ...form.examination.anthropometry, weight: v })} /><Field label="Talla (cm)" value={form.examination.anthropometry.height} onChange={(v) => update('examination', 'anthropometry', { ...form.examination.anthropometry, height: v })} /><Field label="IMC" value={form.examination.anthropometry.bmi} onChange={(v) => update('examination', 'anthropometry', { ...form.examination.anthropometry, bmi: v })} /></div></Section><Section eyebrow="Examen físico" title="Hallazgos clínicos"><div className="exam-grid">{[['general', 'Estado general'], ['skin', 'Piel y mucosas'], ['headNeck', 'Cabeza y cuello'], ['thorax', 'Tórax y campos pulmonares'], ['abdomen', 'Abdomen y pelvis'], ['extremities', 'Extremidades'], ['neurologic', 'Examen neurológico']].map(([key, label]) => <Textarea key={key} label={label} value={form.examination[key]} onChange={(v) => update('examination', key, v)} />)}</div><Textarea label="XIV. Observaciones y análisis" value={form.examination.observations} onChange={(v) => update('examination', 'observations', v)} /><Textarea label="XV. Diagnósticos o problemas" value={form.examination.diagnoses} onChange={(v) => update('examination', 'diagnoses', v)} /></Section></>;
  };

  if (mode === 'list') return <div className="app-shell"><aside className="sidebar"><div className="brand"><span className="brand-mark">+</span><div><strong>Clínica</strong><small>Historia médica</small></div></div><div className="sidebar-status"><span className="status-dot" /> Base local SQLite<br /><small>Datos bajo tu control</small></div><div className="sidebar-footer">Versión inicial<br />Expedientes clínicos</div></aside><main className="main-area"><header className="topbar"><div><p className="kicker">GESTIÓN CLÍNICA</p><h1>Expedientes</h1><p className="muted">Administra las historias clínicas de tus pacientes.</p></div><button className="button button-primary" onClick={startNew}><span>＋</span> Nuevo expediente</button></header><div className="metrics"><div><span>Expedientes registrados</span><strong>{records.length}</strong></div><div><span>Último registro</span><strong>{records[0] ? new Date(records[0].createdAt).toLocaleDateString('es-NI') : '—'}</strong></div><div><span>Estado de almacenamiento</span><strong className="storage-ok">● Local</strong></div></div><div className="table-card"><div className="table-toolbar"><div><h2>Pacientes</h2><p>{records.length ? 'Consulta y continúa trabajando en un expediente.' : 'Comienza registrando el primer expediente.'}</p></div><label className="search"><span>⌕</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar por nombre o cédula" /></label></div>{filteredRecords.length ? <div className="record-list">{filteredRecords.map((record) => <div className="record-row" key={record.id}><div className="avatar">{record.patient.name.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase() || 'P'}</div><div className="record-name"><strong>{record.patient.name}</strong><span>{record.patient.idNumber || 'Sin cédula'}</span></div><div className="record-meta"><span>Expediente</span><strong>{record.patient.recordNumber || 'Sin número'}</strong></div><div className="record-meta"><span>Registrado</span><strong>{new Date(record.createdAt).toLocaleDateString('es-NI')}</strong></div><button className="row-action" onClick={() => { setForm(record); setActiveStep(0); setMode('wizard'); }}>Abrir →</button></div>)}</div> : <div className="empty-state"><div className="empty-icon">＋</div><h3>No hay expedientes todavía</h3><p>Registra los datos de tu primer paciente en unos minutos.</p><button className="button button-secondary" onClick={startNew}>Crear expediente</button></div>}</div>{notice && <div className="toast">{notice}</div>}</main></div>;

  return <div className="wizard-shell"><header className="wizard-topbar"><button className="back-link" onClick={() => setMode('list')}>← Expedientes</button><div className="wizard-title"><span>Nuevo expediente</span><small>Guardado local automático al finalizar</small></div><div className="step-counter">Paso <strong>{activeStep + 1}</strong> de {steps.length}</div></header><div className="wizard-layout"><nav className="step-nav"><div className="step-nav-caption">HISTORIA CLÍNICA</div>{steps.map((step, index) => <button className={`step-item ${activeStep === index ? 'active' : ''} ${activeStep > index ? 'complete' : ''}`} key={step.id} onClick={() => setActiveStep(index)}><span className="step-number">{activeStep > index ? '✓' : step.number}</span><span><strong>{step.label}</strong><small>{step.description}</small></span></button>)}</nav><main className="wizard-content"><div className="content-intro"><div><p className="kicker">PASO {current.number}</p><h1>{current.label}</h1><p className="muted">{current.description}</p></div><div className="progress"><span style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }} /></div></div>{renderStep()}<div className="wizard-actions"><button className="button button-ghost" onClick={() => activeStep ? setActiveStep(activeStep - 1) : setMode('list')}>← Atrás</button>{activeStep < steps.length - 1 ? <button className="button button-primary" onClick={() => setActiveStep(activeStep + 1)}>Continuar <span>→</span></button> : <button className="button button-primary" onClick={saveRecord}>Guardar expediente <span>✓</span></button>}</div>{notice && <div className="inline-notice">{notice}</div>}</main></div></div>;
}

export default App;
