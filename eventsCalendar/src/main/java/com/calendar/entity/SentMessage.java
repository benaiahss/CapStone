package com.calendar.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.JoinColumn;

@Entity
@Table(name = "sentInbox")
public class SentMessage {

    // ID lets you know its an id, PRIMARY KEY
    @Id
    // This will configure your id to be auto generated, now you don't need a setter
    // for your id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // Column maps to the same name as the column name in the database, it is case
    // sensitive
    @Column(name = "id")
    private Integer id;

    @Column(name = "title")
    private String title;

    @Column(name = "subject")
    private String subject;

    @OneToOne
    @JoinColumn(name = "event_id", referencedColumnName = "id")
    private Event event;

    public SentMessage() {
    }

    public Integer getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }
    @Override
    public String toString() {
        return "SentMessage [id=" + id + ", title=" + title + ", subject=" + subject + ", event=" + event + "]";
    }


    

}
