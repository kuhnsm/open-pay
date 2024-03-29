# open-pay

Open pay is an open sourced HR/Payroll system. It uses React JSON Schema Forms, so the system is easily extended to gather any custom data about employees.

## Architecture
The front end is a React app and the back end is a Node app. Both front end and back end use Typescript. The database is MongoDB. 

## Running
From the client directory run 
npm run dev

From the server directory run
npm run start

Launch browser to:
http://localhost:3000

## Testing

The client uses Cypress to test. You can run the tests by running the script:

npm run cy:run

The server uses Mocha/Chai to test. You can run the tests by running the script:

npm run test

## Docker containerized version

Open Pay can be run fully containerized, with the node application and the Mongo DB both in containers. To build:

* Run buildSite.sh. From the client directory (for Window's users, you may need to create a bat or run manually):

        sh buildSite.sh

* Create containers. From the server directory run the following:

        docker compose up

* Stop the containers:

        docker compose down
