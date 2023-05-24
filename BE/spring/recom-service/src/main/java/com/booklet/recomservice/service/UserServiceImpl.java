package com.booklet.recomservice.service;

import com.booklet.recomservice.entity.User;
import com.booklet.recomservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;

    @Override
    public User getUser(String username) {
        return userRepository.findByUsername(username);
    }
}
