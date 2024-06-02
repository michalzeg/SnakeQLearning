# Use the official Node.js image as the base image
FROM node:20.9.0

# Set the working directory in the container
WORKDIR /usr/app


COPY . .
# Install app dependencies
WORKDIR /usr/app/training
RUN npm install

# Copy the rest of the application files
WORKDIR /usr/app/server
RUN npm install

RUN npm install -g typescript
# Compile TypeScript code to JavaScript
RUN tsc



