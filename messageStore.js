// messageStore.js - Standalone message handler and persistence helper

let globalMessages = [
  {
    id: Date.now(),
    sender: 'admin',
    text: 'System initialized successfully.',
    timestamp: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
];

export function getMessages() {
  return globalMessages;
}

export function addMessage(sender, text, timestamp) {
  const newMessage = {
    id: Date.now(),
    sender: sender || 'client',
    text,
    timestamp: timestamp || new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };
  globalMessages.push(newMessage);
  return newMessage;
}
