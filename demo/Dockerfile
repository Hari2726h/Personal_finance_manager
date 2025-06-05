# Use official Maven image to build the app
FROM maven:3.8.7-openjdk-17-slim AS build

# Set working directory
WORKDIR /app

# Copy pom.xml and download dependencies
COPY pom.xml .

RUN mvn dependency:go-offline

# Copy the source code
COPY src ./src

# Build the Spring Boot app (creates a fat jar)
RUN mvn clean package -DskipTests

# Use official OpenJDK runtime image for running the app
FROM openjdk:17-jdk-slim

# Copy the jar file from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose port (make sure your Spring Boot app listens on this port)
EXPOSE 8080

# Run the jar file
ENTRYPOINT ["java", "-jar", "/app.jar"]

