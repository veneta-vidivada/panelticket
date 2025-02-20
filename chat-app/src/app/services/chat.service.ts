import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket = io('http://localhost:3000'); // Connect to server

  constructor() {}

  // Send message to server
  sendMessage(message: string) {
    this.socket.emit('message', { user: 'User', text: message });
  }

  // Receive messages from server
  receiveMessages(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('message', (data) => {
        observer.next(data);
      });
    });
  }
}
