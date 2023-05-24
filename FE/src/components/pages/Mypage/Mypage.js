import React from "react";
import { SeparationBar } from "../../../styles/common/BarsStyle";
import { Container, OverflowHiddenBox } from "../../../styles/common/ContainingsStyle";
import TabBar from "../../molecules/Bar/TabBar";
import MyAccountSetSection from "../../organisms/Mypage/MyAccountSetSection";
import MyInfoSetSection from "../../organisms/Mypage/MyInfoSetSection";
import MyLikePreviewSection from "../../organisms/Mypage/MyLikePreviewSection";
import MypageFooter from "../../organisms/Mypage/MypageFooter";
import MyReviewPreviewSection from "../../organisms/Mypage/MyReviewPreviewSection";
import UserInfoOverview from "../../organisms/Mypage/UserInfoOverview";

function Mypage(props) {
	return (
		<>
			<OverflowHiddenBox paddingBottom="67">
				<UserInfoOverview />
				<SeparationBar />
				<MyReviewPreviewSection />
				<MyLikePreviewSection />
				<MyInfoSetSection />
				<MyAccountSetSection />
				<MypageFooter />
			</OverflowHiddenBox>
			<TabBar selected={3} />
		</>
	);
}

export default Mypage;
