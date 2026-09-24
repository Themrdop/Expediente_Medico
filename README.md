# Historia Clínica

Aplicación de escritorio para registrar historias clínicas mediante un wizard de ocho pasos. La interfaz está construida con React y la persistencia de escritorio usa SQLite a través de Tauri.

## Desarrollo web

```bash
npm install
npm start
```

La aplicación web usa `localStorage` como respaldo para permitir revisar el flujo sin Tauri.

## Desarrollo con Tauri

Instala Rust y las dependencias de Tauri siguiendo la [guía oficial](https://tauri.app/start/prerequisites/). Después:

```bash
npm run tauri:dev
```

Los expedientes se guardan en `historias-clinicas.sqlite` dentro del directorio de datos de la aplicación. El comando `save_patient` crea la tabla `patients` automáticamente y almacena el formulario completo en `payload`.

## Generar instalador

```bash
npm run tauri:build
```

El formulario cubre identificación, motivo de consulta, historia actual, revisión por sistemas, antecedentes familiares, antecedentes personales no patológicos, antecedentes patológicos, historia gineco-obstétrica, historia laboral y examen físico.
