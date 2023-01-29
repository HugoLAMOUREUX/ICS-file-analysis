# ICS App

This application allows you to see a recap of your ICS files (calendars). You can upload your files (no data is send to a server, everything is on the front-end) and then see a recap of your most done activities. You can also see a classification and analysis of your calendars in order to see in what types of activity (cultural, personnal work...) you spend the most of your time. You can also select some options (minimum duration, minimum occurence, start and end dates ...) in order to apply some filters on the activities that the application should deal with.

The application is available in french and english. The question mark on the top of the website leads you to a short tutorial on the app.

The application is available at https://HugoLAMOUREUX.github.io/ICS-file-analysis/

## For developers

You can clone the repo, and then run the following commands to launch the web application.
```
cd front
npm i
npm start
```
Open http://localhost:3000 to view it in your browser.

## Note to myself : deployment

Do not forget the *"basename={process.env.PUBLIC_URL}"* in the BrowserRouter and then run the following command to deploy the app :
```
npm run deploy
```

The url is : *https://HugoLAMOUREUX.github.io/ICS-file-analysis/*

So do not forget to adapt the *"homepage"* in the package.json either to launch the app locally or to deploy it.


