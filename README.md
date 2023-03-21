## Overview

<h1 align='center'>Chat App by Aleksandar15</h1>
<p align='center'>
Responsive Weather APP with Dark Mode <br>using NodeJS and TailwindCSS. <br>
<a href="https://chat-app-alek.onrender.com"><img src="https://img.shields.io/badge/LIVE_DEMO-ChatApp-9cf.svg?style=flat"></a>
</p>

## About
- A server-side focused project using WebSockets protocol with the help of *socket.io* library which allows users to chat online over my chat-app website.

  - Socket.IO is a library used for real-time web applications. It provides me with an API for WebSockets. Socket.IO enables bi-directional communication between the client-side and server-side, which I used in my chat-app to allow a real-time chat exchanges.
  - "*Bad-words" library* used to block a list of words and phrases commonly considered offensive or profane.
  - Client-side (frontend) is built using the DOM with the *Mustache library* for rendering HTML templates, *Moment.js* library for working with dates and times, *QS library* to parse the query string in the current URL link into an object.
    - Mustache templating library allows me to define templates that contain placeholders for data. Those placeholders are then filled in with actual data to produce the final output. 
      - In my code, Mustache is used to render HTML templates for displaying messages and other content.
    - Moment.js JavaScript library makes working with dates and times much easier as it provides a simple and consistent API for parsing, validating, manipulating, and formatting dates and times. 
        - In my code, Moment.js is used to format dates and times in a specific format, which is then displayed in the HTML templates.
    - QS library is used to parse the query string of the query portion in the current URL link into an object with key/value-pairs that corresponds to the parameters.
      - In my code, I'm grabbing the `username` and `room` properties from the returned object (which consists key/value-pairs of the current URL's query portion).
      - The second argument, which is optional, is an object with a property `ignoreQueryPrefix: true` indicates that the leading "?" (question mark) should be ignored when parsing the query string into an object.







## Initial Setup

- Clone this repository.
- Navigate (cd) into your project directory.
- Run `npm install` in your command line to install depndencies (or shorter command `npm i`).
- Run `npm start` in your command line.
- Visit http://localhost:3000 in your browser!

## Tech stack

- Node.js
- Express.js
- Socket.io library for the WebSockets protocol

<h2 align='center'>Contact Info</h2>
<br/>
<p align='center'>
    <a href="https://instagram.com/aleksandarr15"><img src="https://img.shields.io/badge/instagram.com-@aleksandarr15-red?style=flat&logo=instagram"></a>&nbsp;
    <a href="mailto:aleksandarangelov15@hotmail.com"><img src="https://img.shields.io/badge/email-aleksandarangelov15@hotmail.com-black?style=flat&logo=gmail"></a>&nbsp;
    <a href="https://aleksandar15.github.io/portfolio"><img src="https://img.shields.io/badge/portfolio-aleksandar15.github.io-green?style=flat"></a>&nbsp;
    <a href="https://www.linkedin.com/in/aleksandar15"><img src="https://img.shields.io/badge/linkedin-aleksandar15.github.io-blue?style=flat&logo=linkedin"></a>&nbsp;
</p>
