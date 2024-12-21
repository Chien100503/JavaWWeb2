# Use a Maven image to build the project
FROM maven:3.8.8-eclipse-temurin-17 AS builder

# Set the working directory in the container
WORKDIR /app

# Copy the entire project into the container
COPY .. .

# Build the project using Maven, skipping tests for faster builds
RUN mvn clean package -DskipTests

# Use a slim version of OpenJDK for the runtime environment
FROM openjdk:17-jdk-slim

# Set the working directory for the runtime
WORKDIR /app

# Copy the Spring Boot jar file from the build stage
COPY target/backend-0.0.1-SNAPSHOT.jar app.jar

# Expose the application's port
EXPOSE 8080

# Specify the command to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
