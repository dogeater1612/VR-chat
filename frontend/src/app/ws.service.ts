import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Subject } from 'rxjs';
import { ChatMessage } from './api';

@Injectable({ providedIn: 'root' })
export class WsService {

  private client?: Client;
  private message$ = new Subject<ChatMessage>();

  connect(conversationId: string) {
    this.client = new Client({
      webSocketFactory: () => new SockJS('/ws'),
      reconnectDelay: 3000,
      debug: str => console.log('[WS]', str),
    });

    this.client.onConnect = () => {
      this.client!.subscribe(
        `/topic/conversation/${conversationId}`,
        msg => {
          const parsed = JSON.parse(msg.body) as ChatMessage;
          this.message$.next(parsed);
        }
      );
    };

    this.client.activate();
  }

  disconnect() {
    this.client?.deactivate();
  }

  messages() {
    return this.message$.asObservable();
  }
}
