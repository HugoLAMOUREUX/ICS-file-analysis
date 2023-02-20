# ICS App

[![Contributors][commits-shield]][commits-url]

[![Issues][issues-shield]][issues-url]

[![PR][pr-shield]][pr-url]



##  About The Project

This application allows you to see a recap of your ICS files (calendars). You can upload your files (no data is send to a server, everything is on the front-end) and then see a recap of your most done activities. You can also see a classification and analysis of your calendars in order to see in what types of activity (cultural, personnal work...) you spend the most of your time. You can also select some options (minimum duration, minimum occurence, start and end dates ...) in order to apply some filters on the activities that the application should deal with.

The application is available in french and english. The question mark on the top of the website leads you to a short tutorial on the app.

The application is available at https://HugoLAMOUREUX.github.io/ICS-file-analysis/

<br>

###  Built With

This app has been built with React.JS for the front-end, Node.JS for the back-end and mongoDB for the database.

##  Getting Started

###  Prerequisites

* npm

```sh

npm install npm@latest -g

```

###  Installation

1. Clone the repository
```sh
git clone https://github.com/HugoLAMOUREUX/ICS-file-analysis.git
```
2. Launch the server
```
cd back
npm i
npm start
```
3. Launch the web-client application
```
cd front
npm i
npm start
```
4. Open http://localhost:3000 to view it in your browser.

##  Usage

Please see the documentation to understand how to use the application : https://hugolamoureux.github.io/ICS-file-analysis/info

You can also click on the question mark available on the top of the web page : https://hugolamoureux.github.io/ICS-file-analysis/

## Deployment

Do not forget the *"basename={process.env.PUBLIC_URL}"* in the BrowserRouter and then run the following command to deploy the app :
```
npm run deploy
```

The url is : *https://HugoLAMOUREUX.github.io/ICS-file-analysis/*

So do not forget to adapt the *"homepage"* in the package.json either to launch the app locally or to deploy it.

##  Contact

Hugo LAMOUREUX - hugo.lamoureux18@gmail.com - [Linkedin](https://www.linkedin.com/in/hugo-lamoureux-4130211a4/)

Project Link: [https://github.com/HugoLAMOUREUX/ICS-file-analysis](https://github.com/HugoLAMOUREUX/ICS-file-analysis)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->

<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[commits-shield]:
https://img.shields.io/github/last-commit/HugoLAMOUREUX/ICS-file-analysis?style=for-the-badge

[commits-url]: https://github.com/HugoLAMOUREUX/ICS-file-analysis/commits/main

[issues-shield]: https://img.shields.io/github/issues/HugoLAMOUREUX/ICS-file-analysis?style=for-the-badge

[issues-url]: https://github.com/HugoLAMOUREUX/ICS-file-analysis/issues

[pr-shield]: https://img.shields.io/github/issues-pr/HugoLAMOUREUX/ICS-file-analysis?style=for-the-badge

[pr-url]: https://github.com/HugoLAMOUREUX/ICS-file-analysis/pulls

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555




