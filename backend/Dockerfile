# Use official Node.js image as a base
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Compile TypeScript to JavaScript
RUN npx tsc

# Expose the required ports
EXPOSE 8080

# Run the compiled JavaScript files
CMD ["node", "dist/server.js"]
