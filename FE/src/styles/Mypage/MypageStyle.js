import styled from "styled-components";

export const FollowLabelsBox = styled.div`
	display: flex;
	gap: 16px;
`;

export const FollowLabelBox = styled.div`
	width: fit-content;

	padding: 4px 8px;

	display: flex;
	justify-content: space-between;

	background: #dcfddc;
	border-radius: 4px;
`;

export const MyReviewPreveiwCardGroupBox = styled.div`
	display: flex;
	gap: 24px;
`;

export const MyReviewPreviewCardBox = styled.div`
	height: 240px;

	padding: 16px;
	padding-bottom: 8px;

	display: flex;
	flex-direction: column;

	background: #ffffff;
	box-shadow: 0px 0px 15px 1px rgba(0, 0, 0, 0.15);
	border-radius: 8px;

	img {
		width: auto;
		height: 64px;

		margin-right: 16px;

		filter: drop-shadow(0px 0px 8px rgba(0, 0, 0, 0.15));
		/* border-radius: 0px 5px 5px 0px; */
	}
`;

export const MyReviewPreviewBookInfoBox = styled.div`
	display: flex;

	> div {
		display: flex;
		flex-direction: column;
	}

	> div > div:last-child {
		margin-top: auto;
	}
`;

export const MyReviewPreviewReviewInfoBox = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
	justify-content: space-between;

	> div:last-child {
		margin-top: auto;

		display: flex;
		float: right;
		justify-content: flex-end;
		align-items: flex-end;
	}
`;

export const MypageFooterBox = styled.div`
	margin-top: 88px;
	padding: 0 16px;

	display: flex;

	div {
		align-items: center;
		display: flex;
	}

	img {
		height: 14px;
		align-self: center;
	}
`;

export const MyReviewDetailBox = styled.div`
	img {
		width: auto;
		height: 64px;

		margin-right: 16px;

		filter: drop-shadow(0px 0px 8px rgba(0, 0, 0, 0.15));
		/* border-radius: 0px 5px 5px 0px; */
	}

	> div:first-child {
		margin-bottom: 8px;
	}

	> div:first-child > div {
		width: 100%;
	}
`;

export const MyReviewDetailHeadingBox = styled.div`
	display: flex;
	justify-content: space-between;
`;

export const DeleteAccountGuideContentBox = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 24px;

	svg {
		margin-right: 16px;
	}
`;

export const DeleteAccountCheckBox = styled.div`
	margin-bottom: 24px;

	display: flex;
	align-items: center;

	> div {
		display: flex;
	}

	svg {
		width: auto;
		height: 16px;

		margin-right: 16px;

		fill: ${(props) => (props.isChecked ? "var(--primary-600)" : "var(--gray-300)")};
	}
`;

export const DeleteMyAccountBox = styled.div`
	height: calc(100vh);

	padding: 51px 16px;
	padding-bottom: 0;

	position: relative;

	> svg {
		width: 60%;
		height: auto;

		margin: auto;
		margin-top: 64px;
		margin-bottom: 72px;

		display: flex;
	}
`;

export const DeleteAccounBottomBox = styled.div`
	position: absolute;

	bottom: 24px;
	left: 16px;
	right: 16px;
`;

export const UploadProfileImage = styled.div``;

export const UploadPictureSection = styled.div`
	height: 100px;
	display: flex;
	justify-content: center;
	position: relative;
`;

export const ImageInput = styled.input`
	display: none;
`;

export const PictureSection = styled.div`
	cursor: pointer;
	width: 100px;
	height: 100px;

	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

export const PicturePreview = styled.img`
	width: 100%;
	height: 100%;

	object-fit: cover;

	/* width: 100px;
	height: 100px;
	border-radius: 50px;

	position: relative; */

	border: 1px solid var(--gray-300);
	border-radius: 50%;
`;

export const UploadButton = styled.div`
	position: absolute;
	top: 80%;
	left: 90%;
	transform: translate(-50%, -50%);
	width: 40px;
	height: 40px;

	background-color: white;
	color: var(--primary-600);
	font-weight: bold;
	font-size: 22px;
	border-radius: 50%;
	border: 1px solid var(--gray-300);
	text-align: center;
	justify-content: center;
	align-items: center;
	display: flex;
	padding-bottom: 2px;
	padding-left: 2px;
`;

export const UploadPictureBox = styled.div`
	width: 100px;
	height: 100px;

	position: relative;

	/* border: 1px solid var(--gray-300); */
	/* border-radius: 50%; */
	/* overflow: hidden; */
`;

export const UploadPictureEmptyBox = styled.div`
	width: 100%;
	height: 100%;

	background-color: var(--gray-100);

	display: flex;
	justify-content: center;
	align-items: center;

	border: 1px solid var(--gray-300);
	border-radius: 50%;

	img {
		width: 32px;
		height: auto;
	}
`;

export const DefaultImgSettingBtnBox = styled.div`
	display: flex;
	justify-content: flex-end;
`;
