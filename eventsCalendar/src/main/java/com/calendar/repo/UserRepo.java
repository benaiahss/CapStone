package com.calendar.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.calendar.entity.User;

@Repository
public interface UserRepo extends JpaRepository<User, Integer> {

    @Query(value = "select * from user where username=?1 and password=?2", nativeQuery = true)
    public User findByEmailAndPassword(String username, String password);

    @Query(value = "select * from user where username=?1", nativeQuery = true)
    public User findByUsername(String username);

    @Query(value = "select * from user where isAdmin=?1", nativeQuery = true)
    public User findAdmin();
    
    @Query(value = "select * from user where email=?1", nativeQuery = true)
    public User getByEmail(String email);


}


