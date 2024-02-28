use tauri::State;

use crate::models;

#[tauri::command]
pub fn start(state: State<models::State>) {
    state.0.lock().unwrap().start();
}
