# Readme
## Phase 2:
In this phase I added the ability to store the queried results to the mongoDB Atlas database using Mongoose. I was able to implement the database as well as enable it to store the results but was unable to implement the caching logic, and subsequently, the comparison of the two phases. 


### Running Instructions:
*Running instructions are exactly the same as they were in the last phase.*
To run the application, you'll need to have Node.js v8.11.4 installed along with Angular CLI v6.2.3. To install Node.js, visit https://nodejs.org/en/ and download the latest version. Follow the installation instructions available on the website to set it up for your specific platform. Once up and running, open your shell/command-prompt and run the following command: `npm install --save angular`. This will install angular on your system. All other dependencies are part of the source code and hence require no additional setup. You can run the app using the development servers provided by both angular and node using two simple commands. Since this is a distributed application, the front-end, by default, is hosted on localhost:4200 and the back-end server on localhost:3000. Here are the steps to running the applications:
1. Extract the contents of the .TAR file to a folder.
2. From the shell/command-prompt, navigate to the extracted project folder.
3. Navigate to `./Phase2/myWaypoints_Phase2`
4. To start the front-end, run the command `ng serve`. Once it is complete, open your browser and visit `localhost:4200`, this should take you to the application home-page.
5. For starting the server, open a new instance of the shell/command-prompt and repeat steps 2 and 3. After that, run the command `npm run start:server`.
6. On the application home page, enter the origin city and destination city names into the respective fields and click the `Get Weather` button. 

This should display the route on the map below as well as give you the weather for all the cities that lie along this route. To stop the server and the front-end, simply open the shell/command-prompt and press `ctrl+c` and enter `y` when prompted to.

1. To view the contents of the database, you'll need to navigate to `./Phase2/Mongo/bin` in your shell.
2. run the following command: `mongo "mongodb+srv://cluster0-hdl6v.mongodb.net/test" --username sarim`. When you will be prompted for a password, enter this: `9unUIUxT6w0o2mlp`
3. After that, access the collection `weathrs` with the command: `show collections weathrs`
4. view all the entries in the collection using the command: `db.weathrs.find()`

This should display all the saved entries in the database.
To stop the server and the front-end, simply open the shell/command-prompt and press `ctrl+c` and enter `y` when prompted to.