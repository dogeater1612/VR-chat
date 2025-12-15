import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ChatMessage {
  id: string;
  conversationId: string;
  sender: 'PLAYER' | 'AI';
  text: string;
  timestamp: string;
}

@Injectable({ providedIn: 'root' })
export class Api {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getConversation(id: string): Observable<ChatMessage[]> {
    return this.http.get<ChatMessage[]>(
      `${this.baseUrl}/conversations/${id}`
    );
  }
}
