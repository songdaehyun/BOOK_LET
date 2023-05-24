package com.booklet.authservice.repository;

import com.booklet.authservice.entity.User;
import com.booklet.authservice.entity.UserImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserImageRepository extends JpaRepository<UserImage, Long> {
    UserImage findByUser(User user);
}
