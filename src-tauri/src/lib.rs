use rusqlite::{params, Connection};
use serde_json::Value;
use std::fs;
use std::path::PathBuf;
use tauri::Manager;

fn database_path(app: &tauri::AppHandle) -> Result<PathBuf, String> {
    let directory = app.path().app_data_dir().map_err(|error| error.to_string())?;
    fs::create_dir_all(&directory).map_err(|error| error.to_string())?;
    Ok(directory.join("historias-clinicas.sqlite"))
}

fn connection(app: &tauri::AppHandle) -> Result<Connection, String> {
    let connection = Connection::open(database_path(app)?).map_err(|error| error.to_string())?;
    connection.execute_batch(
        "CREATE TABLE IF NOT EXISTS patients (
          id TEXT PRIMARY KEY,
          patient_name TEXT NOT NULL,
          identification TEXT NOT NULL,
          record_number TEXT,
          payload TEXT NOT NULL,
          created_at TEXT NOT NULL
        );",
    ).map_err(|error| error.to_string())?;
    Ok(connection)
}

#[tauri::command]
fn save_patient(app: tauri::AppHandle, patient: Value) -> Result<(), String> {
    let connection = connection(&app)?;
    let id = patient.get("id").and_then(Value::as_str).ok_or("El expediente no tiene identificador")?;
    let patient_data = patient.get("patient").ok_or("El expediente no tiene datos del paciente")?;
    let name = patient_data.get("name").and_then(Value::as_str).unwrap_or_default();
    let identification = patient_data.get("idNumber").and_then(Value::as_str).unwrap_or_default();
    let record_number = patient_data.get("recordNumber").and_then(Value::as_str).unwrap_or_default();
    let created_at = patient.get("createdAt").and_then(Value::as_str).unwrap_or_default();
    connection.execute(
        "INSERT OR REPLACE INTO patients (id, patient_name, identification, record_number, payload, created_at) VALUES (?1, ?2, ?3, ?4, ?5, ?6)",
        params![id, name, identification, record_number, patient.to_string(), created_at],
    ).map_err(|error| error.to_string())?;
    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![save_patient])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
