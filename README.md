This is an attempt to create graphQL server inside docker container with express server. 

docker-machine start 
docker-machine ls ==> will give ip of docker host.

#start docker container with 4000 port published
docker run -p 4000:4000 -ti --rm centos:latest bash

#inside container, get node via npm
curl https://raw.githubusercontent.com/creationix/nvm/v0.13.1/install.sh | bash
cat ~/.bash_profile
nvm list-remote
nvm install v10.6.0

#create directory and initialize with npm

mkdir GraphQLServer && cd GraphQLServer
npm init
>index.ts

Inside package.json => add below scripts:
"start" : "ts-node index.ts"
"dev": "npm-run-all --parallel start playground"
"playground": "graphql playground"


npm install graphql-yoga casual --save
npm install graphql-cli npm-run-all ts-node typescript --save-dev


#start graphql server inside container
npm run dev


# Now you can access server in the broswer from any machine, using docker host ip
dockerhostip:4000/graphiql
