package com.booklet.bookservice.repository;


import com.booklet.bookservice.entity.User;
import com.booklet.bookservice.entity.UserImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserImageRepository extends JpaRepository<UserImage, Long> {
    @Query("select ui.ImagePath from UserImage ui where ui.user=:user")
    public String findUserImageByUser(User user);
}
