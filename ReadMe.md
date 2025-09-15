Meetup Clone Frontend

A React-based frontend for the Meetup Clone project. This app allows users to view event details, search events by title, and RSVP, among other features.

Features

View event details (name, host, image, date/time, location, tags, etc.)

Search events by title (via search bar in header or a search page)

Responsive UI with layout for both large and small screens

RSVP button (front-end component)

Footer that sticks to bottom

Tech Stack

React (Vite)

React Router DOM

JavaScript (ES6+)

CSS (or Bootstrap classes)

Fetch API for HTTP requests

Getting Started

Clone the repository

git clone https://github.com/Srushtik942/Meetup_Clone_Frontend.git
cd Meetup_Clone_Frontend

Install dependencies

npm install

Run the development server

npm run dev

Build for production

npm run build

Folder Structure

Meetup_Clone_Frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── EventDetails.jsx
│   │   ├── EventSearch.jsx
│   │   ├── Footer.jsx
│   │   └── … other components
│   ├── App.jsx
│   ├── main.jsx
│   └── styles/ (if any)
├── .env
├── package.json
├── vite.config.js
└── README.md
