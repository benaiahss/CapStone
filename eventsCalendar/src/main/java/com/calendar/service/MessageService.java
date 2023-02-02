package com.calendar.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.calendar.entity.Message;
import com.calendar.entity.User;
import com.calendar.repo.MessageRepo;

@Service
public class MessageService {

    @Autowired
    MessageRepo messageRepo;

    @Autowired
    UserService userService;

    public Message create(Integer userId, Message message) {

        User user = userService.findById(userId);

        message = messageRepo.save(message);

        user.getInbox().add(message);

        userService.save(user);

        return message;
    }

    public Message save(Message message) {

        return messageRepo.save(message);

    }

    public List<Message> getAll(){
        return messageRepo.findAll();
    }

    public Message getMessageById(Integer messageId) {

        return messageRepo.findById(messageId).get();
    }

    public void deleteMessageById(Integer messageId) {

        messageRepo.deleteById(messageId);

    }

    public List<Message> getUsersMessages(Integer userId) {

        User user = userService.findById(userId);

        return user.getInbox();
    }

}
