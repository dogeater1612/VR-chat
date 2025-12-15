package be.school.backend;

import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface ChatMessageRepository
        extends MongoRepository<ChatMessage, String> {

    List<ChatMessage> findByConversationId(String conversationId);
}
