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

  private backendUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getConversation(id: string): Observable<ChatMessage[]> {
    return this.http.get<ChatMessage[]>(
      `${this.backendUrl}/conversations/${id}`
    );
  }
  getAllConversations(): Observable<string[]> {
  return this.http.get<string[]>(
    'http://localhost:8080/conversations'
  );
}

}
