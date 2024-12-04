# Start with a base image containing Java runtime
FROM openjdk:24-ea-21-jdk-slim-bullseye

# Add Maintainer Info
LABEL maintainer="upadhyayharsh533@gmail.com"

# Add a volume pointing to /tmp
VOLUME /tmp

# Make port 8080 available to the world outside this container
EXPOSE 8080

# The application's jar file
ARG JAR_FILE=target/InvoiceGen-0.0.1-SNAPSHOT.jar

# Add the application's jar to the container
ADD ${JAR_FILE} app.jar
ADD src/main/resources/static src/main/resources/static
# Run the jar file
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar"]