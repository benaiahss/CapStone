package com.calendar.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.calendar.entity.SentMessage;
import com.calendar.entity.User;
import com.calendar.repo.SentMessageRepo;

@Service
public class SentMessageService {

    @Autowired
    SentMessageRepo sentMessageRepo;

    @Autowired
    UserService userService;

    public SentMessage create(Integer userId, SentMessage sentMessage) {

        User user = userService.findById(userId);

        sentMessage = sentMessageRepo.save(sentMessage);

        user.getSentInbox().add(sentMessage);

        userService.save(user);

        return sentMessage;
    }

    public SentMessage save(SentMessage sentMessage) {

        return sentMessageRepo.save(sentMessage);

    }

    public List<SentMessage> getAll() {
        return sentMessageRepo.findAll();
    }

    public SentMessage getSentMessageById(Integer sentMessageId) {

        return sentMessageRepo.findById(sentMessageId).get();
    }

    public User deleteAll(Integer userId) {
        User user = userService.findById(userId);
       for (int i = 0; i < user.getSentInbox().size(); i++) {
        for (int j = 0; j < sentMessageRepo.findAll().size(); j++) {
            if(user.getSentInbox().get(i).equals(sentMessageRepo.findAll().get(j))){
                sentMessageRepo.deleteById(sentMessageRepo.findAll().get(j).getId());
            }
            
        }
        
       }
        return user;
    }

    public User deleteSentMessageById(Integer messageId, Integer userId) {

        User user = userService.findById(userId);
        SentMessage message = getSentMessageById(messageId);

        for (int i = 0; i < user.getSentInbox().size(); i++) {
            if (user.getSentInbox().get(i).getId().equals(message.getId())) {
                user.getSentInbox().remove(i);
                sentMessageRepo.delete(message);
                userService.save(user);
            }
        }
        return user;

    }

    public List<SentMessage> getUsersSentMessages(Integer userId) {

        User user = userService.findById(userId);

        return user.getSentInbox();
    }
}
