# Aid Platform

## Overview
The Aid Platform project aims to connect people in need with willing volunteers within the community. It facilitates acts of kindness by enabling users to request assistance and volunteer to help others in their local area.

## Built With
- Ruby v2.7.2
- Ruby on Rails v6.1.0
- PostgreSQL
- React v17.0.2
- Google Maps API
- MUI (formerly Material-UI) for UI components

## Getting Started
To get a local copy up and running, follow these simple steps:

### Initial Setup
1. Clone this repository with `git clone https://github.com/MagaliFabre/neighborhood_app.git` using your terminal or command line.
2. Change to the project directory by entering `cd neighborhood_app` in the terminal.
3. Navigate to the `ruby` directory for the Rails backend, and follow the setup instructions in the README.md file.
4. Navigate to the `Frontend_react` directory for the React frontend, and follow the setup instructions in the README.md file.

## Features
- Users can sign up and create accounts with their first name, last name, email address, and upload a copy of a government-approved ID (accepted formats: .jpg, .png, .pdf).
- Real-time tracking of assistance requests and volunteer locations using Google Maps API.
- Differentiates between one-time tasks and material needs with colored markers on the map.
- Allows users to click on markers to view request details and volunteer to fulfill the need.
- Message flow for communication between volunteers and requesters to coordinate assistance.
- Automatic removal of requests from the map after 5 volunteers have committed or after 24 hours if not fulfilled.
- Counter displaying the number of unfulfilled help requests on the homepage, updating without page reloads.

## Usage
1. Start the Rails server by running `rails server` in the `ruby` directory.
2. Start the React development server by running `npm start` in the `Frontend_react` directory.
3. Open [http://localhost:3000/](http://localhost:3000/) in your browser to view the Aid Platform application.

## Deployment
The Aid Platform can be deployed online. Follow these steps to deploy:

### Heroku Deployment
1. Create a Heroku account at [https://www.heroku.com/](https://www.heroku.com/) if you haven't already.
2. Install the Heroku CLI following the instructions [here](https://devcenter.heroku.com/articles/heroku-cli).
3. In your terminal, navigate to the project directory `Aid_Platform`.
4. Log in to Heroku CLI by running `heroku login` and follow the prompts to authenticate.
5. Create a new Heroku app with `heroku create`.
6. Deploy your application to Heroku by pushing your code to the Heroku remote repository:

git push heroku main

Copy code
7. Run database migrations on Heroku:
heroku run rails db
8. Open your deployed application in the browser with `heroku open`.

## Database Schema
![Database Schema](./picturereadme/db.png)

## Screenshots
### Home Page
![Home Page](link_to_your_image)

### Submission Form
![Submission Form](link_to_your_image)

### Google Maps Integration
![Google Maps](link_to_your_image)

## Authors
Magali Fabre

## Acknowledgments
- Google Maps API
- MUI (formerly Material-UI)

## License
This project is licensed under the MIT License.

## Project Debrief

### Technology and Purpose

Technology is best used to help people, whether globally or right outside your door! This project aims to build a platform to facilitate acts of kindness.

### Functionality

#### Accounts

- Users can sign up with their first name, last name, email address, and upload a government-approved ID.
- Upload accepts .jpg, .png, and .pdf formats.

#### Volunteering to Help

- Signed-in users see a map with markers indicating people in need of community help.
- Markers are colored differently for one-time tasks and material needs.
- The map refreshes results based on the user's location and allows movement.
- Clicking a marker shows request details and a button to volunteer.
- Users can send messages directly to requesters to organize fulfillment.
- Requests disappear from the map after 5 volunteers or if marked as fulfilled.

#### Submitting a Request

- Users can submit requests with a brief description, type of request, and location.
- Requests have a status of fulfilled or unfulfilled, defaulting to unfulfilled.

#### Counter

- A counter displays the number of unfulfilled help requests, updating every few seconds without reloading the page.

### Technicalities

- Built with Ruby on Rails for the backend and React for the frontend.
- Includes tests for the code.
- Deployed live on the web.
- Responsive design for mobile and tablet views.

### Deliverables

- Finished codebase
- At least 5 wireframes
- Link to the deployed website

### Presentation

- An oral presentation of the project with an assessor.

### Skills Evaluated

- Deploy Rails apps
- Design wireframes for web or mobile
- Create a Rails app

This project demonstrates the ability to build a robust web application that connects people in need with willing volunteers, addressing real-world problems through technology.
