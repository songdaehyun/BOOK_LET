# # BE/Dockerfile (Django)
FROM python:3.8.10
ENV PYTHONUNBUFFERED 1
RUN apt-get -y update
RUN apt-get -y install vim 
RUN mkdir /srv/docker-server
ADD . /srv/docker-server 
WORKDIR /srv/docker-server 
RUN pip3 install --upgrade pip 
RUN pip3 install -r requirements.txt 
EXPOSE 8083
CMD ["python", "manage.py", "runserver", "0.0.0.0:8083"]
