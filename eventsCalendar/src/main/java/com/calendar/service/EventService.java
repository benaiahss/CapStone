package com.calendar.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.calendar.entity.Event;
import com.calendar.entity.User;
import com.calendar.repo.EventRepo;

@Service
public class EventService {

    @Autowired
    EventRepo eventRepo;

    @Autowired
    UserService userService;

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

        if (event.getId() == null) {
            throw new Exception("Event not found.");
        }
        return eventRepo.save(event);

    }

    public Event save(Event event) {

        return eventRepo.save(event);

    }

    public Event getEventById(Integer id) {

        return eventRepo.findById(id).get();
    }

    public void deleteEventById(Integer id) {

        eventRepo.deleteById(id);

    }

    public Event share(Integer userId, Integer eventId) throws Exception {

        User user = userService.findById(userId);

        Event sharedEvent = getEventById(eventId);

        user.getSharedEvents().add(sharedEvent);

        sharedEvent.setIsShared(true);

        save(sharedEvent);

        userService.save(user);

        return sharedEvent;

    }

}
