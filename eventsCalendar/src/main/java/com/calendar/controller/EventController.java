package com.calendar.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.calendar.entity.Event;
import com.calendar.entity.User;
import com.calendar.service.EventService;
import com.calendar.service.UserService;

@RestController
@CrossOrigin("*")
public class EventController {

    @Autowired
    EventService eventService;

    @Autowired
    UserService userService;

    // RequestMapping for your endpoints to configure them
    @RequestMapping(
            // Value is the path of the endpoint, MUST BE UNIQUE
            value = "/createEvent/{userId}",
            // Consumes JSON means it will be accepting data in JSON format, like how we
            // send the body in Postman
            consumes = MediaType.APPLICATION_JSON_VALUE,
            // Produces means it will be sending out JSON formatted Data
            produces = MediaType.APPLICATION_JSON_VALUE,
            // method is the type HTTP rest call you need to access this endpoint
            method = RequestMethod.POST) // Data from post and put requets come in the request body
    public ResponseEntity<Object> create(@RequestBody Event event, @PathVariable Integer userId) {

        try {

            // send data to service for processing
            Event createdEvent = eventService.create(event, userId);

            // return the data on success
            return new ResponseEntity<>(createdEvent, HttpStatus.CREATED);

            // Catches will catch any error that happens in the process and return the
            // message
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Error e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    /* Get All Events */
    @RequestMapping(value = "/getAllEvents", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
    public ResponseEntity<Object> getAllEvents() {

        try {

            List<Event> events = eventService.getAll();

            return new ResponseEntity<>(events, HttpStatus.OK);

        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Error e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    /* Update Event */
    @RequestMapping(value = "/updateEvent", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
    public ResponseEntity<Object> updateSchool(@RequestBody Event event) {

        try {

            event = eventService.updateEvent(event);

            return new ResponseEntity<>(event, HttpStatus.OK);

        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Error e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    /* Get Event */
    @RequestMapping(value = "/getEventById/{eventId}", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
    public ResponseEntity<Object> getEventById(@PathVariable Integer eventId) {

        try {

            Event event = eventService.getEventById(eventId);

            return new ResponseEntity<>(event, HttpStatus.OK);

        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Error e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/getUsersEvents/{userId}", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
    public ResponseEntity<Object> getUsersEvents(@PathVariable Integer userId) {

        try {

            List<Event> usersEvents = eventService.getUsersEvents(userId);

            return new ResponseEntity<>(usersEvents, HttpStatus.OK);

        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Error e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/getSharedEvents/{userId}", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
    public ResponseEntity<Object> getSharedEvents(@PathVariable Integer userId) {

        try {

            List<Event> usersEvents = eventService.getSharedEvents(userId);

            return new ResponseEntity<>(usersEvents, HttpStatus.OK);

        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Error e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /* Delete Event */
    @RequestMapping(value = "/deleteEventById/{eventId}", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.DELETE)
    public ResponseEntity<Object> deleteById(@PathVariable Integer eventId) {

        try {

            eventService.deleteEventById(eventId);

            return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Error e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/share/{userId}/{eventId}/{signedInUserId}", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
    public ResponseEntity<Object> share(@PathVariable Integer userId, @PathVariable Integer eventId, @PathVariable Integer signedInUserId) {

        try {

            eventService.share(userId, eventId, signedInUserId);

            return new ResponseEntity<>(eventId, HttpStatus.OK);

        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Error e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/deleteSharedEvent/{userId}/{eventId}", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
    public ResponseEntity<Object> deleteSharedEvent(@PathVariable Integer userId, @PathVariable Integer eventId) {

        try {

            User user = eventService.deleteSharedEvent(userId, eventId);

            return new ResponseEntity<>(user, HttpStatus.OK);

        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Error e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(
        value="/checkDate",
        produces = MediaType.APPLICATION_JSON_VALUE,
        method = RequestMethod.GET
    )
    public ResponseEntity<Object> checkDate() {

        try {
           checkDate();
            return new ResponseEntity<>(HttpStatus.OK);
        } catch(Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch(Error e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

}
