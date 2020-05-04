

## Steps to Run App

1) Download this repo to your local machine

2) Open a terminal with 3 tabs

	1st tab - cd into frontend folder, run npm install, and then run: npm run dev
	
	2nd tab - cd into backend folder, run npm install, and then run nodemon server.js
	
	3rd tab - cd into backend/kafka-backend folder, run npm install, and then run nodemon server.js
	
 
 3) We need to have local Kafka/Zookeeper running with following topics set-up: 
 
 	- response-topic
	- user
	- admin
	
	(add more topics here)

 4) To Connect to Database, add .env variable in backend folder and popluate the below variables
	- MYSQL_DB_USERNAME
	- MYSQL_DB_PASSWORD
	- MYSQL_DB_NAME
	- MYSQL_DB_HOSTNAME
	- DB_POOL_MAX
	- DB_POOL_MIN
	- MONGO_DB_URL
	- KAFKA_URL
	- FRONTEND_URL

Note: For kafka_2.12-2.*.* Go in to config/zookeeper.properties and change the log dir to your local pwd. then config/server.properties and do the same thing. also create separate log folders for both

If you are getting HTTP_INVALID_HEADER_ERROR, run the below command in terminal and use this chrome
open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security
