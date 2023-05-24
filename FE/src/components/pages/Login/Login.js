import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import jwt_decode from "jwt-decode";

import api from "../../../apis";

import { PrimaryLargeBtn, TextBtn } from "../../../styles/common/ButtonsStyle";
import { Container, ValidWrapper } from "../../../styles/common/ContainingsStyle";
import { DefaultInput } from "../../../styles/common/InputsStyle";
import { Text, ValidFailText } from "../../../styles/common/TextsStyle";
import { ImgWrapper, LogoBox, TextBtnWrapper } from "../../../styles/User/LoginStyle";

import { login } from "../../../apis/authApi";
import loginImg from "../../../assets/images/login-img.svg";
import Logo from "../../../assets/images/logo_left.png";

function Login() {
	const navigate = useNavigate();

	const [id, setId] = useState("");
	const [pw, setPw] = useState("");

	const [isIdConfirm, setIsIdConfirm] = useState(true);
	const [isPwConfirm, setIsPwConfirm] = useState(true);
	const [isLoginFailed, setIsLoginFailed] = useState(false);

	const hadleChangeId = (e) => {
		setId(e.target.value);
	};

	const hadleChangePw = (e) => {
		setPw(e.target.value);
	};

	const idValidTest = (e) => {
		if (id === "") {
			setIsIdConfirm(false);
		} else {
			setIsIdConfirm(true);
		}
	};

	const pwValidTest = (e) => {
		if (pw === "") {
			setIsPwConfirm(false);
		} else {
			setIsPwConfirm(true);
		}
	};

	const handleClickLogin = () => {
		if (id !== "" && pw !== "") {
			(async () => {
				await login({
					username: id,
					password: pw,
				}).then((res) => {
					if (res?.status === 200) {
						// 로그인 토큰 저장
						const token = res.headers.get("Authorization");

						const decodeData = jwt_decode(token);

						localStorage.setItem("token", token);
						localStorage.setItem("userId", parseInt(decodeData.userId));
						localStorage.setItem("userName", decodeData.username);

						// api 기본 헤더로 설정
						api.defaults.headers.common["Authorization"] = token;

						
						// navigate("/");
						window.location.replace("/")
					} else {
						setIsLoginFailed(true);
					}
				});
			})();
		} else {
			idValidTest();
			pwValidTest();
		}
	};

	const handleClickJoin = () => {
		navigate("/join/1");
	};

	return (
		<Container paddingTop="88" paddingBottom="24" paddingLeft="24" paddingRight="24">
			<LogoBox>
				<img src={Logo} alt="Logo" />
				<Text marginTop="12">책을 읽다, 문장으로 잇다.</Text>
			</LogoBox>
			<ImgWrapper>
				<img src={loginImg} alt="이미지" />
			</ImgWrapper>

			<DefaultInput
				placeholder="아이디를 입력해주세요."
				value={id}
				onChange={hadleChangeId}
				onBlur={idValidTest}
				marginTop="56"
			></DefaultInput>
			<>
				{!isIdConfirm && (
					<ValidWrapper>
						<ValidFailText>아이디를 입력해주세요</ValidFailText>
					</ValidWrapper>
				)}
			</>
			<DefaultInput
				type="password"
				placeholder="비밀번호를 입력해주세요."
				value={pw}
				onChange={hadleChangePw}
				onBlur={pwValidTest}
				marginTop="8"
			></DefaultInput>
			<>
				{!isPwConfirm ? (
					<ValidWrapper>
						<ValidFailText>비밀번호를 입력해주세요</ValidFailText>
					</ValidWrapper>
				) : isLoginFailed && (
					<ValidWrapper>
						<ValidFailText>아이디나 비밀번호가 잘못되었습니다</ValidFailText>
					</ValidWrapper>
				)}
			</>
			<PrimaryLargeBtn onClick={handleClickLogin} marginTop="16" marginBottom="16">
				로그인
			</PrimaryLargeBtn>
			<TextBtnWrapper>
				<TextBtn onClick={handleClickJoin} size="14">
					회원가입
				</TextBtn>
			</TextBtnWrapper>
		</Container>
	);
}

export default Login;
