<h1>Me in the world app.</h1>

Web app to manage your travels, show your world map, where you have been and to rank you with other users


To install:<br/>
<b>yarn install</b>



To run:<br/>
<b>yarn run dev</b>


<b>Production app running on heroku:</b><br/>
https://me-in-the-world-app.herokuapp.com

To clone repo and customize the database connection:
1 - In the server folder, create a secrets.js file (which is not checked in for security reasons)

2 - Add the following code to that file:
const MONGO_URI_SECRET = <your mongodb database url>;

module.exports = {
  mongoURISecret: MONGO_URI_SECRET,
};

3 - Run the app against your custom mongo database
