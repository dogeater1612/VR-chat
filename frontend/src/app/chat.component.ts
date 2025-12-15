import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Api, ChatMessage } from './api';
import { WsService } from './ws.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'chat-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat.component.html',
})
export class ChatComponent implements OnInit, OnDestroy {

  @Input() conversationId!: string;

  messages: ChatMessage[] = [];
  loading = true;

  private wsSub?: Subscription;

  constructor(
    private api: Api,
    private ws: WsService
  ) {}

  // ChatComponent.ts

// ChatComponent.ts

  ngOnInit() {
    // 1. Log ID voor debug (optioneel, maar goed om te weten)
    console.log('[ChatComponent] Conversation ID:', this.conversationId);

    // 2. Controleer of we een ID hebben om mee te werken
    if (this.conversationId) { // Alleen doorgaan als ID aanwezig is
        
        // --- LAAD BESTAANDE BERICHTEN (API CALL) ---
        this.api.getConversation(this.conversationId).subscribe({
          next: msgs => {
            this.messages = msgs;
            this.loading = false;
          },
          error: (err) => {
                console.error('Fout bij laden conversatie via API:', err);
              this.loading = false;
          }
        });

        // --- STEL WEBSOCKET VERBINDING IN ---
        this.ws.connect(this.conversationId);
        this.wsSub = this.ws.messages().subscribe(msg => {
          this.messages = [...this.messages, msg];
        });
        
    } else {
        // Als de ID ontbreekt, stel loading in op false zodat "Geen berichten" verschijnt.
        this.loading = false;
        console.warn('[ChatComponent] conversationId ontbreekt. Kan niet communiceren.');
    }
 

    this.api.getConversation(this.conversationId).subscribe({
      next: msgs => {
        this.messages = msgs;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });

    this.ws.connect(this.conversationId);
    this.wsSub = this.ws.messages().subscribe(msg => {
      this.messages = [...this.messages, msg];
    });
  }

  ngOnDestroy() {
    this.wsSub?.unsubscribe();
    this.ws.disconnect();
  }
}
