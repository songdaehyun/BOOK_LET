import React, { forwardRef, useImperativeHandle, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { setEmail, setId, setNickname, setPw } from "../../../reducer/join";

import CricleCheck from "../../atoms/Icon/CricleCheck";

import { checkEmail, checkId, checkNickname } from "../../../apis/authApi";
import { initCheck } from "../../../apis/init/initAuth";
import { ValidLabel } from "../../../styles/common/CommonStyle";
import { Container, ValidLabelContainer } from "../../../styles/common/ContainingsStyle";
import { DefaultInput } from "../../../styles/common/InputsStyle";
import { Label } from "../../../styles/common/TextsStyle";

const JoinBasicForm = forwardRef(({ type, curInfo }, ref) => {
	useImperativeHandle(ref, () => ({
		allConfirmTest,
	}));

	const dispatch = useDispatch();

	const { id, nickname, email, pw } = useSelector((state) => state.join);

	// 아이디
	const [idCntValid, setIdCntValid] = useState("default");
	const [idIncludeValid, setIdIncludeValid] = useState("default");
	const [idDuplicationValid, setIdDuplicationValid] = useState("default");

	// 닉네임
	const [nicknameCntValid, setNicknameCntValid] = useState("default");
	const [nicknameDuplicationValid, setNicknameDuplicationValid] = useState("default");

	// 이메일
	const [emailFormValid, setEmailFormValid] = useState("default");
	const [emailDuplicationValid, setEmailDuplicationValid] = useState("default");

	// 비밀번호
	const [pwCntValid, setPwCntValid] = useState("default");
	const [pwIncludeValid, setPwIncludeValid] = useState("default");

	// 비밀번호 확인
	const [pwConfirm, setPwConfirm] = useState("");
	const [pwSameValid, setPwSameValid] = useState("default");

	const hadleChangeId = (e) => {
		dispatch(setId(e.target.value));
	};
	const hadleChangeNickname = (e) => {
		dispatch(setNickname(e.target.value));
	};
	const hadleChangeEmail = (e) => {
		dispatch(setEmail(e.target.value));
	};
	const hadleChangePw = (e) => {
		dispatch(setPw(e.target.value));
	};
	const hadleChangePwConfirm = (e) => {
		setPwConfirm(e.target.value);
	};

	// 유효성 검사
	const idValidTest = (e) => {
		var regId = /[a-zA-Z]/g;

		// 아이디 유효성 패스 여부
		let isValidConfirm = true;

		if (0 < id.length && id.length <= 12) {
			setIdCntValid("success");
		} else {
			setIdCntValid("fail");
			isValidConfirm = false;
		}
		if (regId.test(id)) {
			setIdIncludeValid("success");
		} else {
			setIdIncludeValid("fail");
			isValidConfirm = false;
		}

		// 아이디 중복 체크
		(async () => {
			await checkId(id)
				.then((res) => initCheck(res))
				.then((res) => {
					setIdDuplicationValid(res);
				});
		})();
		// if (true) {
		// 	setIdDuplicationValid("success");
		// }

		return isValidConfirm;
	};

	const nicknameValidTest = (e) => {
		// 닉네임 유효성 패스 여부
		let isValidConfirm = true;

		if (0 < nickname.length && nickname.length <= 12) {
			setNicknameCntValid("success");
		} else {
			setNicknameCntValid("fail");
			isValidConfirm = false;
		}

		// 닉네임 중복 체크
		// 수정일 때 내 닉네임 대해서는 체크하지 않고 유효성 성공
		if (type === "edit" && nickname === curInfo?.nickname) {
			setNicknameDuplicationValid("success");
		} else {
			(async () => {
				await checkNickname(nickname)
					.then((res) => initCheck(res))
					.then((res) => {
						setNicknameDuplicationValid(res);
					});
			})();
		}

		return isValidConfirm;
	};

	const emailValidTest = (e) => {
		var regEmail = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

		// 이메일 유효성 패스 여부
		let isValidConfirm = true;

		if (regEmail.test(email)) {
			setEmailFormValid("success");
		} else {
			setEmailFormValid("fail");
			isValidConfirm = false;
		}

		// 이메일 중복 체크
		// 수정일 때 내 이메일 대해서는 체크하지 않고 유효성 성공
		if (type === "edit" && email === curInfo?.email) {
			setEmailDuplicationValid("success");
		} else {
			(async () => {
				await checkEmail(email)
					.then((res) => initCheck(res))
					.then((res) => {
						setEmailDuplicationValid(res);
					});
			})();
		}

		return isValidConfirm;
	};

	const pwValidTest = (e) => {
		var regPw = /[`~!@#$%^&*|\\\'\";:\/?]/gi;

		// 비밀번호 유효성 패스 여부
		let isValidConfirm = true;

		if (8 <= pw.length && pw.length <= 16) {
			setPwCntValid("success");
		} else {
			setPwCntValid("fail");
			isValidConfirm = false;
		}

		if (regPw.test(pw)) {
			setPwIncludeValid("success");
		} else {
			setPwIncludeValid("fail");
			isValidConfirm = false;
		}

		return isValidConfirm;
	};

	const pwConfirmValidTest = (e) => {
		// 비밀번호 확인 유효성 패스 여부
		let isValidConfirm = true;

		if (pw === pwConfirm) {
			setPwSameValid("success");
		} else {
			setPwSameValid("fail");
			isValidConfirm = false;
		}

		return isValidConfirm;
	};

	function allConfirmTest() {
		return type === "edit"
			? nicknameValidTest() && emailValidTest()
			: idValidTest() &&
					nicknameValidTest() &&
					emailValidTest() &&
					pwValidTest() &&
					pwConfirmValidTest();
	}

	return (
		<div>
			{type !== "edit" && (
				<Container marginTop="32" marginBottom="24">
					<Label size="14" weight="600">
						아이디
						<DefaultInput
							placeholder="아이디를 입력해주세요"
							value={id}
							onChange={hadleChangeId}
							onBlur={idValidTest}
							marginTop="8"
							marginBottom="8"
						></DefaultInput>
					</Label>
					<ValidLabelContainer>
						<ValidLabel state={idCntValid}>
							<CricleCheck />
							<span>12자 이내</span>
						</ValidLabel>
						<ValidLabel state={idIncludeValid}>
							<CricleCheck />
							<span>영문 포함</span>
						</ValidLabel>
						<ValidLabel state={idDuplicationValid}>
							<CricleCheck />
							<span>중복 확인</span>
						</ValidLabel>
					</ValidLabelContainer>
				</Container>
			)}

			<Container marginTop="32" marginBottom="24">
				<Label size="14" weight="600">
					닉네임
					<DefaultInput
						placeholder="닉네임을 입력해주세요"
						value={nickname}
						onChange={hadleChangeNickname}
						onBlur={nicknameValidTest}
						marginTop="8"
						marginBottom="8"
					></DefaultInput>
				</Label>
				<ValidLabelContainer>
					<ValidLabel state={nicknameCntValid}>
						<CricleCheck />
						<span>12자 이내</span>
					</ValidLabel>
					<ValidLabel state={nicknameDuplicationValid}>
						<CricleCheck />
						<span>중복 확인</span>
					</ValidLabel>
				</ValidLabelContainer>
			</Container>

			<Container marginTop="32" marginBottom="24">
				<Label size="14" weight="600">
					이메일
					<DefaultInput
						placeholder="이메일을 입력해주세요"
						value={email}
						onChange={hadleChangeEmail}
						onBlur={emailValidTest}
						marginTop="8"
						marginBottom="8"
					></DefaultInput>
				</Label>
				<ValidLabelContainer>
					<ValidLabel state={emailFormValid}>
						<CricleCheck />
						<span>이메일 형식</span>
					</ValidLabel>
					<ValidLabel state={emailDuplicationValid}>
						<CricleCheck />
						<span>중복 확인</span>
					</ValidLabel>
				</ValidLabelContainer>
			</Container>

			{type !== "edit" && (
				<>
					<Container marginTop="32" marginBottom="24">
						<Label size="14" weight="600">
							비밀번호
							<DefaultInput
								type="password"
								placeholder="비밀번호를 입력해주세요"
								value={pw}
								onChange={hadleChangePw}
								onBlur={pwValidTest}
								marginTop="8"
								marginBottom="8"
							></DefaultInput>
						</Label>
						<ValidLabelContainer>
							<ValidLabel state={pwCntValid}>
								<CricleCheck />
								<span>8-16자 이내</span>
							</ValidLabel>
							<ValidLabel state={pwIncludeValid}>
								<CricleCheck />
								<span>특수문자 포함</span>
							</ValidLabel>
						</ValidLabelContainer>
					</Container>

					<Container marginTop="32" marginBottom="24">
						<Label size="14" weight="600">
							비밀번호 확인
							<DefaultInput
								type="password"
								placeholder="비밀번호를 재입력해주세요"
								value={pwConfirm}
								onChange={hadleChangePwConfirm}
								onBlur={pwConfirmValidTest}
								marginTop="8"
								marginBottom="8"
							></DefaultInput>
						</Label>
						<ValidLabelContainer>
							<ValidLabel state={pwSameValid}>
								<CricleCheck />
								<span>비밀번호 일치</span>
							</ValidLabel>
						</ValidLabelContainer>
					</Container>
				</>
			)}
		</div>
	);
});

export default JoinBasicForm;
