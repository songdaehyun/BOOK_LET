import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ActionsNavigationBar from "../../molecules/Bar/ActionsNavigationBar";
import SentenceForm from "../../organisms/Sentence/SentenceForm";

import { createPost } from "../../../apis/sentenceApi";

function WriteSentence() {
	const navigate = useNavigate();

	const uId = localStorage.getItem("userId");
	const [selectedBook, setSelectedBook] = useState();
	const [content, setContent] = useState("");
	const [background, setBackground] = useState("#FEEB60");
	const [page, setPage] = useState("");
	const [isSenetenceValid, setIsSenetenceValid] = useState(false);
	const [nextColor, setNextColor] = useState("var(--gray-300");

	useEffect(() => {
		if (selectedBook !== undefined && content !== "" && page !== "") {
			setIsSenetenceValid(true);
		} else {
			setIsSenetenceValid(false);
		}
	}, [selectedBook, content, page]);

	useEffect(() => {
		setNextColor(isSenetenceValid ? "var(--primary-600)" : "var(--gray-300)");
	}, [isSenetenceValid]);

	const handleClickPre = () => {
		navigate("/");
	};

	const handleClickNext = () => {
		const data = {
			bookIsbn: selectedBook?.bId,
			paragraphContent: content,
			paragraphPage: page,
			paragraphColor: background,
			userId: uId,
		};

		// 유효성 패스해야 api call
		if (isSenetenceValid) {
			(async () => {
				await createPost(data).then((res) => {
					if (res?.status === 201) {
						navigate(`/sentence/${res.data.id}`);
					}
				});
			})();
		}
	};

	return (
		<>
			<ActionsNavigationBar
				pre="취소"
				title="문장 쓰기"
				next="확인"
				nextColor={nextColor}
				handleClickPre={handleClickPre}
				handleClickNext={handleClickNext}
			/>
			<SentenceForm
				selectedBook={selectedBook}
				setSelectedBook={setSelectedBook}
				content={content}
				setContent={setContent}
				background={background}
				setBackground={setBackground}
				page={page}
				setPage={setPage}
			/>
		</>
	);
}

export default WriteSentence;
