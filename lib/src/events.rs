use serde::Serialize;

#[derive(Debug, Clone, Serialize)]
pub enum EventsToClient {
    Wake,
}

#[derive(Debug, Copy, Clone, Serialize)]
pub enum Events {
    Meh,
}
