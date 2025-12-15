package be.school.backend;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/conversations")
@CrossOrigin(origins = "*")
public class ConversationController {

    private final ChatMessageRepository repository;
    private final SimpMessagingTemplate messagingTemplate;

    public ConversationController(
            ChatMessageRepository repository,
            SimpMessagingTemplate messagingTemplate
    ) {
        this.repository = repository;
        this.messagingTemplate = messagingTemplate;
    }

    @PostMapping("/message")
    public ChatMessage receive(@RequestBody ChatMessage message) {

        // SERVER bepaalt timestamp
        message.setTimestamp(Instant.now().toString());

        // Save to Mongo
        ChatMessage saved = repository.save(message);

        // 🔥 PUSH via WebSocket
        messagingTemplate.convertAndSend(
            "/topic/conversation/" + saved.getConversationId(),
            saved
        );

        return saved;
    }

    @GetMapping("/{conversationId}")
    public List<ChatMessage> getConversation(
            @PathVariable String conversationId
    ) {
        return repository.findByConversationId(conversationId);
    }
}
