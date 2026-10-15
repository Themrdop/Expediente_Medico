import React from 'react';

function SummaryItem({ label, value }) {
  return <div className="summary-item"><span>{label}</span><strong>{value || 'No registrado'}</strong></div>;
}

export function RecordSummary({ record, onBack, onEdit }) {
  const { patient, consultation, examination, createdAt } = record;

  return (
  <div className="app-shell">
    <aside className="sidebar">
      <div className="brand">
        <span className="brand-mark">+</span>
        <div>
          <strong>Clínica</strong>
          <small>Historia médica</small>
        </div></div>
      <div className="sidebar-status">
        <span className="status-dot" /> Base local SQLite<br />
        <small>Datos bajo tu control</small>
      </div>
      <div className="sidebar-footer">
        Versión inicial<br />Expedientes clínicos
      </div>
    </aside>
    <main className="main-area">
      <button className="back-link summary-back" onClick={onBack}>
        ← Expedientes
      </button>
      <header className="summary-header">
        <div>
          <p className="kicker">HISTORIA CLÍNICA</p>
          <h1>{patient.name}</h1>
          <p className="muted">
            Expediente {patient.recordNumber || 'Sin número'} · Registrado el {new Date(createdAt).toLocaleDateString('es-NI')}
          </p>
        </div>
        <button className="button button-primary" onClick={onEdit}>
          Editar expediente <span>✎</span>
        </button>
      </header>
      <div className="summary-card">
        <div className="summary-card-heading">
          <div className="avatar summary-avatar">{patient.name.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase() || 'P'}
          </div>
          <div>
            <h2>Datos del paciente</h2>
            <p>Información principal del expediente</p>
          </div>
        </div>
        <div className="summary-grid">
          <SummaryItem label="No. de cédula" value={patient.idNumber} />
          <SummaryItem label="Fecha de nacimiento" value={patient.birthDate} />
          <SummaryItem label="Edad" value={patient.age ? `${patient.age} años` : ''} />
          <SummaryItem label="Sexo" value={patient.sex} />
          <SummaryItem label="Teléfono" value={patient.phone} />
          <SummaryItem label="Profesión u oficio" value={patient.occupation} />
          <SummaryItem label="Establecimiento de salud" value={patient.facility} />
          <SummaryItem label="Servicio y sala" value={patient.service} />
        </div>
      </div>
      <div className="summary-columns">
        <section className="summary-card">
          <p className="kicker">CONSULTA</p>
          <h2>Motivo e historia actual</h2>
          <div className="summary-text">
            <h3>Motivo de consulta</h3>
            <p>{consultation.reason || 'No registrado'}</p>
            <h3>Historia de la enfermedad actual</h3>
            <p>{consultation.currentIllness || 'No registrado'}</p>
          </div>
        </section>
        <section className="summary-card">
          <p className="kicker">EXAMEN FÍSICO</p>
          <h2>Observaciones y diagnóstico</h2>
          <div className="summary-text">
            <h3>Observaciones</h3>
            <p>{examination.observations || 'No registrado'}</p>
            <h3>Diagnósticos o problemas</h3>
            <p>{examination.diagnoses || 'No registrado'}</p>
          </div>
        </section>
      </div>
    </main>
  </div>
  );
}
