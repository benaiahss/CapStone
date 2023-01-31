package com.calendar.eventsCalendar;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.calendar")
public class EventsCalendarApplication {

	public static void main(String[] args) {
		SpringApplication.run(EventsCalendarApplication.class, args);
	}

}
