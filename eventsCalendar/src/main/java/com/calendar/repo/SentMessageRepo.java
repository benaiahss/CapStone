package com.calendar.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.calendar.entity.SentMessage;

@Repository
public interface SentMessageRepo extends JpaRepository<SentMessage, Integer> {

}
