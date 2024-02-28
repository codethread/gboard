use std::sync::{Arc, Mutex};

use lib::{App, EventsToClient};
use tauri::{Manager, Window};

pub struct State(pub Mutex<App>);

impl State {
    pub fn new(window: Window) -> Self {
        let emitter = move |e: EventsToClient| match e {
            EventsToClient::Wake => {
                window.emit_all("wake", ()).unwrap();
            }
        };

        Self(Mutex::new(App::new(Arc::new(emitter))))
    }
}
