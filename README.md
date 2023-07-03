# Booking UI

## Framework and Runtime Environemnt
node: v16.15.1
react: 18.2.0

## This app create by using 
```zsh
npx create-react-app .
```

## Install Dependencies
```zsh
npm install
```

## Start app
```zsh
npm start
```

## Using booking-ui
access web page by using: http://localhost:3000/

## Create docker image and Run booking-ui through docker
```zsh
# Make sure your docker is running !

# give exe permission to create_docker_image.sh 
chmod +x create_docker_image.sh

# create_docker_image.sh will create docker image
./create_docker_image.sh

# build and run the containers, use 'docker-compose up -d' 
# if the app need to run at background
docker-compose up

# Stop and remove the containers:
docker-compose down
```