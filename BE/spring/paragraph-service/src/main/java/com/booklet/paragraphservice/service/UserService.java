package com.booklet.paragraphservice.service;

import com.booklet.paragraphservice.entity.User;

import java.util.Optional;

public interface UserService {
    public User getUser(Long userId);
}
