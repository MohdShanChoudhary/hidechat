# Step 1: Build stage
FROM maven:3.9.6-eclipse-temurin-17 AS build

WORKDIR /app
COPY . .

# Build jar
RUN mvn clean package -DskipTests

# Step 2: Run stage
FROM eclipse-temurin:17-jre

WORKDIR /app

# Copy jar from build stage
COPY --from=build /app/target/*.jar app.jar

# Render uses PORT env variable
EXPOSE 10000

# Run app
ENTRYPOINT ["java", "-jar", "app.jar"]