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

import com.calendar.entity.Message;
import com.calendar.service.MessageService;

@RestController
@CrossOrigin("*")
public class MessageController {

    @Autowired
    MessageService messageService;

    @RequestMapping(
            // Value is the path of the endpoint, MUST BE UNIQUE
            value = "/createMessage/{userId}",
            // Consumes JSON means it will be accepting data in JSON format, like how we
            // send the body in Postman
            consumes = MediaType.APPLICATION_JSON_VALUE,
            // Produces means it will be sending out JSON formatted Data
            produces = MediaType.APPLICATION_JSON_VALUE,
            // method is the type HTTP rest call you need to access this endpoint
            method = RequestMethod.POST) // Data from post and put requets come in the request body
    public ResponseEntity<Object> create(@RequestBody Message message, @PathVariable Integer userId) {

        try {

            // send data to service for processing
            Message createdMessage = messageService.create(userId, message);

            // return the data on success
            return new ResponseEntity<>(createdMessage, HttpStatus.CREATED);

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

    @RequestMapping(value = "/getMessageById/{messageId}", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
    public ResponseEntity<Object> getMessageById(@PathVariable Integer messageId) {

        try {

            Message message = messageService.getMessageById(messageId);

            return new ResponseEntity<>(message, HttpStatus.OK);

        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Error e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/getAllMessage", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
    public ResponseEntity<Object> getAllMessage() {

        try {

            List<Message> messages = messageService.getAll();

            return new ResponseEntity<>(messages, HttpStatus.OK);

        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Error e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @RequestMapping(value = "/getUsersMessages/{userId}", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
    public ResponseEntity<Object> getUsersMessages(@PathVariable Integer userId) {

        try {

            List<Message> usersMessages = messageService.getUsersMessages(userId);

            return new ResponseEntity<>(usersMessages, HttpStatus.OK);

        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Error e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/deleteMessageById/{messageId}", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.DELETE)
    public ResponseEntity<Object> deleteMessageById(@PathVariable Integer messageId) {

        try {

            messageService.deleteMessageById(messageId);

            return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Error e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    
}
