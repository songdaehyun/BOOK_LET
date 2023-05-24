FROM openjdk:11-jdk-slim
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} UserApp.jar
ENTRYPOINT ["java" , "-jar", "/UserApp.jar"]