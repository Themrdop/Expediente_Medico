import React from 'react';

export const systemGroups = {
  Generales: ['Cambios de peso', 'Fiebre', 'Hipotermia', 'Escalofrío', 'Sudoración', 'Debilidad', 'Mal estado general'],
  Cabeza: ['Cefalea', 'Alopecia', 'Trauma', 'Seborrea', 'Leucemia', 'Pediculosis', 'Tiña'],
  Ojos: ['Vista diplopía', 'Enfermedad inflamatoria', 'Sensación de quemazón', 'Lagrimeo', 'Fotofobia', 'Exoftalmos', 'Cuerpos extraños'],
  Respiratorio: ['Dolor en punta de costado', 'Disnea', 'Tos', 'Expectoración', 'Hemoptisis', 'Cianosis'],
  Digestivo: ['Pérdida del apetito', 'Dispepsia', 'Eructos', 'Pirosis', 'Náusea', 'Vómito', 'Diarrea', 'Ictericia'],
  Genitourinario: ['Disuria', 'Poliuria', 'Polaquiuria', 'Oliguria', 'Nicturia', 'Hematuria', 'Incontinencia'],
  Neurológico: ['Trastornos de conciencia', 'Trastornos de sueño', 'Convulsiones', 'Pérdida de memoria', 'Pérdida de sensibilidad', 'Ansiedad'],
};

export const infectiousOptions = ['Hepatitis', 'Sífilis', 'TB', 'Cólera', 'Amebiasis', 'Tosferina', 'Sarampión', 'Varicela', 'Rubéola', 'Parotiditis', 'Meningitis', 'Impétigo', 'Fiebre tifoidea', 'Escarlatina', 'Malaria', 'Escabiosis', 'Pediculosis', 'Tiña'];
export const hereditaryOptions = ['Alergias', 'Diabetes mellitus', 'Hipertensión arterial', 'Enfermedad reumática', 'Enfermedad renal', 'Enfermedades oculares', 'Enfermedades cardiacas', 'Enfermedades hepáticas', 'Enfermedades musculares', 'Malformaciones congénitas', 'Desórdenes mentales'];

export function Field({ label, value, onChange, type = 'text', placeholder, required, readOnly = false }) {
  return <label className="field"><span>{label}{required && <b> *</b>}</span><input type={type} value={value || ''} placeholder={placeholder} readOnly={readOnly} onChange={(event) => onChange(event.target.value)} /></label>;
}

export function SelectField({ label, value, onChange, options, required }) {
  return <label className="field"><span>{label}{required && <b> *</b>}</span><select value={value || ''} onChange={(event) => onChange(event.target.value)}><option value="">Selecciona una opción</option>{options.map((option) => <option value={option} key={option}>{option}</option>)}</select></label>;
}

export function Textarea({ label, value, onChange, placeholder }) {
  return <label className="field field-wide"><span>{label}</span><textarea value={value || ''} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} /></label>;
}

export function CheckboxGroup({ options, selected, onChange }) {
  const toggle = (option) => onChange(selected.includes(option) ? selected.filter((item) => item !== option) : [...selected, option]);
  return <div className="check-grid">{options.map((option) => <label className="check" key={option}><input type="checkbox" checked={selected.includes(option)} onChange={() => toggle(option)} /><span>{option}</span></label>)}</div>;
}

export function Section({ title, eyebrow, children }) {
  return <section className="form-section"><div className="section-heading"><div><small>{eyebrow}</small><h2>{title}</h2></div></div>{children}</section>;
}
