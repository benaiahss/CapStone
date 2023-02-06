package com.calendar.entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "user")
public class User {

    // ID lets you know its an id, PRIMARY KEY
    @Id
    // This will configure your id to be auto generated, now you don't need a setter
    // for your id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // Column maps to the same name as the column name in the database, it is case
    // sensitive
    @Column(name = "id")
    private Integer id;

    // Column maps to the same name as the column name in the database, it is case
    // sensitive
    @Column(name = "username", unique = true, nullable = false)
    private String username;
    @Column(name = "email", unique = true, nullable = false)
    private String email;

    // Column maps to the same name as the column name in the database, it is case
    // sensitive
    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "confirmPass", nullable = false)
    private String confirmPass;

    @Column(name = "isAdmin")
    private Boolean isAdmin = false;

    @OneToMany
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private List<Event> events;

    @ManyToMany
    @JoinTable(name = "shared_events", joinColumns = {
            @JoinColumn(name = "user_id", referencedColumnName = "id")
    }, inverseJoinColumns = {
            @JoinColumn(name = "shared_event_id", referencedColumnName = "id")
    })
    private List<Event> sharedEvents;

    @ManyToMany
    @JoinTable(name = "friends", joinColumns = {
            @JoinColumn(name = "user_id", referencedColumnName = "id")
    }, inverseJoinColumns = {
            @JoinColumn(name = "friend_id", referencedColumnName = "id")
    })
    private List<User> friends;

    @OneToMany
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private List<Message> inbox;

    @OneToMany
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private List<SentMessage> sentInbox;
    
    public User() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Boolean getIsAdmin() {
        return isAdmin;
    }

    public void setIsAdmin(Boolean isAdmin) {
        this.isAdmin = isAdmin;
    }

    public String getPassword() {
        return password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getConfirmPass() {
        return confirmPass;
    }

    public void setConfirmPass(String confirmPass) {
        this.confirmPass = confirmPass;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getId() {
        return id;
    }

    public List<Event> getEvents() {
        return events;
    }

    public void setEvents(List<Event> events) {
        this.events = events;
    }

    public List<Event> getSharedEvents() {
        return sharedEvents;
    }

    public void setSharedEvents(List<Event> sharedEvents) {
        this.sharedEvents = sharedEvents;
    }

    public List<User> getFriends() {
        return friends;
    }

    public void setFriends(List<User> friends) {
        this.friends = friends;
    }

    public List<Message> getInbox() {
        return inbox;
    }

    public void setInbox(List<Message> inbox) {
        this.inbox = inbox;
    }

    public List<SentMessage> getSentInbox() {
        return sentInbox;
    }

    public void setSentInbox(List<SentMessage> sentInbox) {
        this.sentInbox = sentInbox;
    }

    @Override
    public String toString() {
        return "User [id=" + id + ", username=" + username + ", email=" + email + ", password=" + password
                + ", confirmPass=" + confirmPass + ", isAdmin=" + isAdmin + ", events=" + events + ", sharedEvents="
                + sharedEvents + ", friends=" + friends + ", inbox=" + inbox + ", sentInbox=" + sentInbox + "]";
    }

}
