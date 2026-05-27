# ─── Build stage ─────────────────────────────────────────────────────────────
FROM maven:3.9-eclipse-temurin-17 AS builder
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline -B
COPY src ./src
RUN mvn clean package -DskipTests -B

# ─── Runtime stage ────────────────────────────────────────────────────────────
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
RUN addgroup -S sawai && adduser -S sawai -G sawai
COPY --from=builder /app/target/ghee-backend-1.0.0.jar app.jar
RUN chown sawai:sawai app.jar
USER sawai
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
