package com.calendar.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.calendar.entity.User;
import com.calendar.repo.UserRepo;

@Service
public class UserService {

    @Autowired
    UserRepo userRepo;

    public User save(User user) {
        return userRepo.save(user);
    }

    public User signUp(User user) throws Exception {

        if (!user.getPassword().equals(user.getConfirmPass())) {
            throw new Exception("The Confirm password must be the same as the password");
        }
        return userRepo.save(user);
    }

    public User findByEmailAndPassword(User user) throws Exception{
        
        User signedInUser = userRepo.findByEmailAndPassword(user.getUsername(), user.getPassword());

        if(signedInUser == null) {
            throw new Exception("No User Found");
        }

        return signedInUser;
    }

    public void confirmPass(User user) {
    }

    public User findById(Integer userId) {

        return userRepo.findById(userId).get();
    }

    public User findAdmin(boolean isAdmin) {
        return userRepo.findAdmin(isAdmin);
    }

    public List<User> findAllUsers() {
        return userRepo.findAll();
    }

    public List<User> findAllNonFriends(Integer userId) {

        User user = findById(userId);

        List<User> tempUsers = userRepo.findAll();

        tempUsers.remove(user);

        for (int i = 0; i < tempUsers.size(); i++) {

            for (int j = 0; j < user.getFriends().size(); j++) {

                if (user.getFriends().get(j).getId() == (tempUsers.get(i).getId())) {
                    tempUsers.remove(i);

                }
            }

        }
        return tempUsers;
    }

    public void deleteById(Integer userId) {

        userRepo.deleteById(userId);

    }

    public User getByEmail(String email) {
        return userRepo.getByEmail(email);
    }

    public User addFriend(Integer loggenInUserId, Integer friendId) {

        User friend = findById(friendId);

        User loggenInUser = findById(loggenInUserId);

        loggenInUser.getFriends().add(friend);

        save(loggenInUser);

        return loggenInUser;
    }

}
