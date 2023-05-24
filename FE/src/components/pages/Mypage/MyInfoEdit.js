import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { defaultImgSetting, updateMyImg, updateMyInfo } from "../../../apis/authApi";
import { getMyInfo } from "../../../apis/userApi";
import { setEmail, setId, setNickname } from "../../../reducer/join";
import { DefaultImgSettingBtnBox } from "../../../styles/Mypage/MypageStyle";
import { TextBtn } from "../../../styles/common/ButtonsStyle";
import { Container } from "../../../styles/common/ContainingsStyle";
import UploadProfileImage from "../../atoms/Mypage/UploadProfileImage";
import ActionsNavigationBar from "../../molecules/Bar/ActionsNavigationBar";
import JoinBasicForm from "../../organisms/Join/JoinBasicForm";

function MyInfoEdit(props) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const allValidRef = useRef();

	const uId = localStorage.getItem("userId");
	const uName = localStorage.getItem("userName");

	const { nickname, email } = useSelector((state) => state.join);
	const [imageFile, setImageFile] = useState("");
	const [curImg, setCurImg] = useState("");
	const [curNickname, setCurNickname] = useState("");
	const [curEmail, setCurEmail] = useState("");

	useEffect(() => {
		dispatch(setId(uId));

		(async () => {
			await getMyInfo(uName).then((res) => {
				dispatch(setNickname(res?.nickname));
				dispatch(setEmail(res?.email));

				setCurNickname(res?.nickname);
				setCurEmail(res?.email);

				setImageFile(res?.imgPath);
				setCurImg(res?.imgPath);
			});
		})();
	}, []);

	const updateImgApiCall = () => {
		const formData = new FormData();

		formData.append("file", imageFile);

		(async () => {
			await updateMyImg(uName, formData).then((res) => {
				if (res === "success") {
					navigate("/mypage");
				}
			});
		})();
	};

	const defaultImgSettingApiCall = () => {
		(async () => {
			await defaultImgSetting(uName).then((res) => {
				if (res === "success") {
					navigate("/mypage");
				}
			});
		})();
	};

	const handleClickDefaultImgSetting = () => {
		setImageFile("");
	};

	const handleClickPre = () => {
		navigate("/mypage");
	};

	const handleClickNext = () => {
		if (allValidRef.current.allConfirmTest()) {
			const data = {
				username: uName,
				nickname: nickname,
				email: email,
			};

			(async () => {
				await updateMyInfo(uName, data).then((res) => {
					if (res === "success") {
						// 이미지가 변경되었을 경우에만 이미지 수정 요청
						// 이미지가 빈 문자열이라면 이미지 삭제 요청
						if (curImg !== imageFile) {
							if (imageFile === "") {
								console.log("기본 이미지");
								defaultImgSettingApiCall();
							} else {
								updateImgApiCall();
							}
						} else {
							navigate("/mypage");
						}
					}
				});
			})();
		}
	};

	return (
		<>
			<ActionsNavigationBar
				pre="취소"
				title="회원 정보 수정"
				next="확인"
				handleClickPre={handleClickPre}
				handleClickNext={handleClickNext}
			/>
			<Container paddingTop="86" paddingLeft="16" paddingRight="16">
				<DefaultImgSettingBtnBox>
					<TextBtn onClick={handleClickDefaultImgSetting} size={14}>
						기본 이미지로 설정
					</TextBtn>
				</DefaultImgSettingBtnBox>
				<UploadProfileImage imageFile={imageFile} setImageFile={setImageFile} />
				<JoinBasicForm
					ref={allValidRef}
					type="edit"
					curInfo={{ nickname: curNickname, email: curEmail }}
				/>
			</Container>
		</>
	);
}

export default MyInfoEdit;
