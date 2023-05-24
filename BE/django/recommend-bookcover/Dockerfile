FROM python:3.9.13

# Docker의 컨테이너를 생성 및 관리 하는 사람의 정보를 기입해줍니다.
# LABEL name="Dongjun" 
# LABEL email="jdznawa@gmail.com"
RUN apt-get -y update
RUN apt-get -y install libgl1-mesa-glx
RUN apt-get -y install vim
RUN pip3 install django
# python:3.7.7 이미지 상에 django를 pip를 통해 설치합니다.

# WORKDIR은 cd와 같은 명령으로, 작업 경로를 /usr/src/app으로 이동합니다.
# CMD에서 설정한 실행 파일이 실행될 디렉터리를 절대 경로로 지정해주어야 한다.

COPY . .

# 서버 구동에 필요한 라이브러리 & 오픈소스 설치
RUN pip install --upgrade pip
RUN pip install tensorflow-intel

RUN pip install -r requirements.txt
RUN pip install tensorflow-io-gcs-filesystem==0.31.0

CMD ["python3", "manage.py", "runserver", "0.0.0.0:8713"]
# 이동한 디렉토리에서 django를 가동시켜주는 코드를 작성합니다. 여기서 port는 8000로 실행시키겠습니다.

EXPOSE 8713
# django 서버의 포트를 8000로 지정하였으므로 Docker의 컨테이너 또한 8000 포트를 열어줍니다.
