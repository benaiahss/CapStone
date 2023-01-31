package com.calendar.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "inbox")
public class Inbox {

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
    private Integer title;

    @Column(name = "subject")
    private Integer subject;

    public Inbox() {
    }

    public Integer getId() {
        return id;
    }

    public Integer getTitle() {
        return title;
    }

    public void setTitle(Integer title) {
        this.title = title;
    }

    public Integer getSubject() {
        return subject;
    }

    public void setSubject(Integer subject) {
        this.subject = subject;
    }

    @Override
    public String toString() {
        return "Inbox [id=" + id + ", title=" + title + ", subject=" + subject + "]";
    }
    
}
