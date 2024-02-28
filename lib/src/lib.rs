pub use events::EventsToClient;
use std::sync::Arc;

mod events;

type Emit = Arc<dyn Fn(EventsToClient) + Send + Sync>;

pub struct App {
    /// this is a callback through which the worker communicates with tauri
    emitter: Emit,
}

impl App {
    pub fn new(emitter: Emit) -> Self {
        Self { emitter }
    }

    pub fn start(&mut self) {
        let emitter = self.emitter.clone();
        emitter(EventsToClient::Wake);
    }
}
