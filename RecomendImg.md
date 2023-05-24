[홈으로](./README.md)

# 북적북적 Backend 표지 추천 시스템 파트(Django)

## 디렉토리 설명

recommend-bookcover
ㄴ settings
urls
bookcover
ㄴ model
serializer
urls
models
ㄴmodel\*p1 _(keras 모델 디렉토리)_
csv \_(표지 유사도 추천 테이블)\_
Docker (recommend 프로젝트 도커 이미지 파일)
manage.py

recommend-service
ㄴ basic_recom
ㄴ book_recom

## 이미지 추천 시스템 구조

- 1차로 이미지 종류를 분류한 다음, 2차로 동일 카테고리 내에서 유사도가 가장 높은 20개의 이미지 URL 반환

  - 이미지 종류 분류(1차)는 static/model_p1 모델 사용(load_model 시 폴더 째로 불러오기)
  - 이미지 유사도 분류(2차)는 scikit-image의 SSIM(Structural Similarity) 알고리즘 사용
  - 이미지 데이터 읽기 및 전처리는 cv2를 사용하였고, 색채 유사성 패턴을 고려하여 컬러 이미지로 처리했습니다.

- 표지 추천 시 최대한 비슷한 요소들을 갖고 있는 이미지를 추천할 수 있도록 추천 모델을 구성했습니다.

## 사용한 기술 스택 버전(환경설정)

- Django : 4.0
- python : 3.10
- CUDA : 11.7
- tensorflow==2.12.0
- keras==2.12.0
- ~~yolov5 모델 사용~~ **(현재 사용하지 않음)**
- Django REST Framework : 3.14.0
- ipython : 8.11.0
- OpenCV : 4.7.0.72
- Pillow : 9.3.0
- scikit-image==0.20.0

yolov5, pytorch는 더 이상 사용하지 않습니다.

### Yolov5, Pytorch를 사용하지 않는 이유

- Yolov5 모델의 경우 이미지 값을 수작업으로 라벨링(전처리)해야 하는데, 유의미한 성능을 내기 위해 필요한 전처리된 이미지 수가 상당했습니다.
- 기간 내에 이미지 데이터를 전처리하여 머신러닝 모델을 학습시키기에는 다소 어려운 점이 있어서, 다른 방법으로 선회할 필요가 있었습니다.
- Pytorch의 경우 Yolov5 모델을 사용하는 데 필요하여 사용했지만, Yolov5를 더 이상 사용하지 않다 보니 사용하지 않는 것으로 변경했습니다.
- 대신 keras에서 제공하는 딥 러닝 기반 오픈소스 모델을 사용하여, 데이터 전처리, 모델 생성 및 학습에 필요한 시간을 줄였습니다.

## 배포 환경에서 변경해야 할 점

### settings.py

- ALLOWED_HOSTS : Spring과 DB의 PORT 번호(또는 IP 주소) 입력
- DATABASES : 배포 환경 DB의 접속 정보 입력

[홈으로](./README.md)