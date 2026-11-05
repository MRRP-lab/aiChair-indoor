# Use an official React Native Android build image with Node and Java pre-installed
FROM reactnativecommunity/react-native-android:latest

# Set the working directory inside the container
WORKDIR /app

# Enable Gradle caching inside the container to speed up subsequent builds
ENV GRADLE_USER_HOME=/app/.gradle

# Install EAS CLI globally
RUN npm install -g eas-cli

# Copy package management files first to leverage Docker layer caching
COPY package*.json ./

# Install project dependencies
RUN npm ci

# Copy the rest of your application code
COPY . .

# Default command to run your specific EAS preview build
# CMD ["eas", "build", "--platform", "android", "-e", "preview", "--local", "--non-interactive"]
CMD ["eas", "build", "--platform", "android", "-e", "development", "--local"]