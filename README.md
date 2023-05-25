# Rijksmuseum Gallery App

## Table of Contents

- [Rijksmuseum Gallery App](#rijksmuseum-gallery-app)
  - [Table of Contents](#table-of-contents)
  - [Full Documentation](#full-documentation)
  - [Live Demo](#live-demo)
  - [Description](#description)
  - [Poster Image](#poster-image)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Activity Diagram](#activity-diagram)
  - [External Data Source](#external-data-source)
  - [Checklist](#checklist)
  - [Wishlist](#wishlist)

## Full Documentation
This readme is a quick overview of the project.
For the full documentation, please visit my [Github Wiki](https://github.com/WyroneBlue/progressive-web-apps/wiki)

## Live Demo
Visit our live demo in Github Pages [here](https://progressive-web-apps-production-b909.up.railway.app/).

## Description
The Rijksmuseum Gallery App is a web application that allows users to browse and search through a collection of art pieces from the Rijksmuseum. Users can also filter and sort the collection, and save their favorite pieces for later viewing. The app is built NodeJS, Handlebars, and Sass.

## Poster Image
![Rijksmuseum Gallery App Poster](https://raw.githubusercontent.com/WyroneBlue/rijksmuseum-gallery-app/main/docs/images/poster.png)

## Installation
To install this project, simply clone the repository and open `index.html` in your web browser.

```sh
git clone https://github.com/your-username/rijksmuseum-gallery-app.git
cd rijksmuseum-gallery-app
npm start
```

## Usage
The Rijksmuseum Gallery App has the following features:
- Access favorites in offline mode 🆕
- Search for art pieces by keyword
- Filter art pieces by top pieces and image availability
- Sort art pieces by relevance, type of art, oldest, newest, and artist name
- Save view and remove favorite art pieces
- Access the search and favorites list from the menu in the bottom right corner

## Activity Diagram
![Rijksmuseum Gallery App Activity Diagram](./docs/images/activity-diagram.jpg)

## External Data Source
The Rijksmuseum Gallery App uses the Rijksmuseum API as its external data source. The API provides a collection of high-resolution images and metadata for art pieces in the Rijksmuseum's collection.

## Checklist
Here's a list of what we have accomplished so far and what is still on our wishlist:

Done
- [x] Refactor code to use NodeJS
- [x] Make app installable
- [x] Implement Service Worker
- [x] Make favorites available offline

## Wishlist
- [ ] Better error handling
- [ ] Add better support for mobile devices and certain browsers
- [ ] Add support for multiple languages
