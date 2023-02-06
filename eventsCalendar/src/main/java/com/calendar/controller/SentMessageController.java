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

import com.calendar.entity.SentMessage;
import com.calendar.entity.User;
import com.calendar.service.SentMessageService;

@RestController
@CrossOrigin("*")
public class SentMessageController {

    @Autowired
    SentMessageService sentMessageService;

    @RequestMapping(
            // Value is the path of the endpoint, MUST BE UNIQUE
            value = "/createSentMessage/{userId}",
            // Consumes JSON means it will be accepting data in JSON format, like how we
            // send the body in Postman
            consumes = MediaType.APPLICATION_JSON_VALUE,
            // Produces means it will be sending out JSON formatted Data
            produces = MediaType.APPLICATION_JSON_VALUE,
            // method is the type HTTP rest call you need to access this endpoint
            method = RequestMethod.POST) // Data from post and put requets come in the request body
    public ResponseEntity<Object> create(@RequestBody SentMessage sentMessage, @PathVariable Integer userId) {

        try {

            // send data to service for processing
            SentMessage createdSentMessage = sentMessageService.create(userId, sentMessage);

            // return the data on success
            return new ResponseEntity<>(createdSentMessage, HttpStatus.CREATED);

            // Catches will catch any error that happens in the process and return the
            // sentMessage
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Error e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @RequestMapping(value = "/getSentMessageById/{sentMessageId}", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
    public ResponseEntity<Object> getSentMessageById(@PathVariable Integer sentMessageId) {

        try {

            SentMessage sentMessage = sentMessageService.getSentMessageById(sentMessageId);

            return new ResponseEntity<>(sentMessage, HttpStatus.OK);

        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Error e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/getAllSentMessage", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
    public ResponseEntity<Object> getAllSentMessage() {

        try {

            List<SentMessage> sentMessages = sentMessageService.getAll();

            return new ResponseEntity<>(sentMessages, HttpStatus.OK);

        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Error e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @RequestMapping(value = "/getUsersSentMessages/{userId}", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
    public ResponseEntity<Object> getUsersSentMessages(@PathVariable Integer userId) {

        try {

            List<SentMessage> usersSentMessages = sentMessageService.getUsersSentMessages(userId);

            return new ResponseEntity<>(usersSentMessages, HttpStatus.OK);

        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Error e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/deleteSentMessageById/{sentMessageId}/{userId}", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
    public ResponseEntity<Object> deleteSentMessageById(@PathVariable Integer sentMessageId, @PathVariable Integer userId) {

        try {

            User user = sentMessageService.deleteSentMessageById(sentMessageId, userId);

            return new ResponseEntity<>(user, HttpStatus.OK);

        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Error e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/deleteAllSentMessages/{userId}", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
    public ResponseEntity<Object> deleteAll(@PathVariable Integer userId) {

        try {

            User user = sentMessageService.deleteAll(userId);

            return new ResponseEntity<>(user, HttpStatus.OK);

        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Error e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    
}

