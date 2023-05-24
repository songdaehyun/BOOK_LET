import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// 로그인 / 회원가입
import JoinAge from "./components/pages/Join/JoinAge";
import JoinBasic from "./components/pages/Join/JoinBasic";
import JoinCover from "./components/pages/Join/JoinCover";
import JoinGender from "./components/pages/Join/JoinGender";
import JoinTag from "./components/pages/Join/JoinTag";
import Login from "./components/pages/Login/Login";

// 문장
import DetailPost from "./components/pages/Sentence/DetailPost";
import Feed from "./components/pages/Sentence/Feed";
import RecomSentence from "./components/pages/Sentence/RecomSentence";
import ScrapSentence from "./components/pages/Sentence/ScrapSentence";
import WriteSentence from "./components/pages/Sentence/WriteSentence";

// 책
import AuthorBook from "./components/pages/Book/AuthorBook";
import Book from "./components/pages/Book/Book";
import BookDetail from "./components/pages/Book/BookDetail";
import CoverRecomBook from "./components/pages/Book/CoverRecomBook";
import GenreRecomBook from "./components/pages/Book/GenreRecomBook";
import LikeRecomBook from "./components/pages/Book/LikeRecomBook";
import RatingRecomBook from "./components/pages/Book/RatingRecomBook";
import UserRecomBook from "./components/pages/Book/UserRecomBook";
import BookSearch from "./components/pages/Book/BookSearch";

// 마이 페이지
import DeleteMyAccount from "./components/pages/Mypage/DeleteMyAccount";
import MyFollow from "./components/pages/Mypage/MyFollow";
import MyInfoEdit from "./components/pages/Mypage/MyInfoEdit";
import MyLike from "./components/pages/Mypage/MyLike";
import Mypage from "./components/pages/Mypage/Mypage";
import MyReview from "./components/pages/Mypage/MyReview";
import MyTagEdit from "./components/pages/Mypage/MyTagEdit";

function AppRouter(props) {
	const isAuth = localStorage.getItem("token");

	return (
		<BrowserRouter>
			<Routes>
				{/* 로그인 / 회원가입 */}
				<Route path="/login" element={<Login />} />
				<Route path="/join/1" element={<JoinBasic />} />
				<Route path="/join/2" element={<JoinGender />} />
				<Route path="/join/3" element={<JoinAge />} />
				<Route path="/join/4" element={<JoinCover />} />
				<Route path="/join/5" element={<JoinTag />} />

				{/* 문장 */}

				<Route path="/" element={isAuth ? <Feed /> : <Navigate to="/login" />} />
				<Route
					path="/sentence/scrap"
					element={isAuth ? <ScrapSentence /> : <Navigate to="/login" />}
				/>
				<Route
					path="/sentence/recommand"
					element={isAuth ? <RecomSentence /> : <Navigate to="/login" />}
				/>
				<Route
					path="/sentence/:sId"
					element={isAuth ? <DetailPost /> : <Navigate to="/login" />}
				/>
				<Route
					path="/sentence/write"
					element={isAuth ? <WriteSentence /> : <Navigate to="/login" />}
				/>
				{/* 도서 */}
				<Route path="/book/search" element={<BookSearch />} />
				<Route path="/book" element={isAuth ? <Book /> : <Navigate to="/login" />} />
				<Route
					path="/book/recom/user"
					element={isAuth ? <UserRecomBook /> : <Navigate to="/login" />}
				/>
				<Route
					path="/book/recom/rating"
					element={isAuth ? <RatingRecomBook /> : <Navigate to="/login" />}
				/>
				<Route
					path="/book/recom/like"
					element={isAuth ? <LikeRecomBook /> : <Navigate to="/login" />}
				/>
				<Route
					path="/book/recom/genre"
					element={isAuth ? <GenreRecomBook /> : <Navigate to="/login" />}
				/>
				<Route
					path="/book/recom/cover"
					element={isAuth ? <CoverRecomBook /> : <Navigate to="/login" />}
				/>
				<Route
					path="/book/:bId"
					element={isAuth ? <BookDetail /> : <Navigate to="/login" />}
				/>
				<Route
					path="/author/:aId"
					element={isAuth ? <AuthorBook /> : <Navigate to="/login" />}
				/>
				{/* 마이 페이지 */}
				<Route path="/mypage" element={isAuth ? <Mypage /> : <Navigate to="/login" />} />
				<Route
					path="/mypage/follow"
					element={isAuth ? <MyFollow /> : <Navigate to="/login" />}
				/>
				<Route
					path="/mypage/review"
					element={isAuth ? <MyReview /> : <Navigate to="/login" />}
				/>
				<Route
					path="/mypage/like"
					element={isAuth ? <MyLike /> : <Navigate to="/login" />}
				/>
				<Route
					path="/mypage/delete-account"
					element={isAuth ? <DeleteMyAccount /> : <Navigate to="/login" />}
				/>
				<Route
					path="/mypage/info/edit"
					element={isAuth ? <MyInfoEdit /> : <Navigate to="/login" />}
				/>
				<Route
					path="/mypage/tag/edit"
					element={isAuth ? <MyTagEdit /> : <Navigate to="/login" />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default AppRouter;
