import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getBookSearch } from "../../../apis/BookApi";
import { initBookSearch } from "../../../apis/init/initBook";
import searchIcon from "../../../assets/icons/search-icon.png";
import { Text } from "../../../styles/common/TextsStyle";
import {
	SentenceBookSearchBarBox,
	SentenceBookSearchInputBox,
} from "../../../styles/Sentence/SentenceFormStyle";
import { Container } from "../../../styles/common/ContainingsStyle";
import { TextBtn } from "../../../styles/common/ButtonsStyle";
import { BookSearchHeadingBox } from "../../../styles/Book/BookStyle";

function BookSearch(props) {
	const navigate = useNavigate();

	const [searchWord, setSearchWord] = useState("");
	const [searchBooks, setSearchBooks] = useState([]);
	const [page, setPage] = useState(0);
	const [isFetching, setFetching] = useState(false);
	const [hasNextPage, setNextPage] = useState(true);

	const searchApiCall = useCallback(
		async (word, isStart) => {
			return (async () => {
				await getBookSearch(word, 10, isStart ? 0 : page)
					.then(initBookSearch)
					.then((res) => {
						isStart
							? setSearchBooks(res?.contents)
							: setSearchBooks(searchBooks.concat(res?.contents));

						setNextPage(res?.hasNextPage);
						setFetching(false);
					});

				isStart ? setPage(1) : setPage(page + 1);
			})();
		},
		[page]
	);

	const handleClickBook = (book) => {
		navigate(`/book/${book?.bId}`);
	};

	const handleChangeSearchWord = (e) => {
		setSearchWord(e.target.value);
		setPage(0);
	};

	const handleClickCancel = () => {
		navigate("/book");
	};

	useEffect(() => {
		const handleScroll = () => {
			const { scrollTop, offsetHeight } = document.documentElement;
			if (window.innerHeight + scrollTop + 0.5 >= offsetHeight) {
				setFetching(true);
			}
		};

		setFetching(true);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		if (isFetching && hasNextPage) {
			console.log(searchWord);
			searchApiCall(searchWord);
		} else if (!hasNextPage) setFetching(false);
	}, [isFetching]);

	useEffect(() => {
		if (page === 0) {
			searchApiCall(searchWord, true);
		}
	}, [searchWord, page]);

	return (
		<Container marginTop="16" paddingLeft="16" paddingRight="16">
			<BookSearchHeadingBox>
				<SentenceBookSearchBarBox>
					<SentenceBookSearchInputBox>
						<img src={searchIcon} alt="search icon" />
						<div>
							<input
								autoFocus
								value={searchWord}
								placeholder="책을 검색해주세요"
								onChange={handleChangeSearchWord}
							/>
						</div>
					</SentenceBookSearchInputBox>
				</SentenceBookSearchBarBox>
				<TextBtn onClick={handleClickCancel}>취소</TextBtn>
			</BookSearchHeadingBox>
			<div>
				{searchBooks?.length === 0 ? (
					<Text color="var(--gray-500)">검색 결과가 없습니다.</Text>
				) : (
					<>
						{searchBooks?.map((book) => (
							<Container
								key={book?.bid}
								onClick={() => handleClickBook(book)}
								marginBottom="32"
							>
								<Text marginBottom="4" weight="600">{book?.title}</Text>
								<Text size="14" color="var(--gray-500)">
									{book?.author}
								</Text>
							</Container>
						))}
					</>
				)}
			</div>
		</Container>
	);
}

export default BookSearch;
