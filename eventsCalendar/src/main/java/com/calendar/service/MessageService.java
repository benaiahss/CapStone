package com.calendar.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.calendar.entity.Message;
import com.calendar.entity.SentMessage;
import com.calendar.entity.User;
import com.calendar.repo.MessageRepo;
import com.calendar.repo.SentMessageRepo;

@Service
public class MessageService {

    @Autowired
    MessageRepo messageRepo;

    @Autowired
    SentMessageRepo sentMessageRepo;

    @Autowired
    UserService userService;

    public Message create(Integer userId, Message message) {

        User user = userService.findById(userId);

        message = messageRepo.save(message);

        user.getInbox().add(message);

        userService.save(user);

        return message;
    }

    public Message send(Integer userId, Integer loggedInUserId, Message message){

        User user = userService.findById(userId);
        User loggedInUser = userService.findById(loggedInUserId);
        message = messageRepo.save(message);

        SentMessage sentMessage = new SentMessage();
        sentMessage.setEvent(message.getEvent());
        sentMessage.setSubject(message.getSubject());
        sentMessage.setTitle(message.getTitle());
        sentMessageRepo.save(sentMessage);

        loggedInUser.getSentInbox().add(sentMessage);
        user.getInbox().add(message);

        userService.save(loggedInUser);
        userService.save(user);

        return message;
    }

    public Message save(Message message) {

        return messageRepo.save(message);

    }

    public List<Message> getAll() {
        return messageRepo.findAll();
    }

    public Message getMessageById(Integer messageId) {

        return messageRepo.findById(messageId).get();
    }

    public User deleteAll(Integer userId) {
        User user = userService.findById(userId);
        for (int i = 0; i < user.getInbox().size(); i++) {
            for (int j = 0; j < messageRepo.findAll().size(); j++) {
                if(user.getInbox().get(i).equals(messageRepo.findAll().get(j))){
                    messageRepo.deleteById(messageRepo.findAll().get(j).getId());
                }
                
            }
            
           }
        return user;
    }

    public User deleteMessageById(Integer messageId, Integer userId) {

        User user = userService.findById(userId);
        Message message = getMessageById(messageId);

        for (int i = 0; i < user.getInbox().size(); i++) {
            if (user.getInbox().get(i).getId().equals(message.getId())) {
                user.getInbox().remove(i);
                messageRepo.delete(message);
                userService.save(user);
            }
        }
        return user;

    }

    public List<Message> getUsersMessages(Integer userId) {

        User user = userService.findById(userId);

        return user.getInbox();
    }
}
