FROM openjdk:11-jdk-slim
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} ParagraphApp.jar
ENTRYPOINT ["java" , "-jar", "/ParagraphApp.jar"]