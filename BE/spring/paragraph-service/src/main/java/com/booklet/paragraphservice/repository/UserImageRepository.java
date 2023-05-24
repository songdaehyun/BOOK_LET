package com.booklet.paragraphservice.repository;

import com.booklet.paragraphservice.entity.User;
import com.booklet.paragraphservice.entity.UserImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserImageRepository extends JpaRepository<UserImage, Long> {
    @Query("select ui.ImagePath from UserImage ui where ui.user=:user")
    public String findUserImageByUser(User user);
}
