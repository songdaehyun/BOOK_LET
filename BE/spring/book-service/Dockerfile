FROM openjdk:11-jdk-slim
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} BookApp.jar
ENTRYPOINT ["java" , "-jar", "/BookApp.jar"]