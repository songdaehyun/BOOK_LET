import React, { useEffect, useRef, useState } from "react";
import { getBookSearch } from "../../../apis/BookApi";
import { initBookSearch } from "../../../apis/init/initBook";
import searchIcon from "../../../assets/icons/search-icon.png";
import { Text } from "../../../styles/common/TextsStyle";
import {
	SentenceBookAutoSearchBox,
	SentenceBookSearchBarBox,
	SentenceBookSearchBox,
	SentenceBookSearchInputBox,
	SentenceBookSearchResultBox,
} from "../../../styles/Sentence/SentenceFormStyle";

function SentenceBookSearch({ selectedBook, setSelectedBook }) {
	const inputRef = useRef();
	const [isOpen, setIsOpen] = useState();
	const [isInputInvisible, setIsInputInvisible] = useState(true);
	const [searchWord, setSearchWord] = useState("");
	const [searchBooks, setSearchBooks] = useState([]);

	const closeAutoSearch = () => {
		setTimeout(() => {
			setIsOpen(false);
		}, 100);
	};

	const handleClickSearchBox = () => {
		setIsOpen(true);

		setTimeout(() => {
			inputRef.current?.focus();
		}, 100);
	};

	const searchApiCall = (word) => {
		(async () => {
			await getBookSearch(word, 10, 0)
				.then(initBookSearch)
				.then((res) => setSearchBooks(res?.contents));
		})();
	};

	const handleChangeSearchWord = (e) => {
		setSearchWord(e.target.value);
		searchApiCall(e.target.value);
	};

	const handleClickBook = (book) => {
		setSelectedBook({
			bId: book?.bId,
			title: book?.title,
			author: book.author,
			cover: book.cover,
		});
	};

	useEffect(() => {
		setIsInputInvisible(!isOpen && selectedBook);
	}, [isOpen, selectedBook]);

	return (
		<SentenceBookSearchBox>
			<SentenceBookSearchBarBox onClick={handleClickSearchBox}>
				{isInputInvisible ? (
					<SentenceBookSearchResultBox>
						<img src={selectedBook?.cover} alt="selected book cover" />
						<div>
							<Text weight="bold" marginBottom="4">
								{selectedBook?.title}
							</Text>
							<Text>{selectedBook?.author}</Text>
						</div>
					</SentenceBookSearchResultBox>
				) : (
					<SentenceBookSearchInputBox>
						<img src={searchIcon} alt="search icon" />
						<div>
							<input
								ref={inputRef}
								value={searchWord}
								placeholder="책을 선택해주세요"
								onBlur={closeAutoSearch}
								onChange={handleChangeSearchWord}
							/>
							<Text size="14" color="var(--gray-500)">
								어떤 책을 읽으셨어요?
							</Text>
						</div>
					</SentenceBookSearchInputBox>
				)}
			</SentenceBookSearchBarBox>
			<SentenceBookAutoSearchBox isOpen={isOpen}>
				{searchBooks?.length === 0 ? (
					<Text color="var(--gray-500)">검색 결과가 없습니다.</Text>
				) : (
					<>
						{searchBooks?.map((book) => (
							<div key={book.bid} onClick={() => handleClickBook(book)}>
								<Text marginBottom="4" weight="600">{book?.title}</Text>
								<Text size="14" color="var(--gray-500)">
									{book?.author}
								</Text>
							</div>
						))}
					</>
				)}
			</SentenceBookAutoSearchBox>
		</SentenceBookSearchBox>
	);
}

export default SentenceBookSearch;
