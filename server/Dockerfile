FROM node:latest
# Set the working directory to /api
WORKDIR /api
# copy package.json into the container at /api
COPY package*.json ./
# install dependencies
RUN npm install
# Copy the current directory contents into the container at /api
COPY . .
# Make port 80 available to the world outside this container
EXPOSE 5050
# Run the app when the container launches
CMD ["npm", "start"]

