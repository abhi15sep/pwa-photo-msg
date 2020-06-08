
class Message {
  constructor() {

    this.messages = [];

    // Connect to socket server
    this.socket = io();

    // Handle connection error
    this.socket.once('connect_error', () => {

      // Notify main.js via an Event
      window.dispatchEvent( new Event('messages_error') );
    });

    // Listen for all server messages (sent on connect)
    this.socket.on('all_messages', (messages) => {

      // Update local messages array
      this.messages = messages;

      // Notify client via an Event
      window.dispatchEvent( new Event('messages_ready') );
    });

    // Listen for new message from server
    this.socket.on('new_message', (message) => {

      // Add to local messages
      this.messages.unshift(message);

      // Notify client via custom Event
      window.dispatchEvent( new CustomEvent('new_message', {detail: message}) );
    });
  }

  // Get all messages
  get all() {
    return this.messages;
  }

  // Add a new message
  add( data_uri, caption_text ) {

    // Create message obj
    let message = {
      photo: data_uri,
      caption: caption_text
    }

    // Add to local messages
    this.messages.unshift(message);

    // Emit to server
    this.socket.emit('new_message', message);

    // Return fomratted message obj
    return message;
  }
}
