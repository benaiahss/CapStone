package com.calendar.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.calendar.entity.Event;

@Repository
public interface EventRepo extends JpaRepository<Event, Integer> {

}
