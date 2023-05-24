package com.booklet.paragraphservice.service;

import com.booklet.paragraphservice.entity.User;
import com.booklet.paragraphservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class UserServiceImpl implements UserService{
    private final UserRepository userRepository;
    @Override
    public User getUser(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if( user.isPresent())
            return user.get();
        return null;
    }
}
