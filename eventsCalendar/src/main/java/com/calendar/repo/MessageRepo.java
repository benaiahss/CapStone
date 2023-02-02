package com.calendar.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.calendar.entity.Message;

@Repository
public interface MessageRepo extends JpaRepository<Message, Integer> {

}
