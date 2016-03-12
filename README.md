## Book Trading app

Use:
  - mongodb to store data.
  - Google Book API to find book and display thumbnail
  - Microsoft for Auth (both consumer and enterprise accounts)  


##### Heroku Settings or Environment Variables  
|  Name                |  Description              
|----------------------|------------------------------------------------------------------
| MS_APP_ID            |  Microsoft App ID to handle auth (https://apps.dev.microsoft.com)
| MONGO_URI            |  Mongodb connection string (including user/pass if needed)  
| GOOGLE_API_KEY       |  Google API key for Google Book requests

##### Install to run

npm i   
node server.js  

##### Install for dev

First install node, bower (global) and gulp-cli (global).  
Then:  
npm i && bower i && gulp

Demo here : https://nico-book-trading.herokuapp.com
