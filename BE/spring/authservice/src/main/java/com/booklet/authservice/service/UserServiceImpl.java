package com.booklet.authservice.service;

import com.booklet.authservice.dto.*;
import com.booklet.authservice.entity.*;
import com.booklet.authservice.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

import java.lang.reflect.Array;
import java.time.LocalDateTime;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;
    private final FollowRepository followRepository;
    private final HashtagRepository hashtagRepository;
    private final UserHashtagRepository userHashtagRepository;
    private final BookRepository bookRepository;
    private final BookLikesRepository bookLikesRepository;
    private final ReviewRepository reviewRepository;
    private final BookCoverRepository bookCoverRepository;

//    @Override
    public HashMap<String, Object> findUserInfo(String username) {
        User user = userRepository.findByUsername(username);

        if (user == null) {
            return null;
        }

        // 팔로우
        List<Follow> following = followRepository.findAllByFollowing(user);
        List<Follow> follower = followRepository.findAllByFollower(user);


        try {
            HashMap<String, Object> result = new HashMap<>();
            GetUserInfoResDto getUserInfoResDto = new GetUserInfoResDto().builder()
                            .imgPath(user.getUserImage().getImagePath())
                            .nickname(user.getNickname())
                            .follower(following.size())
                            .following(follower.size())
                            .email(user.getEmail())
                            .build();
            result.put("data",getUserInfoResDto);
            return result;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public boolean following(FollowReqDto followReqDto) {
        log.info("팔로우 진입");
        User user = userRepository.findByUsername(followReqDto.getUsername());
        User following = userRepository.findByUsername(followReqDto.getFollowingUsername());

        // 유저가 있는지 확인
        if (user == null || user.getUsername() == followReqDto.getUsername()) {
            log.info("유저가 없거나 본인입니다.");
            return false;
        }

        log.info("user : {}", user.getUsername().toString());
        log.info("following : {}", following.getUsername().toString());
        Follow test = followRepository.findByFollowerAndFollowing(user, following);
        // 팔로우 정보가 있는지 확인
        if (followRepository.findByFollowerAndFollowing(user, following) != null) {
            // 팔로우가 있다면 삭제
            Follow follow = followRepository.findByFollowerAndFollowing(user, following);
            followRepository.delete(follow);
            System.out.println("언팔로우 완료!");

            return true;
        } else {
            // 팔로우가 없다면 팔로우
            Follow follow = new Follow();
            follow.setFollowing(following);
            follow.setFollower(user);
            followRepository.save(follow);
            log.info("팔로우 완료!");

            return true;
        }
    }

    @Override
    public HashMap<String, Object> findfollowInfo(String username) {
        User user = userRepository.findByUsername(username);
        if (user == null) {return null;}

        List<Follow> followings = followRepository.findAllByFollowing(user);
        List<Follow> followers = followRepository.findAllByFollower(user);

        HashMap<String, Object> totalData = new HashMap<>();
        List<FollowDto> followingsData = new ArrayList<>();
        List<FollowDto> followersData = new ArrayList<>();

        for(Follow following : followings) {
            User followingUser = following.getFollower();
            followingsData.add(FollowDto.builder()
                            .userImg(followingUser.getUserImage().getImagePath())
                            .username(followingUser.getUsername())
                            .nickname(followingUser.getNickname())
                            .build());
        }

        for(Follow follower : followers) {
            User followerUser = follower.getFollowing();
            followersData.add(FollowDto.builder()
                            .userImg(followerUser.getUserImage().getImagePath())
                            .username(followerUser.getUsername())
                            .nickname(followerUser.getNickname())
                            .build());
        }

        totalData.put("followersCnt", followings.size());
        totalData.put("followers", followingsData);
        totalData.put("followingsCnt", followers.size());
        totalData.put("followings", followersData);

        HashMap<String, Object> result = new HashMap<>();
        result.put("data", totalData);
        log.info("팔로워 정보", totalData);

        return result;
    }

    @Override
    public boolean saveUserTaste(UserTasteReqDto userTasteReqDto, String username) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            System.out.println("유저가 없습니다");
            return false;
        }

        List<UserHashtag> userHashtags = userHashtagRepository.findAllByUser(user);
        if (userHashtags.size()!=0) {
            System.out.println("이미 유저 태그가 있어 삭제합니다.");
            for (UserHashtag userHashtag:userHashtags) {
                userHashtagRepository.delete(userHashtag);
            }
        }

        List<String> tastes = userTasteReqDto.getTastes();
        for (String taste : tastes) {
            Hashtag hashtag = hashtagRepository.findByHashtagName(taste);
            if (userHashtagRepository.existsUserHashtagByUserAndHashtag(user, hashtag) == true)
            {System.out.println("이미 존재하는 태그입니다. : "+taste);continue;}

            System.out.println("이번 등록 취향 : " + taste);
            UserHashtag userHashtag = new UserHashtag();
            userHashtag.setUser(user);
            userHashtag.setHashtag(hashtag);
            System.out.println("유저 : " + user.getUsername());
            System.out.println("태그" + hashtag.getHashtagName());
            userHashtagRepository.save(userHashtag);
        }

        return true;
    }

    @Override
    public boolean saveUserBookCover(UserTasteReqDto userTasteReqDto, String username) {
        User user = userRepository.findByUsername(username);
        List<BookCover> bookCovers = bookCoverRepository.findAllByUser(user);
        if (bookCovers != null) {
            log.info("기존 유저 취향 책 커버 삭제");
            bookCoverRepository.deleteAll(bookCovers);
        }
        for (String bookIsbn : userTasteReqDto.getBookCovers()) {
            try {
                BookCover bookCover = new BookCover();
                bookCover.setBookIsbn(bookIsbn);
                bookCover.setUser(user);
                bookCoverRepository.save(bookCover);
                log.info("유저 취향 책 커버 등록 : " + bookRepository.findByBookIsbn(bookIsbn).getBookTitle());
            } catch (Exception e) {
                log.warn("유저 취향 책 커버 등록 실패 : "+bookIsbn);
            }
        }

        return true;
    }

    @Override
    public HashMap<String, Object> saveUserPreferScore(String username) {
        HashMap result = new HashMap();
        User user = userRepository.findByUsername(username);
        System.out.println("취향점수 저장중입니다 : " + user.getUsername());
        if (user == null) { return null;}

        List<UserHashtag> userHashtags = userHashtagRepository.findAllByUser(user);
        float sumPScore = 0;
        float sumNScore = 0;
        for (UserHashtag userHashtag : userHashtags) {
            System.out.println("작업중인 태그 : "+userHashtag.getHashtag().getHashtagName());
            sumPScore += userHashtag.getHashtag().getHashtagPScore();
            sumNScore += userHashtag.getHashtag().getHashtagNScore();
        }
        System.out.println("긍정점수 총합 : "+sumPScore);
        System.out.println("부정점수 총합 : "+sumNScore);

        if (sumNScore > sumPScore) {user.setPreferType("N"); user.setPreferScore(sumNScore);}
        else {user.setPreferType("P"); user.setPreferScore(sumPScore);}
        userRepository.save(user);

        result.put("message", true);
        result.put("type", user.getPreferType());
        result.put("score", user.getPreferScore());
        return result;
    }

    @Override
    public List<Map> findAllHashtags() {
        List<Hashtag> hashtags = hashtagRepository.findAll();
        List<Map> result = new ArrayList<>();
        for(Hashtag hashtag : hashtags) {
            Map<String, Object> tmp = Map.of(
                    "hashtag_name",hashtag.getHashtagName(),
                    "hashtag_id", hashtag.getHashtagId()
                    );
            result.add(tmp);
        }
        return result;
    }

    @Override
    public HashMap<String, Object> findUserLikeBooks(String username, int type) {
        User user = userRepository.findByUsername(username);

        if (user == null) {return null;}
        System.out.println("진입 : " + user.getUsername());
        HashMap<String, Object> result = new HashMap<>();

        List<BookLikes> tmps = bookLikesRepository.findAllByUser(user);
        List<UserLikeBooksResDto> items = new ArrayList<>();

        int cnt = 0;

        for (BookLikes bookLikes : tmps) {
            if (type ==0 && cnt == 5) {
                break;
            }
            Book book = bookLikes.getBook();
            System.out.println("작업 중인 책 : "+book.getBookTitle());
            UserLikeBooksResDto userLikeBooksResDto = new UserLikeBooksResDto().builder()
                    .bookIsbn(book.getBookIsbn())
                    .bookImgPath(book.getBookImage())
                    .bookTitle(book.getBookTitle())
                    .authorName(book.getAuthor().getAuthorName())
                    .build();
            cnt += 1;
            items.add(userLikeBooksResDto);
        }
        result.put("totalCnt", tmps.size());
        result.put("data", items);

        return result;
    }

    @Override
    public HashMap<String, Object> findUserReviews(String username, int type) {
        User user = userRepository.findByUsername(username);
        if (user == null) {return null;}
        HashMap<String, Object> result = new HashMap<>();
        List<Review> reviews = reviewRepository.findAllByUser(user);
        int cnt = 0;
        List<UserReviewsResDto> items = new ArrayList<>();
        for (Review review : reviews) {
            if (type ==0 && cnt == 5) {
                break;
            }
            Book book = review.getBook();
            UserReviewsResDto userReviewsResDto = UserReviewsResDto.builder()
                    .reviewId(review.getReviewId())
                    .bookImgPath(book.getBookImage())
                    .bookTitle(book.getBookTitle())
                    .bookPublisher(book.getBookPublisher())
                    .bookIsbn(book.getBookIsbn())
                    .authorName(book.getAuthor().getAuthorName())
                    .reviewGrade(review.getReviewGrade())
                    .reviewContent(review.getReviewContent())
                    .createdDate(review.getCreatedDate())
                    .build();
            cnt += 1;
            items.add(userReviewsResDto);
        }
        result.put("data", items);

        return result;
    }

    @Override
    public HashMap<String, Object> findBookCovers() {
        HashMap<String, Object> result = new HashMap<>();

        List<BookCoverResDto> itmes = new ArrayList<>();

        for (int i = 0; i < 21; i++) {
            Book book = bookRepository.findRandomBook();

            if (book != null) {
                itmes.add(new BookCoverResDto().builder()
                                .book_isbn(book.getBookIsbn())
                                .book_img(book.getBookImage())
                                .build());
            }
            else {log.info("책 커버 불러오기 실패");}
        }

        result.put("data", itmes);
        return result;
    }


}
