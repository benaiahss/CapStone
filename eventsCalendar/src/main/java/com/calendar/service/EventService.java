package com.calendar.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.calendar.entity.Event;
import com.calendar.entity.Message;
import com.calendar.entity.SentMessage;
import com.calendar.entity.User;
import com.calendar.repo.EventRepo;
import com.calendar.repo.UserRepo;

@Service
public class EventService {

    @Autowired
    EventRepo eventRepo;

    @Autowired
    UserRepo userRepo;

    @Autowired
    UserService userService;

    @Autowired
    MessageService messageService;

    @Autowired
    SentMessageService sentMessageService;

    public Event create(Event event, Integer userId) {

        User user = userService.findById(userId);

        Event savedEvent = eventRepo.save(event);

        user.getEvents().add(savedEvent);

        userService.save(user);

        return savedEvent;
    }

    public List<Event> getAll() {
        return eventRepo.findAll();
    }

    public List<Event> getUsersEvents(Integer userId) {

        User user = userService.findById(userId);

        return user.getEvents();
    }

    public List<Event> getSharedEvents(Integer userId) {

        User user = userService.findById(userId);

        return user.getSharedEvents();
    }

    public Event updateEvent(Event event) throws Exception {

        List<User> users = userRepo.findAll();

        for (int i = 0; i < users.size(); i++) {
            for (int j = 0; j < users.get(i).getSharedEvents().size(); j++) {
                if (users.get(i).getSharedEvents().get(j).getId().equals(event.getId())) {

                    Message message = new Message();
                    message.setEvent(event);
                    message.setTitle("An event shared with you was edited click to see");
                    messageService.save(message);

                    users.get(i).getInbox().add(message);
                    userService.save(users.get(i));

                }

            }
        }

        event = save(event);

        return event;

    }

    public Event save(Event event) {

        return eventRepo.save(event);

    }

    public Event getEventById(Integer id) {

        return eventRepo.findById(id).get();
    }

    public void deleteEventById(Integer eventId) {

        List<User> users = userRepo.findAll();

        for (int i = 0; i < users.size(); i++) {
            for (int j = 0; j < users.get(i).getSharedEvents().size(); j++) {
                if (users.get(i).getSharedEvents().get(j).getId().equals(eventId)) {
                    users.get(i).getSharedEvents().remove(j);
                    userService.save(users.get(i));
                } else {
                    eventRepo.deleteById(eventId);
                }

            }

        }

    }

    public User deleteSharedEvent(Integer userId, Integer eventId) throws Exception {

        User user = userService.findById(userId);
        Event event = getEventById(eventId);

        for (int i = 0; i < user.getSharedEvents().size(); i++) {
            if (user.getSharedEvents().get(i).getId().equals(event.getId())) {
                user.getSharedEvents().remove(i);
                userService.save(user);
            }

        }
        return user;
    }

    public Event share(Integer userId, Integer eventId, Integer signedInUserId) throws Exception {

        User user = userService.findById(userId);

        User signedInUser = userService.findById(signedInUserId);

        Event sharedEvent = getEventById(eventId);

        for (int i = 0; i < user.getSharedEvents().size(); i++) {
            if (user.getSharedEvents().get(i).getId() == (sharedEvent.getId())) {

                throw new Exception("Event already shared with this user");

            }
        }
        Message message = new Message();

        message.setEvent(sharedEvent);
        message.setTitle("" + signedInUser.getUsername() + " Shared an event with you");
        user.getInbox().add(message);

        messageService.save(message);

        SentMessage sentMessage = new SentMessage();
        sentMessage.setEvent(sharedEvent);
        sentMessage.setTitle(" You Shared an event with " + user.getUsername());
        signedInUser.getSentInbox().add(sentMessage);
        sentMessageService.save(sentMessage);

        user.getSharedEvents().add(sharedEvent);

        sharedEvent.setIsShared(true);
        save(sharedEvent);
        userService.save(user);
        userService.save(signedInUser);

        return sharedEvent;

    }

}
