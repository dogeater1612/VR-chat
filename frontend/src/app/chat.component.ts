import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WsService } from './ws.service';
import { Api } from './api';
import { ChatMessage } from './api';

import { Subscription } from 'rxjs';

@Component({
  selector: 'chat-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat.component.html',
})
export class ChatComponent implements OnChanges, OnDestroy {

  @Input() conversationId!: string;

  messages: ChatMessage[] = [];
  loading = true;

  private sub?: Subscription;

  constructor(
    private ws: WsService,
    private api: Api
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['conversationId']) {
      this.loadInitial();
      this.connectWs();
    }
  }

  loadInitial() {
    this.loading = true;

    this.api.getConversation(this.conversationId)
      .subscribe((msgs: ChatMessage[]) => {
        this.messages = msgs;
        this.loading = false;
      });
  }

  connectWs() {
    this.ws.disconnect();
    this.ws.connect(this.conversationId);

    this.sub?.unsubscribe();
    this.sub = this.ws.messages().subscribe(msg => {
      if (msg) {
        this.messages = [...this.messages, msg];
      }
    });
  }

  ngOnDestroy(): void {
    this.ws.disconnect();
    this.sub?.unsubscribe();
  }
}
