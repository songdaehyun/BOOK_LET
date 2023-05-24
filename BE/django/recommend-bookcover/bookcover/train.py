import pandas as pd
import requests
# from skimage.metrics import structural_similarity as ssim
import requests
import numpy as np
import cv2
# from tensorflow import keras
from .models import BookInfoModel

# skimage.ssim을 이용해 연관 이미지 추천해 주는 함수


def bookcover_recommendation(result_dataframe):
    # 추천 리스트
    rec_list = []

    # df의 행을 하나씩 읽으면서 각 이미지마다 유사도 검사
    for col in range(result_dataframe.shape[0]):
        # 요청받은 이미지의 특성 정보 행
        input_data = result_dataframe.iloc[col]
        json_title = input_data["book_isbn"]
        input_feeling = input_data["feeling"]

        # Django ORM으로 DB에서 표지 분류 결과가 일치하는 항목 가져오기
        db_dataframe = BookInfoModel.objects.filter(
            feeling=input_feeling
        )

        # 사용자가 제출한 선호 추천 표지
        image_src1 = input_data["book_image"]

        # 두 이미지를 numpy array로 전환
        origin_img1 = np.asarray(
            bytearray(
                requests.get(image_src1).content
            ),
            dtype=np.uint8
        )
        resize_img1 = cv2.resize(origin_img1, (300, 300))

        # score와 DB 인덱스를 DataFrake 형태로 정리
        rec_series = pd.DataFrame(columns=[
            "book_isbn",
            "book_image",
            "ssim_score"
        ])

        # DB에 저장된 책 표지와 일대일 유사도 비교
        for single_data in db_dataframe.iterator():
            ssim_value = dict()
            # DB의 정보들 중 idx 행에 있는 book_image에 저장된 URL 반환
            image_src2 = single_data.book_image

            origin_img2 = np.asarray(
                bytearray(requests.get(image_src2).content), dtype=np.uint8)
            resize_img2 = cv2.resize(origin_img2, (300, 300))

            # score = 이미지 간의 유사도(-1 ~ 1 사이, 1에 가까울수록 유사도 높음)
            # (score, diff) = ssim(resize_img1, resize_img2, full=True)

            ssim_value["ssim_score"] = score
            ssim_value["book_image"] = image_src2

            ssim_value = pd.DataFrame([ssim_value])

            # score, 이미지 URL 값을 rec_series에 추가
            rec_series = pd.concat([rec_series, ssim_value])

        # score를 기준으로 상위 20개 필터링
        # rec_list에 추가할 상위 20개 점수의 이미지
        highscore = rec_series.nlargest(20, "ssim_score")
        highscore = highscore["book_image"].tolist()

        # 필터링 결과는 {책 번호: [추천 이미지 목록]} 형태로 rec_list에 추가
        rec_list.append({json_title: highscore})

    # pkl 파일로 static 디렉토리에 저장
    return rec_list[0]
