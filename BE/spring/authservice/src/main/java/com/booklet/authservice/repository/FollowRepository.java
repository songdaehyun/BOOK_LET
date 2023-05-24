package com.booklet.authservice.repository;

import com.booklet.authservice.entity.Follow;
import com.booklet.authservice.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {
    List<Follow> findAllByFollowing(User Following);
    List<Follow> findAllByFollower(User Follower);
    Follow findByFollowerAndFollowing(User Follower, User Following);
}
