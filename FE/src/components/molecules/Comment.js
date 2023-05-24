import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteReview } from "../../apis/BookApi";
import { deleteComment } from "../../apis/sentenceApi";
import defaultImg from "../../assets/images/user-default-img.png";
import useDate from "../../hooks/useDate";
import useRating from "../../hooks/useRating";
import {
	CommentBtnBox,
	CommentBtnsBox,
	CommentDateBox,
	CommentHeadingBox,
	RatingEditBox,
	ReplyBox,
} from "../../styles/Book/BookDetailStyle";
import { TextBtn } from "../../styles/common/ButtonsStyle";
import { CommentBox } from "../../styles/common/CommonStyle";
import { Text } from "../../styles/common/TextsStyle";
import ReplyTextButton from "../atoms/Button/ReplyTextButton";
import RatingLabel from "../atoms/RatingLabel";
import RatingText from "../atoms/RatingText";
import CommentInput from "../molecules/Input/CommentInput";
import ModalLayer from "../organisms/ModalLayer";
import RatingSelect from "./Book/RatingSelect";

function Comment({ comment, type, setComments, getCommentApiCall }) {
	const dateTimeSeparation = useDate();
	const selectRating = useRating();
	const [isOpen, setIsOpen] = useState(false);
	const [isReplyWriting, setIsReplyWriting] = useState(false);
	const [isEditing, setIsEditing] = useState(false);

	const openPopup = () => {
		setIsOpen(true);
	};

	const handleClickEditOpen = () => {
		setIsEditing(true);
		selectRating(comment?.rating);
	};

	const handleClickEditCancel = () => {
		setIsEditing(false);
	};

	const handleClickDelete = () => {
		setIsOpen(false);

		type === "댓글" ? deleteCommentApiCall() : type === "리뷰" && deleteReviewApiCall();
	};

	const handleClickReplyWritingOrCancel = () => {
		setIsReplyWriting(!isReplyWriting);
	};

	const isMy = () => {
		if (comment?.uId === parseInt(localStorage.getItem("userId"))) {
			return true;
		}

		return false;
	};

	const deleteCommentApiCall = () => {
		(async () => {
			await deleteComment(comment?.cId).then((res) => {
				if (res === "success") {
					getCommentApiCall();
				}
			});
		})();
	};

	const deleteReviewApiCall = () => {
		(async () => {
			await deleteReview(comment?.cId).then((res) => {
				if (res === "success") {
					// 리뷰 조회 api call
					getCommentApiCall(true).then((res) => {
						setComments(res);
					});
				}
			});
		})();
	};

	return (
		<>
			<CommentBox depth={comment?.depth}>
				<img
					src={comment?.img ? comment?.img : defaultImg}
					alt="Profile of the user who commented"
				/>

				<div>
					<CommentHeadingBox>
						<Text weight="600">{comment?.nickname}</Text>

						{type === "리뷰" ? (
							<RatingLabel rating={parseInt(comment?.rating)} />
						) : (
							<CommentDateBox>
								<Text size="14" color="var(--gray-500)">
									{dateTimeSeparation(comment?.date)}
								</Text>
							</CommentDateBox>
						)}
					</CommentHeadingBox>

					{comment?.content === "" ? (
						<Text color="var(--gray-500)" marginBottom="12">
							삭제된 댓글입니다
						</Text>
					) : isEditing ? (
						// 리뷰 수정
						<div>
							<RatingEditBox>
								<RatingSelect height={20} gap={4} />
								<RatingText />
							</RatingEditBox>
							<CommentInput
								type="리뷰"
								isEditing={true}
								value={comment?.content}
								editRId={comment?.cId}
								getCommentApiCall={getCommentApiCall}
								setIsEditing={setIsEditing}
							/>
						</div>
					) : (
						<Text marginBottom="12" height="24">{comment?.content}</Text>
					)}

					{type === "리뷰" ? (
						<>
							{isMy() && (
								<CommentBtnsBox>
									{isEditing ? (
										<>
											<TextBtn onClick={handleClickEditCancel}>취소</TextBtn>
										</>
									) : (
										<>
											<TextBtn onClick={handleClickEditOpen}>수정</TextBtn>
											<TextBtn onClick={openPopup}>삭제</TextBtn>
										</>
									)}
								</CommentBtnsBox>
							)}
							<CommentDateBox>
								<Text size="14" color="var(--gray-500)">
									{dateTimeSeparation(comment?.date)}
								</Text>
							</CommentDateBox>
						</>
					) : (
						<div>
							{isReplyWriting ? (
								// 대댓글 작성바
								<ReplyBox>
									<div>
										<CommentInput
											type="댓글"
											getCommentApiCall={getCommentApiCall}
											reply={{
												isReply: true,
												cId: comment?.cId,
												setIsReplyWriting: setIsReplyWriting,
											}}
										/>
									</div>
									<TextBtn onClick={handleClickReplyWritingOrCancel}>
										취소
									</TextBtn>
								</ReplyBox>
							) : (
								<>
									<CommentBtnBox>
										{comment?.depth == 0 && comment?.content !== "" && (
											<div onClick={handleClickReplyWritingOrCancel}>
												<ReplyTextButton label="답글쓰기" />
											</div>
										)}

										{isMy() && comment?.content !== "" && (
											<TextBtn onClick={openPopup}>삭제</TextBtn>
										)}
									</CommentBtnBox>
								</>
							)}
						</div>
					)}
				</div>
			</CommentBox>
			<ModalLayer
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				title="삭제하시겠습니까?"
				leftLabel="취소"
				rightLabel="삭제"
				action={handleClickDelete}
			/>
		</>
	);
}

export default Comment;
